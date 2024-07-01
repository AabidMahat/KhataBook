const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router({ mergeParams: true });

router.route("/createAccount").post(accountController.createNewAccount);
router.route("/getAccounts/:userId").get(accountController.getAllAccount);
router.route("/getAdminAccounts").get(accountController.getAdminAccount);
router.route("/getAccount/:account_id").get(accountController.getAccount);
router
  .route("/updateAccount/:account_id")
  .post(accountController.updateAccount);

module.exports = router;
