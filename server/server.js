const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./config");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.listen(config.port, () => {
  console.log("Server listening on port %s, Ctrl+C to stop", config.port);
});
