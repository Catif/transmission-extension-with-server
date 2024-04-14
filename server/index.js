import express from "express";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const app = express();

// Routes
import Routes from "./assets/routes/index.js";
app.use("/", Routes);

// --- Torrents directory ---
const torrentDir = process.env.TORRENT_DIR;
if (!fs.existsSync(torrentDir)) {
  fs.mkdirSync(torrentDir, { recursive: true });
}

// --- Start ---
const PORT = 9080;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
