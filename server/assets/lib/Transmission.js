import Transmission from "transmission";
import dotenv from "dotenv";
dotenv.config();

export const transmission = new Transmission({
  host: process.env.TRANSMISSION_IP || "localhost",
  port: process.env.TRANSMISSION_PORT || 9091,
  username: process.env.TRANSMISSION_RPC_USERNAME || "",
  password: process.env.TRANSMISSION_RPC_PASSWORD,
});

export function addTorrent(torrentFilePath, downloadDir, res) {
  const option = {
    "download-dir": downloadDir,
  };
  transmission.addFile(torrentFilePath, option, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du torrent:", err);
      return res.status(500).send("Erreur lors de l'ajout du torrent.");
    }

    console.log("Torrent ajouté avec succès: ", result.name);
    res.status(200).send("Torrent ajouté avec succès.");
  });
}
