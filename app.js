require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base("appONPvlNLB1SBwjd");
let quotes = [];

async function getQuotes() {
  if (quotes.length) return quotes;

  return base("quotes")
    .select()
    .all()
    .then((data) => {
      quotes = data.map((d) => d.fields);
      return quotes;
    });
}

const randomElement = (table) =>
  table[Math.floor(Math.random() * table.length)];

const getWord = ({ gender }) => {
  return gender === "male" ? "d'un" : "d'une";
};

app.get("/", async (req, res) => {
  const quotes = await getQuotes();

  const name = randomElement(quotes.filter((q) => q.type === "name"));
  const status = randomElement(quotes.filter((q) => q.type === "status"));
  const location = randomElement(quotes.filter((q) => q.type === "location"));
  const qualifier = randomElement(quotes.filter((q) => q.type === "qualifier"));

  res.json({ value: `${qualifier.value} ${getWord(name)} ${name.value.toLowerCase()} ${status.value} ${location.value}` });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
