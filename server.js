const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY;

app.get("/get-image", async (req, res) => {
  const query = req.query.name;

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/imagesearch?query=${query} smartphone`,
      {
        headers: { "X-Api-Key": API_KEY }
      }
    );

    const data = await response.json();

    if (data.length > 0) {
      res.json({ image: data[0].image });
    } else {
      res.json({ image: null });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching image" });
  }
});

app.listen(process.env.PORT || 3000);
