const { User } = require('../database/models');
const { Sequelize } = require('sequelize');
const secret = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


class AuthController {
    static async register(req, res) {
        const { username, email, phone, role, password } = req.body;
        try {
            const isCheckUser = await User.findOne({
                where: {
                    [Sequelize.Op.or]: [{ email }, { phone }]
                }
            });

            if (isCheckUser) {
                return res.status(400).json({
                    message: 'The user already exists',
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, phone, role, password: hashPassword });
            return res.status(201).json({
                message: "User Created Success",
                data: user
            });
            
        } catch (error) {
            return res.status(500).json({
                message: "Error Server",
                error: error.message,
            });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "User Not Found." });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Error data Login" });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
            return res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token,
            });
            
        } catch (error) {
            return res.status(500).json({
                message: "Error Server",
                error: error.message,
            })
        }
    }

    static async logout(req, res) {
        try {
            return res.status(200).json({ message: "User logged out successfully" });
        } catch (error) {
            return res.status(500).json({
                message: "Error Server",
                error: error.message,
            })
        }
    }

    static async getProfile(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "user not found"})
            }
            return res.status(200).json({
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Server",
                error: error.message,
            })
        }
    }

    static async resetPass(req, res) {
        const { newPassword } = req.body;
        const { id } = req.params;
        try { 
          const user = await User.findByPk(id);
          if (!user) {
            return res.status(404).json({
              'status': 'Error', 
              'message': 'Incorrect password'
            }); 
          }
           
          const hashedPassword = await bcrypt.hash(newPassword,10); 
          await User.update({ 
            password: hashedPassword }, 
            { where:{ id } 
          }); 
          
          return res.status(200).json({
             status: 'Success',
             message: 'Password Reset successfully'
          }); 
        } catch(error) {
          console.log(error);
            res.status(500).json({ message:'Error change Password'
            });
        }
      }
       
    static async changePass(req, res) {
        const { password, newPassword } = req.body;
        const { id } = req.params;
    
        try {
         const user = await User.findByPk(id);
         if (!user) {
           return res.status(404).json({
              status: 'Error',
              message: 'User not found',
           });
         } 
        
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
           return res.status(401).json({
              status: 'Error',
              message: 'Incorrect current password',
           });
         }
         
         const hashedPassword = await bcrypt.hash(newPassword, 10);
      
         await User.update(
          { password: hashedPassword },
          { where: { id } }
         );
    
         return res.status(200).json({
           status: 'Success',
           message: 'Password changed successfully',
         });
       } catch (error) {
         console.error(error);
         return res.status(500).json({
            status: 'Error',
            message: 'Error changing password',
            error: error.message,
         });
       }
    }

    static async updateUser(req, res) {
        const { username, email, phone, password } = req.body;
        const { id } = req.params;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'User not found',
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 'Error',
                    message: 'Invalid password',
                });
            }

            user.username = username || user.username;
            user.email = email || user.email;
            user.phone = phone || user.phone;

            await user.save();

            return res.status(200).json({
                status: 'Success',
                message: 'User updated successfully',
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                },
            });

        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: 'Error updating user',
                error: error.message,
            });
        }
    }

}

module.exports = AuthController;