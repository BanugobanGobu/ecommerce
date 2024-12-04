import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Directory where images will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Only image files (jpeg, jpg, png) are allowed!"));
    }
};


const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
