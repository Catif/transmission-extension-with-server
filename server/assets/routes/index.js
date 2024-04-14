import { upload } from "../lib/Multer.js";
import { addTorrent } from "../lib/Transmission.js";
import { Router } from "express";

const router = Router();

router.post("/upload", upload.single("torrent"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Aucun fichier n'a été uploadé.");
  }
  if (!req.body.destination) {
    return res.status(400).send("Aucune destination n'a été spécifiée.");
  }
  if (!["movie", "serie"].includes(req.body.destination)) {
    return res.status(400).send("Destination invalide.");
  }

  const torrentFilePath = req.file.path;
  const destination = req.body.destination;
  const downloadDir =
    destination === "serie" ? "/downloads/serie/" : "/downloads/movie/";

  // Ajouter le torrent à Transmission
  addTorrent(torrentFilePath, downloadDir, res);
});

export default router;
