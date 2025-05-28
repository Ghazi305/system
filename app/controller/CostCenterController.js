const { CostCenter } = require('../database/models');

class CostCenterController {
  static async index(req, res) {
    try {
      const costCenters = await CostCenter.findAll();
      return res.status(200).json(costCenters);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching cost centers',
        error: error.message
      });
    }
  }

  static async create(req, res) {
    const { code, name } = req.body;

    try {
      const costCenter = await CostCenter.create({ code, name });
      return res.status(201).json({
        message: 'Cost center created successfully',
        data: costCenter
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating cost center',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { code, name } = req.body;

    try {
      const costCenter = await CostCenter.findByPk(id);

      if (!costCenter) {
        return res.status(404).json({ message: "Cost center not found" });
      }

      await CostCenter.update({ code, name }, { where: { id } });

      return res.status(200).json({
        message: 'Cost center updated successfully'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating cost center',
        error: error.message
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const costCenter = await CostCenter.findByPk(id);

      if (!costCenter) {
        return res.status(404).json({ message: "Cost center not found" });
      }

      await costCenter.destroy();

      return res.status(200).json({
        message: 'Cost center deleted successfully',
        deletedCostCenterId: id
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting cost center',
        error: error.message
      });
    }
  }
}

module.exports = CostCenterController;
