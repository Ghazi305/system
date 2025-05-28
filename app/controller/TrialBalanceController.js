const { JournalEntry, Account, AccountType } = require('../database/models');
const { Op, fn, col } = require('sequelize');
const sequelize = require('sequelize');

class TrialBalanceController {
  static async getTrialBalance(req, res) {
    try {
      const trialBalance = await JournalEntry.findAll({
        attributes: [
          'accountId',
          [sequelize.fn('SUM', sequelize.col('debit')), 'total_debit'],
          [sequelize.fn('SUM', sequelize.col('credit')), 'total_credit'],
          [sequelize.literal('SUM(debit) - SUM(credit)'), 'balance']
        ],
        include: [{
          model: Account,
          as: 'account', 
          attributes: ['code', 'name'], 
        }],
        group: ['accountId'],
      });

      if (trialBalance.length === 0) {
        return res.status(404).json({
          message: "No trial balance data found"
        });
      }

      return res.status(200).json({
        message: "Trial balance fetched successfully",
        data: trialBalance,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching trial balance",
        error: error.message,
      });
    }
  }

  static async getTrialBalanceByDateRange(req, res) {
    try {
      const { startDate, endDate } = req.query;

      const periodStart = new Date(startDate);
      const periodEnd = new Date(endDate);

      const trialBalance = await JournalEntry.findAll({
        where: {
          createdAt: {
            [sequelize.Op.between]: [periodStart, periodEnd],
          },
        },
        attributes: [
          'accountId',
          [sequelize.fn('SUM', sequelize.col('debit')), 'total_debit'],
          [sequelize.fn('SUM', sequelize.col('credit')), 'total_credit']
        ],
        include: [{
          model: Account,
          as: 'accounts', 
          attributes: ['code', 'name'],
        }],
        group: ['accountId'],
      });

      return res.status(200).json({
        message: "Trial balance fetched successfully for the selected date range",
        data: trialBalance,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Error fetching trial balance by date range",
        error: error.message,
      });
    }
  }

  static async comparePeriods(req, res) {
    try {
      const { startDate, endDate, comparisonPeriod } = req.query;

      let currentPeriodStart = new Date(startDate);
      let currentPeriodEnd = new Date(endDate);
      
      let comparisonPeriodStart = new Date(currentPeriodStart);
      let comparisonPeriodEnd = new Date(currentPeriodEnd);
      
      if (comparisonPeriod === 'last_year') {
        comparisonPeriodStart.setFullYear(comparisonPeriodStart.getFullYear() - 1);
        comparisonPeriodEnd.setFullYear(comparisonPeriodEnd.getFullYear() - 1);
      }

      const currentPeriodData = await JournalEntry.findAll({
        where: {
          createdAt: {
            [sequelize.Op.between]: [currentPeriodStart, currentPeriodEnd],
          },
        },
        attributes: [
          'accountId',
          [sequelize.fn('SUM', sequelize.col('debit')), 'total_debit'],
          [sequelize.fn('SUM', sequelize.col('credit')), 'total_credit']
        ],
        include: [{
          model: Account,
          as: 'accounts', 
          attributes: ['code', 'name'],
        }],
        group: ['accountId'],
      });

      const comparisonPeriodData = await JournalEntry.findAll({
        where: {
          createdAt: {
            [sequelize.Op.between]: [comparisonPeriodStart, comparisonPeriodEnd],
          },
        },
        attributes: [
          'accountId',
          [sequelize.fn('SUM', sequelize.col('debit')), 'total_debit'],
          [sequelize.fn('SUM', sequelize.col('credit')), 'total_credit']
        ],
        include: [{
          model: Account,
          as: 'accounts', 
          attributes: ['code', 'name'],
        }],
        group: ['accountId'],
      });

      const comparisonResults = currentPeriodData.map((currentEntry) => {
        const comparisonEntry = comparisonPeriodData.find(
          (entry) => entry.accountId === currentEntry.accountId
        );

        return {
          accountId: currentEntry.accountId,
          accountName: currentEntry.accounts.name,
          currentPeriodDebit: currentEntry.total_debit,
          currentPeriodCredit: currentEntry.total_credit,
          comparisonPeriodDebit: comparisonEntry ? comparisonEntry.total_debit : 0,
          comparisonPeriodCredit: comparisonEntry ? comparisonEntry.total_credit : 0,
        };
      });

      return res.status(200).json({
        message: "Comparison between periods fetched successfully",
        data: comparisonResults,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Error comparing periods",
        error: error.message,
      });
    }
  }

  static async getGeneralLedger(req, res) {
    try {
      const { startDate, endDate, accountId } = req.query;

      const whereClause = {
        ...(startDate && endDate && {
          createdAt: { [Op.between]: [startDate, endDate] }
        }),
        ...(accountId && { accountId })
      };

      const entries = await JournalEntry.findAll({
        where: whereClause,
        include: [
          {
            model: Account,
            as: 'account',
            attributes: ['id', 'name', 'code'],
            include: {
              model: AccountType,
              as: 'accountType',
              attributes: ['type']
            }
          }
        ],
        order: [['createdAt', 'ASC']],
      });

      let balance = 0;
      const ledger = entries.map(entry => {
        balance += (entry.debit || 0) - (entry.credit || 0);
        return {
          date: entry.createdAt,
          description: entry.description,
          debit: entry.debit,
          credit: entry.credit,
          balance,
          accountName: entry.account?.name,
          accountCode: entry.account?.code
        };
      });

      return res.status(200).json({
        message: "General Ledger fetched successfully",
        data: ledger
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error fetching general ledger",
        error: error.message
      });
    }
  }

}

module.exports = TrialBalanceController;