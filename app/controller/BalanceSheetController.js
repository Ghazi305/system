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
          [col('accounts.accountType.type'), 'type'],
          [col('accounts.name'), 'accountName']
        ],
        include: [{
          model: Account,
          as: 'accounts',
          include: {
            model: AccountType,
            as: 'accountType',
            attributes: [],
            where: {
              type: {
                [Op.or]: ['Asset', 'Liability', 'Revenue', 'Expense']
              }
            }
          },
          attributes: [],
        }],
        where: whereClause,
        group: ['accountId', 'accounts.accountType.type', 'accounts.name'],
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
        revenue: [],
        expenses: []
      };

      balanceSheet.forEach(entry => {
        const type = entry.type;
        const net = (parseFloat(entry.total_debit) || 0) - (parseFloat(entry.total_credit) || 0);
        const credit = parseFloat(entry.total_credit) || 0;
        const debit = parseFloat(entry.total_debit) || 0;

        if (type === 'Asset') {
          totals.assets += net;
          details.assets.push({ name: entry.accountName, balance: net });
        } else if (type === 'Liability') {
          totals.liabilities += -net;
          details.liabilities.push({ name: entry.accountName, balance: -net });
        } else if (type === 'Revenue') {
          totals.revenue += credit;
          details.revenue.push({ name: entry.accountName, balance: credit });
        } else if (type === 'Expense') {
          totals.expenses += debit;
          details.expenses.push({ name: entry.accountName, balance: debit });
        }
      });

      totals.equity = totals.assets - totals.liabilities;

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
