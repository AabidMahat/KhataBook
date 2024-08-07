const cron = require("node-cron");
const mongoose = require("mongoose");
const Account = require("./models/accountModel"); // Adjust the path as necessary

// Connect to MongoDB (reuse connection settings from server.js)
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Cron Job DB Connected Successfully 🙅🙅"))
  .catch((err) => console.log("Cron Job Failed to connect 💥💥"));

// Schedule a job to run daily at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    // Fetch all accounts and update suscribtionDate
    const accounts = await Account.find({
      suscribtionDate: { $gt: new Date() },
    });
    for (const account of accounts) {
      account.suscribtionDate = new Date(
        account.suscribtionDate.getTime() - 24 * 60 * 60 * 1000
      ); // decrement by 1 day
      await account.save();
    }
    console.log("Subscription dates updated successfully");
  } catch (error) {
    console.error("Error updating subscription dates:", error);
  }
});

console.log("Cron job set up to decrement subscription dates daily");
