const express = require("express");

app = express();

app.get('/api/', (req, res) => {
  const msg = "hello, this is a stub"
  res.json({ msg })
})

app.listen(5000, () => console.log("server started"))
