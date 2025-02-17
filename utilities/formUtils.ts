import express from 'express';
import formidable, { Fields, Files } from 'formidable'
import fs from 'fs'

let uploadDir = './public/photo'

export function parseForm(req: express.Request) {
  if(!fs.existsSync('./public/photo')){
    fs.mkdirSync('./public/photo',{recursive: true})
  }
  if(!fs.existsSync('./public/treatedPhoto')){
    fs.mkdirSync('./public/treatedPhoto',{recursive: true})
  }
  const form = formidable({
    uploadDir,
    filename: (originalName, originalExt, part, form) => {
      let timestamp = Date.now()
      let ext = part.mimetype?.split('/').pop()
      return `${req.query.jobName}-${req.query.pointId}-${timestamp}.${ext}`
    },
  })

  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      } else {
        resolve({ fields, files })
      }
    })
  })
}