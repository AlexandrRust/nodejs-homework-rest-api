const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.registerShema),
  ctrlWrapper(ctrl.register)
);
router.post(
  "/login",
  validateBody(schemas.loginShema),
  ctrlWrapper(ctrl.login)
);
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post(
  "/verify",
  validateBody(schemas.verifyEmailShema),
  ctrlWrapper(ctrl.resendingVerifyEmail)
);

module.exports = router;
