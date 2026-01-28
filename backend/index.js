/*const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/customers", require("./routes/customers"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/payment", require("./routes/payment"));

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
*/
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // 🔴 VERY IMPORTANT

app.use("/api/customers", require("./routes/customers"));

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
