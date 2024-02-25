import multer from 'multer';
import path, { resolve } from 'path';
import fs, { readSync } from 'fs';

//Global
const root_buckets_dir = path.resolve(__dirname, '../');

//Cinema Images Config
const cinema_files_dir = '/constant/cinema_files/';

export const cinema_files_bucket = async(fileName: string, admin_id: string) =>{
    const destinationDir = path.join(root_buckets_dir, cinema_files_dir, admin_id);

    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
    }

    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destinationDir)
        },
        filename: async (req, file, cb) => {
            const filesDir = fs.readdirSync(destinationDir);

            filesDir.length > 0 && await Promise.all(
                filesDir
                    .filter(existingFile => existingFile.startsWith(fileName) && ['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(path.extname(existingFile).toLowerCase()))
                    .map(existingFile => fs.promises.unlink(path.join(destinationDir, existingFile)))
            );

            cb(null, fileName+path.extname(file.originalname));
        }
    });
}