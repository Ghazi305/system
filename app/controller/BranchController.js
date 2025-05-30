const { Branch } = require('../database/models');

class BranchController {
  static async index(req, res) {
    try {
      const branches = await Branch.findAll();
      return res.status(200).json(branches);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching branches',
        error: error.message
      });
    }
  }

  static async getBranchById(req, res) {
    const { id } = req.params;

    try {
      const branch = await Branch.findByPk(id);

      if (!branch) {
        return res.status(404).json({
          message: "Branch not found"
        });
      }

      return res.status(200).json(branch);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching branch',
        error: error.message
      });
    }
  }

  static async create(req, res) {
    const { code, name, address, phone } = req.body;

    try {
      const branch = await Branch.create({
        code,
        name,
        address,
        phone
      });

      return res.status(201).json({
        message: 'Branch created successfully',
        data: branch
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating branch',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { code, name, address, phone } = req.body;

    try {
      const branch = await Branch.findByPk(id);

      if (!branch) {
        return res.status(404).json({
          message: "Branch not found"
        });
      }

      await Branch.update(
        { code, name, address, phone },
        { where: { id } }
      );

      return res.status(200).json({
        message: 'Branch updated successfully'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating branch',
        error: error.message
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const branch = await Branch.findByPk(id);

      if (!branch) {
        return res.status(404).json({
          message: "Branch not found"
        });
      }

      await branch.destroy();

      return res.status(200).json({
        message: 'Branch deleted successfully',
        deletedBranchId: id
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting branch',
        error: error.message
      });
    }
  }
}

module.exports = BranchController;
