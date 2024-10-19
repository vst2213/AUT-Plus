const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const scrapeCourseData = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const classData = [];

    // Select the first row that contains actual class data (ignore header row)
    $("table tr.BackgroundLight").each((i, el) => {
      // Extracting only the first row of class data
      const className = $(el).find("td:nth-child(1)").text().trim(); // Class column
      const day = $(el).find("td:nth-child(5)").text().trim(); // Day column
      const time = $(el).find("td:nth-child(6)").text().trim(); // Time column
      const room = $(el).find("td:nth-child(7)").text().trim(); // Room column

      // Debugging log to check extracted values
      console.log(
        `Class: ${className}, Day: ${day}, Time: ${time}, Room: ${room}`
      );

      // Add the data to classData array only for the first found class
      if (day && time && room && classData.length === 0) {
        classData.push({ className, day, time, room });
      }
    });

    // If no class data is found, return "N/A"
    return classData.length > 0
      ? classData
      : [{ className: "N/A", day: "N/A", time: "N/A", room: "N/A" }];
  } catch (error) {
    console.error("Error scraping data:", error);
    throw error;
  }
};

app.post("/scrape", async (req, res) => {
  const { urls } = req.body; // Expecting an array of URLs
  try {
    const scrapedData = await Promise.all(
      urls.map((url) => scrapeCourseData(url))
    );
    res.json(scrapedData);
  } catch (error) {
    res.status(500).json({ message: "Failed to scrape data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
