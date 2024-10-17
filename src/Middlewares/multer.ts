import path                from "path"
import multer              from "multer"
import { ValidationError } from "objection"
import { UPLOADS_PATH }    from '../config'
import fs from 'fs';
export class Multer {

    /**
     * ---------------------------------------------------------------------
     * no file POST middleware
     * ---------------------------------------------------------------------
     */
    static none = multer().none()

    static simple = (tableName: string) => {

        const storage = multer.diskStorage({
            destination: (req, file, next) => {
                next(null, path.resolve(UPLOADS_PATH, tableName));
            },
            filename: (req, file, next) => {
                let filename = tableName + '_' + Date.now() + '_' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                next(null, filename);
            }
        })

        return multer({storage}).single('attachment')
    }
    /**
     * ---------------------------------------------------------------------
     * Single File POST upload
     * ---------------------------------------------------------------------
     */
    static simple2 = (tableName: string) => {
        const storage = multer.diskStorage({
          destination: (req, file, next) => {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().substring(0, 10);
            const folderPath = path.resolve(UPLOADS_PATH+'/'+tableName, formattedDate);
      
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath);
            }
      
            next(null, folderPath);
          },
          filename: (req, file, next) => {
            const fileSize = file.size;
         
      
           
                let filename =
                  tableName +
                  '_' +
                  Date.now() +
                  '_' +
                  Math.round(Math.random() * 1e9) +
                  path.extname(file.originalname);
                next(null, filename);
              },
        });
      
        return multer({ storage }).array('attachment', 1);
      };
    static single = (tableName: string, filepath: string, fieldName: string) => {
        let storage = multer.diskStorage({
            destination: (req, file, next) => {
                next(null, path.resolve(UPLOADS_PATH, filepath));
            },
            filename: (req, file, next) => {
                let filename = tableName + '_' + Date.now() + '_' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                next(null, filename);
            }
        })

        return multer({
            storage,
            limits: { fileSize: 8000000 },
            async fileFilter(req: Express.Request, file: Express.Multer.File, next: multer.FileFilterCallback) {

                let maxFileSize      = 8000000
                let allowedMimeTypes = [
                    'image/jpeg',
                    'image/gif',
                    'image/png',
                    'image/svg+xml',
                    'image/webp'
                ]

                if (req.headers && req.headers['content-length']) {

                    const filesize     = parseInt(req['headers']['content-length']);
                    const invalidImage =
                              !allowedMimeTypes.includes(file.mimetype)
                              || filesize > maxFileSize

                    if (invalidImage) {
                        const err = new ValidationError({
                            message: 'File validation error',
                            type: 'FileValidationError',
                            data: {
                                allowedMimeTypes,
                                maxFileSize: maxFileSize / 1000000 + ' MB',
                                provided: file.mimetype + ' ' + Math.round((filesize / 1000000) * 100) / 100 + ' MB'
                            }
                        })

                        return next(err)
                    } else {
                        return next(null, true)
                    }
                }
            }
        }).single(fieldName)
    }
}
