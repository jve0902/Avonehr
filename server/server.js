const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config.js");

const clientsRoute = require("./app/routes/client.routes");
const authRoute = require("./app/routes/auth.routes");
const emailRoute = require("./app/routes/email.routes");
const appointmentsRoute = require("./app/routes/appointments.routes");
const appointmentTypesRoute = require("./app/routes/appointment-types.routes");

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("trust proxy", true);

app.get("/", (req, res) => {
  const help = `
    <pre>
      Welcome to the Clinios API!
      Use an x-access-token header to work with your own data:
      fetch(url, { headers: { 'x-access-token': 'whatever-you-want' }})
      The following endpoints are available:
      GET /users
    </pre>
  `;

  res.send(help);
});

app.use("/api/v1", appointmentsRoute);
app.use("/api/v1", appointmentTypesRoute);
app.use("/api/v1", clientsRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", emailRoute);

app.listen(config.port).on("listening", () => {
  console.log(`🚀 are live on ${config.port}`);
});
