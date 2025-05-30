const { Journal, FiscalYear, JournalEntry } = require('../database/models');
const { Op, where } = require('sequelize');
const CostCenter = require('../database/models/CostCenter');


class JournalController {
  static async index(req, res) {
    try {
      const journals = await Journal.findAll({
        include: [
          { model: FiscalYear },
          // { module: JournalEntry, as: "journals" },    
        ]
      });
      return res.status(200).json(journals);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching journals',
        error: error.message
      });
    }
  }

  static async getJournalById(req, res) {
    const { id } = req.params;
    try {
      const journal = await Journal.findByPk(id, {
        include: [{
          model: FiscalYear,
          attributes: ['id', 'name']
        }]
      });

      if (!journal) {
        return res.status(404).json({
          message: "Journal not found"
        });
      }

      return res.status(200).json(journal);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching journal',
        error: error.message
      });
    }
  }

  static async create(req, res) {
    const { date, description, fiscalYearId, entries } = req.body;

    if (!entries || entries.length < 2) {
      return res.status(400).json({ message: "the entry must contain at last one debit and credite" })
    }
    try {
      
      const fiscalYear = await FiscalYear.findOne({ where: { id: fiscalYearId } });
      if (!fiscalYear) {
        return res.status(404).json({ message: "fiscal Year not found" })
      }
      const journal = await Journal.create({
        date,
        description,
        fiscalYearId: fiscalYear.id,
      });

      const journalEntries = entries.map(entry => ({
        journalId: journal.id,
        costCenterId: entry.costCenterId,
        accountId: entry.accountId,
        description: entry.description,
        debit: entry.debit,
        credit: entry.credit,
      }));

      await JournalEntry.bulkCreate(journalEntries);
      return res.status(201).json({
        message: 'Journal created successfully',
        data: { journal, journalEntries }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating journal',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { date, description, fiscalYearId } = req.body;

    try {
      const journal = await Journal.findByPk(id);

      if (!journal) {
        return res.status(404).json({
          message: "Journal not found"
        });
      }

      await journal.update({
        date,
        description,
        fiscalYearId
      });

      return res.status(200).json({
        message: 'Journal updated successfully',
        data: journal
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating journal',
        error: error.message
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const journal = await Journal.findByPk(id);

      if (!journal) {
        return res.status(404).json({
          message: "Journal not found"
        });
      }

      await journal.destroy();
      return res.status(200).json({
        message: 'Journal deleted successfully',
        deletedJournalId: id
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting journal',
        error: error.message
      });
    }
  }
}

module.exports = JournalController;
