const express = require("express");
const fm = require("./filemanager");
const app = express();
// File to use as list
const file = "listdata.json";

// middlware
app.use(express.static("./Client"));
app.use(express.json());

// HTTP request listners
app.get("/api", async (req,res) => {
  const data = await fm.ReadData(file);
  res.status(200).send(data);
});

app.post("/api", async (req,res) => {
  const resp = fm.WriteData(file, req.body);
  res.status(201).send(resp);
});

// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

// Create a server
const appName = "List Manager";
const port = 5500;
app.listen(port, () => {
  console.log(`App ${appName} is running on port: ${port}`);
})