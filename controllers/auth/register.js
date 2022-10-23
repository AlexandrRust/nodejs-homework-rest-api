const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const nanoid = require("nanoid");

const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");
const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target = "_blank" href = "http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarURL,
    verificationToken,
  });
};

module.exports = register;
