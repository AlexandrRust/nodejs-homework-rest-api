const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendingVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "missing required field email");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target = "_blank" href = "${BASE_URL}/api/users/verify/${user.verificationToken}">Подтвердите email</a>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    message: "Verification email send",
  });
};

module.exports = resendingVerifyEmail;
