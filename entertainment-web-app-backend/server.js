const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<username>",
  process.env.DATABASE_USERNAME
).replace("<password>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connected"));

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
