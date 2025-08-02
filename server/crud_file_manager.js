const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

class CrudFileManager {
    createFiles = (files) => {
		var fields = {};
		for (var file of files) {
		  const extension = mime.extension(file.mimetype) || '';
		  const filename = file.fieldname + '-' + Date.now() + (extension ? '.' + extension : '');

		  const filePath = `static/images/${filename}`;
		  console.log(filePath);
          fields[file.fieldname.replace("File", "_location")] = filePath;
          
		  fs.writeFile(filePath.replace("static", "uploads"), file.buffer, (err) => {
            if (err) {
			  console.log(file);
			  return console.log(`Failed to save file. ${err.message}`);
		    }
            console.log('Upload successful!');
          });
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
           return console.error('Failed to delete file:', err);
         } 
         console.log('File deleted successfully');
       });
	 }
   }
}

module.exports = CrudFileManager
