import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Asegurar que existe directorio de uploads
const uploadDir = 'uploads/bonos';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Formato no soportado. Solo PDF e imágenes.'));
    }
};

export const uploadBono = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

const audioFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('audio/') || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
        cb(null, true);
    } else {
        cb(new Error('Formato no soportado. Solo Audio/Video.'));
    }
};

const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/audio';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `session-${Date.now()}${path.extname(file.originalname)}`);
    }
});

export const uploadAudio = multer({
    storage: audioStorage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: audioFilter
});
