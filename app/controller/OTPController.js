const { sendOTP, verifyOTP } = require("../utils/ServiceOTP");


class OTPController {
    static async sendOTP(req, res) {
        const { email } = req.body;
        try {
            await sendOTP(email);
            return res.status(200).json({ message: "send OTP success" });
        } catch (error) {
            return res.status(500).json({
                message: "Error Server"
            })
        }
    }

    static async verifyOTP(req, res) {
        const { email, otp } = req.body;
        try {
            const result = await verifyOTP(email, otp);
            if (result.success) {
                return res.send({ message: result.message });
              } else {
                return res.status(400).send({ message: result.message });
              }
        } catch (error) {
            return res.status(500).json({
                message: "Error Server"
            })
        }
    }
}

module.exports = OTPController;