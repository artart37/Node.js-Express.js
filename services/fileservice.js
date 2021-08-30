//A module which allows assigning unique IDs to our files
import * as uuid from "uuid";
import * as path from 'path'//We also import Node.js's standard module path for workintg with paths



class FileService {
   // Declaring a function for saving the file on the disk
  saveFile(file) {
      try {
         const fileExetnsion = file.picture.name.split('.').pop()
         //The v4 method creates a unique random name
         const fileName = uuid.v4() + '.'+fileExetnsion
         //The path.resolve() method is a cross-platform way of creating paths.
         const filePath = path.resolve('static', fileName)
         //The mv method will move the file to the specified path
         file.picture.mv(filePath)
         return fileName
      } catch (error) {
         console.log(error)
      }

   }

}

export default new FileService()