import express from "express";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();

app.use("/uploads", uploadRoute);

app.listen(4000, () => {
	console.log(`Server is running on port ${4000}`);
});
