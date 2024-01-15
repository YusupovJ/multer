import { Router } from "express";
import { getFile, uploadFile } from "../controllers/uploadController.js";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const uploadRoute = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "..", "uploads"));
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

uploadRoute.post("/", upload.single("file"), uploadFile);
uploadRoute.get("/:filename", getFile);

export default uploadRoute;
