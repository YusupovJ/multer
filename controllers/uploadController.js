import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadFile = (req, res) => {
	try {
		if (req.file.size / 1024 / 1024 > 5) {
			const folder = path.join(__dirname, "uploads", req.file.filename);
			fs.rmSync(folder, { recursive: true });
			throw new Error("slishkom bolshoy ves, poxudey");
		}
		res.send(`http://localhost:4000/uploads/${req.file.filename}`);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getFile = (req, res) => {
	const { filename } = req.params;
	const video = path.join(__dirname, "..", "uploads", filename);

	res.sendFile(video);
};
