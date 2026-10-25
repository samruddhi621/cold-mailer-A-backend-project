import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile } from "../controller/file.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { extractContent } from "../controller/extraction.controller.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.post("/extract", authMiddleware, upload.single("Screenshot"), extractContent);

export default router;