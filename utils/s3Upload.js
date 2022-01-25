import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"
import path from "path"

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "us-east-1",
})

const s3 = new aws.S3()
export const uploadProfileImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "shopala-store",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(
        null,
        "profileImages/" +
          path
            .basename(file.originalname, path.extname(file.originalname))
            .toLowerCase()
            .replace(/\s+/g, "-") +
          "-" +
          Date.now().toString() +
          path.extname(file.originalname).toLowerCase()
      )
    },
  }),
})

export const uploadProductImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "shopala-store",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      if(file.fieldname == 'image'){
        cb(
          null,
            "productImage/" + path
                  .basename(file.originalname, path.extname(file.originalname))
                  .toLowerCase()
                  .replace(/\s+/g, "-") +
                "-" +
                Date.now().toString() +
                path.extname(file.originalname).toLowerCase()
        )
      }else if(file.fieldname === 'brand_logo'){
        cb(
          null,
          "brandLogos/"  + path
                  .basename(file.originalname, path.extname(file.originalname))
                  .toLowerCase()
                  .replace(/\s+/g, "-") +
                "-" +
                Date.now().toString() +
                path.extname(file.originalname).toLowerCase()
        )
      }

    },
  }),
})

export const uploadCampaignImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "shopala-store",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(
        null,
        "campaignImages/" +
          path
            .basename(file.originalname, path.extname(file.originalname))
            .toLowerCase()
            .replace(/\s+/g, "-") +
          "-" +
          Date.now().toString() +
          path.extname(file.originalname).toLowerCase()
      )
    },
  }),
})

export default { uploadProfileImage, uploadProductImage, uploadCampaignImage }
