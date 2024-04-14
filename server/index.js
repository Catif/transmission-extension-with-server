import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
  })
);

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
