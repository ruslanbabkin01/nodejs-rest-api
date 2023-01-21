const app = require("./app");

require("dotenv").config();

const defaultPort = 3000;
const port = process.env.PORT || defaultPort;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
