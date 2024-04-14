import { upload } from "../lib/Multer.js";
import { addTorrent } from "../lib/Transmission.js";
import { Router } from "express";

const router = Router();

router.post("/upload", upload.single("torrent"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      message: "No file received.",
    });
  }
  if (!req.body.destination) {
    return res.status(400).send({
      message: "Destination missing.",
    });
  }
  if (!["movie", "serie"].includes(req.body.destination)) {
    return res.status(400).send({
      message: "Destination must be 'movie' or 'serie'.",
    });
  }

  const torrentFilePath = req.file.path;
  const destination = req.body.destination;
  const downloadDir =
    destination === "serie" ? "/downloads/serie/" : "/downloads/movie/";

  // Ajouter le torrent à Transmission
  addTorrent(torrentFilePath, downloadDir, res);
});

export default router;
