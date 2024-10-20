const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/timetable", async (req, res) => {
  try {
    const response = await axios.get(
      "https://arion.aut.ac.nz/ArionMain/Enrolments/Information/CurrentStudents/ClassEnrolments.aspx"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    // Adjust the selectors based on the actual structure of the HTML
    const classes = [];

    // Example selector - replace with the actual selectors based on the webpage structure
    $("table tr").each((index, element) => {
      const className = $(element).find("td.class-name-selector").text(); // Adjust the selector
      const room = $(element).find("td.room-selector").text(); // Adjust the selector
      const time = $(element).find("td.time-selector").text(); // Adjust the selector
      const day = $(element).find("td.day-selector").text(); // Adjust the selector
      const date = $(element).find("td.date-selector").text(); // Adjust the selector

      // Add more fields as necessary
      if (className) {
        classes.push({ name: className, room, time, day, date });
      }
    });

    res.json(classes);
  } catch (error) {
    console.error("Error fetching timetable:", error);
    res.status(500).json({ message: "Error fetching timetable data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
