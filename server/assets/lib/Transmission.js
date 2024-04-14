import Transmission from "transmission";

export const transmission = new Transmission({
  host: process.env.TRANSMISSION_IP || "localhost",
  port: process.env.TRANSMISSION_PORT || 9091,
  username: process.env.TRANSMISSION_RPC_USERNAME || "",
  password: process.env.TRANSMISSION_RPC_PASSWORD,
});

export function addTorrent(torrentFilePath, downloadDir, res) {
  transmission.addFile(torrentFilePath, { downloadDir }, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du torrent:", err);
      return res.status(500).send("Erreur lors de l'ajout du torrent.");
    }

    console.log("Torrent ajouté avec succès:", result);
    res.send("Torrent ajouté avec succès.");
  });
}
