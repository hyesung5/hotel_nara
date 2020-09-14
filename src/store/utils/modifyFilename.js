import { size } from 'lodash'

export const modifyFilenames = (existingNames, files ,filename, previewURL) => {
  let filenameToUpload = {}

  for (let i = 0; i < files.length; i++) {
    const id = size(existingNames) + i 
    filenameToUpload = {
      ...filenameToUpload,
      [id]: {
        id,
        filename: filename,
        previewURL: previewURL
      },
    }
  }

  return filenameToUpload
}