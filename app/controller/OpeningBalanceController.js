const { OpeningBalance, Account, FiscalYear, sequelize } = require('../database/models');
const JournalEntry = require('../database/models/JournalEntry');

class OpeningBalanceController {
    static async index(req, res) {
        
    }

    static async create(req, res) {
        const { fiscalYearId, balance } = req.body;
        try {
            const fiscalYear = await FiscalYear.findByPk(fiscalYearId);
            if (!fiscalYear) {
                return res.status(404).json({ message: "fiscalYear not found." });
            }

            const openingBalance = balance.map(balance => ({
                accountId: balance.accountId,
                fiscalYearId: fiscalYear.id,
                debit: balance.debit || 0,
                credit: balance.credit || 0,
            }));
        
            await OpeningBalance.bulkCreate(openingBalance);
            return res.status(201).json({ 
                message: "opening created success.",
                data: openingBalance
            });
        } catch (error) {
            return res.status(500).json({ message: "Error Server", error: error.message });
        }
    }

    static async claculate(fiscalYearId) {
        try {
            const closingBalances = await JournalEntry.findAll({
            attributes: [
                'accountId',
                [sequelize.fn('SUM', sequelize.col('debit')), 'total_debite'],
                [sequelize.fn('SUM', sequelize.col('credit')), 'total_credit'],
                ],
                where: { fiscalYearId: fiscalYearId },
                group: ['accountId'],
                raw: true
            });

            const openingBalances = closingBalances.map(item => ({
                accountId: item.accountId,
                debit: parseFloat(item.total_debit) || 0,
                credit: parseFloat(item.total_credit) || 0,
            }));
            return openingBalances;

        } catch (error) {
            return res.status(500).json({ message: "Error Server", error: error.message })
        }
    }

    static async createOpeningBalance(req, res) {
        try {
            const colosingBalances = await this.claculate(fiscalYearId);

            const nextFiscalYearId = fiscalYearId + 1;
            const result = await this.createOpeningBalance(nextFiscalYearId, closingBalances);
            return res.status(200).json(result);
        } catch (error) {
             return res.status(500).json({ message: "Error Server", error: error.message })
        }
    }

    static async checkBalance(req, res) {
        const { fiscalYearId } = req.params;
        const { branchId, costCenterId } = req.query;

        try {
            const whereClause = { fiscalYearId };
            if (branchId) whereClause.branchId = branchId;
            if (costCenterId) whereClause.costCenterId = costCenterId;

            const balances = await OpeningBalance.findAll({
            where: whereClause,
            include: {
                model: Account,
                as: 'account',
                attributes: ['id', 'code', 'name']
            }
            });

            let totalDebit = 0;
            let totalCredit = 0;
            let imbalanceAccounts = [];

            for (const item of balances) {
            const debit = parseFloat(item.debit || 0);
            const credit = parseFloat(item.credit || 0);
            totalDebit += debit;
            totalCredit += credit;

            if (debit !== credit) {
                imbalanceAccounts.push({
                accountId: item.accountId,
                accountCode: item.account?.code,
                accountName: item.account?.name,
                debit,
                credit
                });
            }
            }

            const isBalanced = totalDebit === totalCredit;

            return res.status(200).json({
            message: isBalanced ? "Balanced" : "Not balanced",
            totalDebit,
            totalCredit,
            isBalanced,
            imbalanceAccounts: isBalanced ? [] : imbalanceAccounts
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
            message: "Server error",
            error: error.message
            });
        }
    }

    static async getByFiscalYear(req, res) {
        const { fiscalYearId } = req.params;

        try {
            const openingBalances = await OpeningBalance.findAll({
                where: { fiscalYearId },
                include: [
                    {
                        model: Account,
                    }
                ]
            });

            return res.status(200).json({
                message: "Opening balances fetched successfully.",
                data: openingBalances
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

}

module.exports = OpeningBalanceController;