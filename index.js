import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.post("/upload-video", upload.single("my-video"), (req, res) => {
	try {
		if (req.file.size / 1024 / 1024 > 5) {
			const folder = path.join(__dirname, "uploads", req.file.filename);
			fs.rmSync(folder, { recursive: true });
			throw new Error("slishkom bolshoy ves, poxudey");
		}
		res.send("file saved");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.get("/uploads/:filename", (req, res) => {
	const { filename } = req.params;
	const video = path.join(__dirname, "uploads", filename);

	res.sendFile(video);
});

app.listen(4000, () => {
	console.log(`Server is running on port ${4000}`);
});
