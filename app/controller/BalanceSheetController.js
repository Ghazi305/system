const { JournalEntry, Account, AccountType } = require('../database/models');
const { Op, fn, col } = require('sequelize');
const { sequelize } = require('../database/models');

class BalanceSheetController {
  static async getBalanceSheet(req, res) {
    try {
      const { startDate, endDate } = req.query;

      const whereClause = {};
      if (startDate && endDate) {
        whereClause.createdAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const balanceSheet = await JournalEntry.findAll({
        attributes: [
          'accountId',
          [fn('SUM', col('debit')), 'total_debit'],
          [fn('SUM', col('credit')), 'total_credit'],
          [col('account.accountType.type'), 'type'],
          [col('account.name'), 'accountName']
        ],
        include: [{
          model: Account,
          as: 'account',
          include: {
            model: AccountType,
            as: 'accountType',
            attributes: [],
            where: {
              type: {
                [Op.or]: ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense']
              }
            }
          },
          attributes: [],
        }],
        where: whereClause,
        group: ['accountId', 'account.accountType.type', 'account.name'],
        raw: true,
      });

      const totals = {
        assets: 0,
        liabilities: 0,
        equity: 0,
        revenue: 0,
        expenses: 0
      };

      const details = {
        assets: [],
        liabilities: [],
        equity: [],
        revenue: [],
        expenses: []
      };

      balanceSheet.forEach(entry => {
        const type = entry.type;
        const debit = parseFloat(entry.total_debit) || 0;
        const credit = parseFloat(entry.total_credit) || 0;
        let balance = 0;

        if (type === 'Asset' || type === 'Expense') {
          balance = debit - credit;
        } else if (type === 'Liability' || type === 'Equity' || type === 'Revenue') {
          balance = credit - debit;
        }

        if (type === 'Asset') {
          totals.assets += balance;
          details.assets.push({ name: entry.accountName, balance });
        } else if (type === 'Liability') {
          totals.liabilities += balance;
          details.liabilities.push({ name: entry.accountName, balance });
        } else if (type === 'Equity') {
          totals.equity += balance;
          details.equity.push({ name: entry.accountName, balance });
        } else if (type === 'Revenue') {
          totals.revenue += balance;
          details.revenue.push({ name: entry.accountName, balance });
        } else if (type === 'Expense') {
          totals.expenses += balance;
          details.expenses.push({ name: entry.accountName, balance });
        }
      });

      totals.netProfit = totals.revenue - totals.expenses;

      return res.status(200).json({
        message: "Balance Sheet fetched successfully",
        summary: totals,
        breakdown: details
      });

    } catch (error) {
      return res.status(500).json({
        message: "Error fetching Balance Sheet",
        error: error.message,
      });
    }
  }
}

module.exports = BalanceSheetController;
