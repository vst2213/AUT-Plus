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

    // Find the table rows containing the schedule data
    $("table tr").each((i, el) => {
      const day = $(el).find("td:contains('Day')").next().text().trim(); // Next sibling of the header cell
      const time = $(el).find("td:contains('Time')").next().text().trim(); // Next sibling of the header cell
      const room = $(el).find("td:contains('Room')").next().text().trim(); // Next sibling of the header cell

      const className = $(el).find("td:contains('Class')").text().trim(); // Class name

      // Debugging log to check extracted values
      console.log(
        `Class: ${className}, Day: ${day}, Time: ${time}, Room: ${room}`
      );

      // Only add non-empty values
      if (day && time && room) {
        classData.push({ className, day, time, room });
      }
    });

    return classData;
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
