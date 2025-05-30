const { AccountType } = require('../database/models');
const Helpers = require('../utils/Helpers');


class AccountTypeController {
    static async index(req, res) {
        try {
            const accountTypes = await AccountType.findAll();
            return res.status(200).json(accountTypes);
        } catch (error) {
            return res.status(500).json({
                message: 'Error fetching account types',
                error: error.message
            });
        }
    }

    static async getAccountTypeById(req, res) {
        const { id } = req.params;

        try {
            const accountType = await AccountType.findByPk(id);

            if (!accountType) {
                return res.status(404).json({
                    message: "Account type not found"
                });
            }

            return res.status(200).json(accountType);
        } catch (error) {
            return res.status(500).json({
                message: 'Error fetching account type',
                error: error.message
            });
        }
    }

    static async create(req, res) {
        const { name, type } = req.body;

        const accountCode = await Helpers.generateUniqueAccountTypeNumber();

        try {
            const accountType = await AccountType.create({
                code: accountCode,
                name,
                type
            });

            return res.status(201).json({
                message: 'Account type created successfully',
                data: accountType
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error creating account type',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { code, name, type } = req.body;

        try {
            const accountType = await AccountType.findByPk(id);

            if (!accountType) {
                return res.status(404).json({
                    message: "Account type not found"
                });
            }

            await AccountType.update({
                code,
                name,
                type
            }, { where: { id } });

            return res.status(200).json({
                message: 'Account type updated successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating account type',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            const accountType = await AccountType.findByPk(id);

            if (!accountType) {
                return res.status(404).json({
                    message: "Account type not found"
                });
            }

            await accountType.destroy();
            return res.status(200).json({
                message: 'Account type deleted successfully',
                deletedAccountTypeId: id
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error deleting account type',
                error: error.message
            });
        }
    }
}

module.exports = AccountTypeController;
