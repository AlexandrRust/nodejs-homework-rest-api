const nodemailer = require("nodemailer");
require("dotenv").config();

const RequestError = require("./RequestError");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "alexanderpopov_dev@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "bogdan.lyamzin.d@gmail.com" };
  try {
    await transporter.sendMail(email);
  } catch (error) {
    throw RequestError(404, "Not found");
  }
};

module.exports = sendEmail;
