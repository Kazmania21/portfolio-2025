const fs = require('fs');
const path = require('path');

class CrudFileManager {
    createFiles = (files) => {
		var fields = {};
		for (var file of files) {
          fields[file.fieldname.replace("File", "_location")] = `static/images/${file.filename}`;
		}
        return fields; 
    }

   updateFiles = (oldFiles, newFiles) => {
     var fields = this.createFiles(newFiles);
	 this.deleteFiles(oldFiles);
	 return fields;
   }

   deleteFiles = (files) => {
     for (var file of files) {
       const filePath = path.join(__dirname, 'uploads/images', file.replace("static/images/", ""));
	   console.log(filePath);
	   fs.unlink(filePath, (err) => {
         if (err) {
           console.error('Failed to delete file:', err);
         } else {
           console.log('File deleted successfully');
         }
       });
	 }
   }
}

module.exports = CrudFileManager
