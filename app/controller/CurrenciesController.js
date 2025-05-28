const { Currency } = require('../database/models');

class CurrenciesController {
  static async index(req, res) {
    try {
      const currencies = await Currency.findAll();
      return res.status(200).json(currencies);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching currencies',
        error: error.message
      });
    }
  }

  static async create(req, res) {
    const { name, code, symbol, rate } = req.body;

    try {
      const currency = await Currency.create({ name, code, symbol, rate });
      return res.status(201).json({
        message: 'Currency created successfully',
        data: currency
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating currency',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, code, symbol, rate } = req.body;

    try {
      const currency = await Currency.findByPk(id);

      if (!currency) {
        return res.status(404).json({ message: 'Currency not found' });
      }

      await Currency.update({ name, code, symbol, rate }, { where: { id } });

      return res.status(200).json({ message: 'Currency updated successfully' });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating currency',
        error: error.message
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const currency = await Currency.findByPk(id);

      if (!currency) {
        return res.status(404).json({ message: 'Currency not found' });
      }

      await currency.destroy();
      return res.status(200).json({
        message: 'Currency deleted successfully',
        deletedCurrencyId: id
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting currency',
        error: error.message
      });
    }
  }
}

module.exports = CurrenciesController;