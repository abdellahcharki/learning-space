
const path = require("path");

const multer = require("multer");




const uploader = ({dir=  "stor",prefix="file_"} = {}  ) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, path.join(__dirname, "../" + dir))
      },
      filename: (req, file, cb) => {
        cb(null, prefix+ Math.floor(Date.now() / 1000) + "." + file.originalname.split(".").slice(-1)[0])
      }
    })


  })

}

module.exports = uploader;
