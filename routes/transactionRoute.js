const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router({ mergeParams: true });

router
  .route("/seeTransaction/:studentId")
  .get(transactionController.getTransactionData);
router.route("/addAmount").post(transactionController.addAmount);

router
  .route("/deleteTransaction/:transactionId")
  .delete(transactionController.deleteTransaction);

router
  .route("/updateTransaction/:transactionId")
  .patch(transactionController.updateTransaction);

router
  .route("/getAllTransaction/:accountId")
  .get(transactionController.getAllTransaction);

module.exports = router;
