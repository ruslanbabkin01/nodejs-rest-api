const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("colors");
require("dotenv").config();

const app = require("./src/app");

const { DB_HOST, PORT = 3000 } = process.env;

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_HOST, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `Database is connected: ${db.connection.name}, on port: ${db.connection.port}, on host: ${db.connection.host}`
        .bold.green.italic
    );

    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}`.green.bold.italic
      );
    });
  } catch (error) {
    console.log(error.message.bold.red);
    process.exit(1);
  }
};
connectDb();
