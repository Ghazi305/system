const { JournalEntry, JournalEntryDetails, CostCenter, Account, AccountType } = require('../database/models');
const { Op, fn, col } = require('sequelize');
const { Sequelize } = require('../database/models');


class ProfitLossController {
  static async getProfitAndLoss(req, res) {
    try {
      const journalEntries = await JournalEntry.findAll({
        include: {
          model: Account,
          as: 'account',
          required: true,
          include: {
            model: AccountType,
            as: "accountType",
            required: true,
            attributes: ['type'],
            where: {
              type: { [Op.in]: ['Assets', 'Liabilities'] }
            }
          }
        },
        attributes: [
          [fn('SUM', col('debit')), 'total_debit'],
          [fn('SUM', col('credit')), 'total_credit'],
          [col('account.accountType.type'), 'type']     
        ],
        group: ['account.accountType.type'],
        raw: true,
      });

      console.log(journalEntries);

      let revenue = 0;
      let expense = 0;

      for (const item of journalEntries) {
        const type = item['account.accountType.type'];
        const debit = parseFloat(item.total_debit) || 0;
        const credit = parseFloat(item.total_credit) || 0;

        if (type === 'Revenue') {
          revenue += credit;
        } else if (type === 'Expense') {
          expense += debit;
        }
      }

      const netProfit = revenue - expense;

      return res.status(200).json({
        message: "Profit and Loss fetched successfully",
        data: {
          revenue,
          expense,
          netProfit
        }
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error calculating Profit and Loss",
        error: error.message
      });
    }
  }
  
  static async getCostCentersReport(req, res) {
    try {
        const { startDate, endDate } = req.query; 

        const costCenters = await CostCenter.findAll({
            include: [
                {
                    model: JournalEntry,
                    as: 'journalEntries',
                    attributes: ['debit', 'credit'],
                    where: {
                        createdAt: {
                            [Sequelize.Op.between]: [startDate, endDate]
                        }
                    }
                }
            ]
        });

        if (!costCenters.length) {
            return res.status(404).json({
                message: "No data found for the given period"
            });
        }

        const report = costCenters.map(center => {
            let directCosts = 0;
            let indirectCosts = 0;

            center.journalEntries.forEach(entry => {
                if (entry.debit > 0) {
                    directCosts += entry.debit; 
                } else {
                    indirectCosts += entry.credit;
                }
            });

            return {
                costCenter: center.name,
                directCosts,
                indirectCosts,
                totalCost: directCosts + indirectCosts,
            };
        });

        return res.status(200).json({
            report
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error Server",
            error: error.message,
        });
    }
  }
}

module.exports = ProfitLossController;