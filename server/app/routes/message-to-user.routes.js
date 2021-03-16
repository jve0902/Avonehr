const express = require("express");
const { authJwt } = require("../middlewares");
const userMessagesController = require("../controllers/message-to-user.controller.js");

const router = express.Router();

router.get(
  "/user/messages/:id",
  [authJwt.verifyToken],
  userMessagesController.getUserMessageById
);
router.get(
  "/user/messages",
  [authJwt.verifyToken],
  userMessagesController.getUserMessage
);
router.get(
  "/user/assign-to",
  [authJwt.verifyToken],
  userMessagesController.getMessageAssignUser
);
//router.post("/user/message", [authJwt.verifyToken], userMessagesController.createMessage);
router.put(
  "/user/messages/:id",
  [authJwt.verifyToken],
  userMessagesController.updateMessage
);
router.get(
  "/user/messages/history/:messageId",
  [authJwt.verifyToken],
  userMessagesController.getUserMessageHistory
);

module.exports = router;
