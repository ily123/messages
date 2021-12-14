const express = require("express");

app = express();

app.get('/', (req, res) => {
  res.send("hello, this is a stub")
})

app.listen(5000, () => console.log("server started"))
