const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router({ mergeParams: true });

router.route("/createAccount").post(accountController.createNewAccount);
router.route("/getAccounts/:userId").get(accountController.getAllAccount);
router.route("/getAdminAccounts").get(accountController.getAdminAccount);
router.route("/getAccount/:account_id").get(accountController.getAccount);
router
  .route("/updateAccount/:account_id")
  .patch(accountController.updateAccount);

router
  .route("/getAccountByStaff/:staffId")
  .get(accountController.getAccountByStaffNumber);

router
  .route("/deleteAccount/:accountId")
  .delete(accountController.deleteAccount);

router
  .route("/changeActiveState/:accountId")
  .patch(accountController.changeActiveState);
module.exports = router;
