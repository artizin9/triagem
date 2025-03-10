import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import multer from 'fastify-multer'
import type { Options, StorageEngine } from 'fastify-multer/lib/interfaces'

export const uploadFolder = resolve(__dirname, '../../tmp/uploads')

interface MulterConfig extends Options {
  directory: string
  storage: StorageEngine
}

const storageTypes = {
  local: multer.diskStorage({
    destination: uploadFolder,
    filename: (_, file, cb) => {
      const fileId = randomUUID()

      const extesion = extname(file.originalname)
      file.filename = fileId.concat(extesion)

      return cb(null, file.filename)
    },
  }),
}

export const multerConfig: MulterConfig = {
  directory: uploadFolder,
  storage: storageTypes.local,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
  fileFilter: (_, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/svg',
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  },
}