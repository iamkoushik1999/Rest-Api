const express = require("express"); // call express
const app = express(); // create instance
const port = 4000; // port 4000
const api = require("./routes/api"); // api call from routes folder
const cors = require("cors"); // call cors

app.use(express.json()); // access express
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // access cors

app.use("/api", api); // access api

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
