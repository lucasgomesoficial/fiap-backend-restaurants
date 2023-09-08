const express = require("express");
const app = express();

const restaurants = require("./api/restaurants");

app.use(express.json({ extended: false }));

app.use("/api/restaurants", restaurants);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
