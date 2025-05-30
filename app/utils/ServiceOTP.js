const { OTPCode } = require('../database/models'); // استيراد النموذج OTPCode

// وظيفة إرسال الرمز كما في السابق
const nodemailer = require("nodemailer");

async function sendOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  const transporter = nodemailer.createTransport({
    host: "mail.tasheeragency.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@tasheeragency.com",
      pass: "Ghazi@%2001",
    },
  });

  const mailOptions = {
    from: '"Alausool-Group" <info@tasheeragency.com>',
    to: email,
    subject: "رمز التحقق OTP",
    text: `رمز التحقق الخاص بك هو: ${otp}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Sent Code Success.", info.messageId);

    await OTPCode.create({
      email: email,
      otp: otp,
      expires_at: expiresAt,
    });

    console.log("The code has been saved in the database.");

  } catch (err) {
    console.error("❌ An error occurred while sending:", err);
  }
}

async function verifyOTP(email, enteredOtp) {
  try {
    const otpRecord = await OTPCode.findOne({
      where: { email: email },
      order: [['createdAt', 'DESC']],
    });

    if (!otpRecord) {
      return { success: false, message: "No OTP code was found associated with this email." };
    }

    const now = new Date();
    if (now > new Date(otpRecord.expires_at)) {
      return { success: false, message: "The code has expired." };
    }

    if (enteredOtp === otpRecord.otp) {
      await OTPCode.destroy({ where: { email: email } });

      return { success: true, message: "Effective verification done." };
    } else {
      return { success: false, message: "Error Code OTP" };
    }

  } catch (err) {
    console.error("Error Verify Code OTP", err);
    return { success: false, message: "Error Server" };
  }
}

module.exports = { sendOTP, verifyOTP };