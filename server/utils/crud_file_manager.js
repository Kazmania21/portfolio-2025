const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

class CrudFileManager {
  createFiles = (files) => {
    const fields = {};
    for (const file of files) {
      const extension = mime.extension(file.mimetype) || '';
      const filename = file.fieldname + '-' + Date.now() + (extension ? '.' + extension : '');

      const FILE_PATH = `static/images/${filename}`;
      console.log(FILE_PATH);
      fields[file.fieldname.replace('File', '_location')] = FILE_PATH;
          
      fs.writeFile(FILE_PATH.replace('static', 'uploads'), file.buffer, (err) => {
        if (err) {
          console.log(file);
          return console.log(`Failed to save file. ${err.message}`);
        }
        console.log('Upload successful!');
      });
    }
        
    return fields; 
  };

  updateFiles = (oldFiles, newFiles) => {
    const fields = this.createFiles(newFiles);
    this.deleteFiles(oldFiles);
    return fields;
  };

  deleteFiles = (files) => {
    for (const file of files) {
      const filePath = path.join(__dirname, 'uploads/images', file.replace('static/images/', ''));
      console.log(filePath);
      fs.unlink(filePath, (err) => {
        if (err) {
          return console.error('Failed to delete file:', err);
        } 
        console.log('File deleted successfully');
      });
    }
  };
}

module.exports = CrudFileManager;
