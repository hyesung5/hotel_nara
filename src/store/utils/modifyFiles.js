import { size } from 'lodash'

export const modifyFiles = (existingFiles, files) => {
  let fileToUpload = {}
  for (let i = 0; i < files.length; i++) {
    const id = size(existingFiles) + i 
    fileToUpload = {
      ...fileToUpload,
      [id]: {
        id,
        file: files[i],
      },
    }
  }

  return fileToUpload
}