import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, process.env.TORRENT_DIR); // Dossier temporaire pour stocker les fichiers uploadés
  },
  filename: function (req, file, callback) {
    callback(null, `${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });
