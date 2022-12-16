import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const __dirname = path.resolve();
const tmpFolder = path.resolve(__dirname, 'uploads')

export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex')

            const fileOriginal = file.originalname.split(" ").join("%20")
            const filename = `${fileHash}-${fileOriginal}`;

            return callback(null, filename)
        }
    })
}