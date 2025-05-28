const { FiscalYear, sequelize, JournalEntry, OpeningBalance } = require('../database/models');

class FiscalYearController {
  static async index(req, res) {
    try {
      const fiscalYears = await FiscalYear.findAll();
      return res.status(200).json({
        message: "Fiscal years fetched successfully",
        data: fiscalYears,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching fiscal years",
        error: error.message,
      });
    }
  }

  static async closeFiscalYear(req, res) {
    const { oldFiscalYearId, newFiscalYearId } = req.body;

    try {
        const oldYear = await FiscalYear.findByPk(oldFiscalYearId);
        const newYear = await FiscalYear.findByPk(newFiscalYearId);

        if (!oldYear || !newYear) {
            return res.status(404).json({ message: "Old or new fiscal year not found." });
        }

        const closingBalances = await OpeningBalance.findAll({
            where: { fiscalYearId: oldFiscalYearId }
        });

        if (closingBalances.length === 0) {
            return res.status(400).json({ message: "No closing balances found for the old fiscal year." });
        }

        const openingBalances = closingBalances.map(balance => ({
            accountId: balance.accountId,
            fiscalYearId: newYear.id,
            debit: Number(balance.debit) || 0,
            credit: Number(balance.credit) || 0,
        }));

        await OpeningBalance.bulkCreate(openingBalances);

        return res.status(201).json({
            message: "Fiscal year closed successfully. Opening balances created for new fiscal year.",
            data: openingBalances
        });
      } catch (error) {
          return res.status(500).json({
              message: "Server Error",
              error: error.message
          });
      }
  }


  static async create(req, res) {
    const { year, startDate, endDate, isActive } = req.body;

    try {
      const fiscalYear = await FiscalYear.create({
        year,
        startDate,
        endDate,
        isActive
      });

      return res.status(201).json({
        message: 'Fiscal year created successfully',
        data: fiscalYear,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating fiscal year',
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { year, startDate, endDate, isActive } = req.body;

    try {
      const fiscalYear = await FiscalYear.findByPk(id);

      if (!fiscalYear) {
        return res.status(404).json({
          message: "Fiscal year not found",
        });
      }

      await FiscalYear.update(
        { year, startDate, endDate, isActive },
        { where: { id } }
      );

      return res.status(200).json({
        message: 'Fiscal year updated successfully',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating fiscal year',
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const fiscalYear = await FiscalYear.findByPk(id);

      if (!fiscalYear) {
        return res.status(404).json({
          message: "Fiscal year not found",
        });
      }

      await fiscalYear.destroy();

      return res.status(200).json({
        message: 'Fiscal year deleted successfully',
        deletedFiscalYearId: id
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting fiscal year',
        error: error.message,
      });
    }
  }
}

module.exports = FiscalYearController;