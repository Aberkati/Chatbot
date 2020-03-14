const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

require("./routes/dialogFlowRoutes")(app);

// Serve static assets in PRODUCTION
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Run!"));
