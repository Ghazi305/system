const { Invoice, JournalEntry, Sequelize } = require('../database/models');

class DashboradController {
    static async getDataDashborad(req, res) {
        try {
            const totalTransactions = await JournalEntry.count();
            const invoicesTotal = await Invoice.count();

            const invoiceStatusCountsRaw = await Invoice.findAll({
                attributes: [
                    'status',
                    [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
                ],
                group: ['status']
            });

            const invoiceStatusCounts = {
                pending: 0,
                paid: 0,
                cancelled: 0,
                under_review: 0
            };

            invoiceStatusCountsRaw.forEach(row => {
                invoiceStatusCounts[row.status] = parseInt(row.dataValues.count);
            });

            const result = {
                totalTransactions,
                invoices: invoicesTotal,
                invoiceStatusCounts
            };

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: 'Error Server', error: error.message });
        }
    }
}

module.exports = DashboradController;