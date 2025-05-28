const { JournalEntry, Account, CostCenter, Journal } = require('../database/models');
const { Op } = require('sequelize');


class JournalEntriesController {
  static async getJournalEntries(req, res) {
    try {
      const journalEntries = await JournalEntry.findAll({
        include: [{
          model: Account,
          as: 'accounts',
          attributes: ['code', 'name'],
        },
        // {
        //   model: CostCenter,
        //   as: 'costCenter', 
        // },
        // {
        //   model: Journal,
        //   as: 'journalEntries'
        // }
        ],
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        message: "Journal entries fetched successfully",
        data: journalEntries,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching journal entries",
        error: error.message,
      });
    }
  }

  static async getJournalEntriesByDate(req, res) {
    const { startDate, endDate, accountId } = req.query; 

    try {
      const whereConditions = {};

      if (startDate) {
        whereConditions.createdAt = { 
          [Op.gte]: new Date(startDate) 
        };
      }

      if (endDate) {
        whereConditions.createdAt = { 
          [Op.lte]: new Date(endDate) 
        };
      }

      if (accountId) {
        whereConditions.accountId = accountId;
      }

      const journalEntries = await JournalEntry.findAll({
        where: whereConditions,
        include: [{
          model: Account,
          as: 'account',
          attributes: ['code', 'name'],
        }],
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        message: "Journal entries fetched successfully",
        data: journalEntries,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching journal entries",
        error: error.message,
      });
    }
  }


  static async create(req, res) {
    const { journalId, accountId, description, debit, credit, costCenterId } = req.body;

    try {
      const journal = await Journal.findByPk(journalId);
      const account = await Account.findByPk(accountId);

      if (!journal) {
        return res.status(404).json({
            message: "jounral is not found",
        });
      }

      if (!account) {
        return res.status(404).json({
            message: "account is not found",
        });
      }

      const journalEntry = await JournalEntry.create({
        journalId,
        accountId,
        description,
        debit,
        credit,
        costCenterId
      });

      return res.status(201).json({
        message: "Journal entry created successfully",
        data: journalEntry,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating journal entry",
        error: error.message,
      });
    }
  }


  static async update(req, res) {
    const { id } = req.params;
    const { journalId, accountId, description, debit, credit, costCenterId } = req.body;

    try {
      const journalEntry = await JournalEntry.findByPk(id);

      if (!journalEntry) {
        return res.status(404).json({
          message: 'Journal entry not found',
        });
      }

      const updatedJournalEntry = await journalEntry.update({
        journalId,
        accountId,
        description,
        debit,
        credit,
        costCenterId
      });

      return res.status(200).json({
        message: "Journal entry updated successfully",
        data: updatedJournalEntry,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating journal entry",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const journalEntry = await JournalEntry.findByPk(id);

      if (!journalEntry) {
        return res.status(404).json({
          message: 'Journal entry not found',
        });
      }

      await journalEntry.destroy();

      return res.status(200).json({
        message: "Journal entry deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting journal entry",
        error: error.message,
      });
    }
  }
}

module.exports = JournalEntriesController;
