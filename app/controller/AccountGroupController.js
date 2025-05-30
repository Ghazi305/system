const { AccountGroup } = require('../database/models');
const Helpers = require('../utils/Helpers');

class AccountGroupController {
    static async index(req, res) {
        try {
            const accountGroups = await AccountGroup.findAll();
            return res.status(200).json(accountGroups);
        } catch (error) {
            return res.status(500).json({
                message: 'Error fetch data',
                error: error.message
            });
        }
    }

    static async getAccountGroupById(req, res) {
        const { id } = req.params;

        try {
            const accountGroup = await AccountGroup.findByPk(id);

            if (!accountGroup) {
                return res.status(404).json({
                    message: "Account Group Not founde"
                });
            }

            return res.status(200).json(accountGroup);
        } catch (error) {
            return res.status(500).json({
                message: 'Error fetch data',
                error: error.message
            });
        }
    }

    static async create(req, res) {
        const { name } = req.body;
        const accountCode = await Helpers.generateUniqueAccountGroupNumber();
        try {
            const accountGroup = await AccountGroup.create({
                code: accountCode,
                name
            });

            return res.status(201).json({
                message: 'Account created success',
                data: accountGroup
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error fetch data',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { code, name } = req.body;

        try {
            const accountGroup = await AccountGroup.findByPk(id);

            if (!accountGroup) {
                return res.status(404).json({
                    message: "Account not found"
                });
            }

            await AccountGroup.update({
                code,
                name
            }, { where: { id } });

            return res.status(200).json({
                message: 'updated success'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error update data',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            const accountGroup = await AccountGroup.findByPk(id);

            if (!accountGroup) {
                return res.status(404).json({
                    message: "Acconut not founde "
                });
            }

            await accountGroup.destroy();
            return res.status(200).json({
                message: 'Account deleted success',
                deletedAccountGroupId: id
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error deleted data',
                error: error.message
            });
        }
    }
}

module.exports = AccountGroupController;
