const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router({ mergeParams: true });

router.route("/createAccount").post(accountController.createNewAccount);
router.route("/getAccounts/:userId").get(accountController.getAllAccount);
router.route("/getAccount/:account_id").get(accountController.getAccount);

module.exports = router;
