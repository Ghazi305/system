const { Account, AccountType, AccountGroup, Currency } = require('../database/models');

class AccountController {
    static async index(req, res) {
        try {
            const accounts = await Account.findAll({
                include: [
                  { model: AccountType, as: 'accountType' },
                  { model: AccountGroup, as: 'group' },
                  { model: Currency, as: 'currency' }
                ],
              });
              res.json(accounts);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error Fetch Data',
                error: error.message,
            });
        }
    }

    static async getAccountById(req, res) {
        const { id } = req.params;

        try {
            const account = await Account.findByPk(id,{
                include: [
                    { model: AccountType, as: 'accountType' },
                    { model: AccountGroup, as: 'group' },
                    { model: Currency, as: 'currency' }
                  ]
            });

            return res.status(200).json(account)
        } catch (error) {
            res.status(500).json({ 
                message: 'Error Fetch Data',
                error: error.message,
            });
        }
    }

    static async create(req, res) {
        const { code, name, level, parentId, accountTypeId, groupId, currencyId, branchId, costCenterId } = req.body;
        try {
            const createAccount = await Account.create({
                code,
                name,
                level,
                parentId,
                accountTypeId,
                groupId,
                currencyId,
                branchId,
                costCenterId
            });

            return res.status(201).json({
                message: "Create Account Success",
                data: createAccount
            })
        } catch (error) {
            res.status(500).json({ 
                message: 'Error Crated Data',
                error: error.message, 
            });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { code, name, level, parentId, accountTypeId, groupId, currencyId, branchId, costCenterId } = req.body;
        
        try {
            const account = await Account.findByPk(id);
            if (!account) {
                return res.status(404).json({
                    message: "Account is Not founde"
                });
            }

            await Account.update({
                code,
                name,
                level,
                parentId,
                accountTypeId,
                groupId,
                currencyId,
                branchId,
                costCenterId
            }, { where: {id} });

            return res.status(200).json({
                message: "Account updated Success"
            })
        } catch (error) {
            res.status(500).json({ 
                message: 'Error Updated Data',
                error: error.message, 
            });
        }
    }

    static async deleteAccount(req, res) {
        const { id } = req.params;
        try {
            const account = await Account.findByPk(id);
            if (!account) {
                return res.status(404).json({
                    message: "Account is not Founde",
                });
            }

            await account.destroy();
            res.status(200).json({ 
                message: 'Account deleted Success' 
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error Updated Data',
                error: error.message, 
            });
        }
    }
}

module.exports = AccountController;