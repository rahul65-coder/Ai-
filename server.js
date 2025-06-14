const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/fetch-data", async (req, res) => {
  const apiUrl = "https://api.bdg88zf.com/api/webapi/GetNoaverageEmerdList";

  const requestData = {
    pageSize: 10,
    pageNo: 1,
    typeId: 1,
    language: 0,
    random: "c2505d9138da4e3780b2c2b34f2fb789",
    signature: "7D637E060DA35C0C6E28DC6D23D71BED",
    timestamp: Math.floor(Date.now() / 1000)
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("API fetch error:", error);
    res.status(500).json({ error: "API fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});