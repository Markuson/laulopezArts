const cloudinary = require('cloudinary').v2;
const fs = require('fs');
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const {
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUDNAME,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
});
const cloudinaryUpload = file => cloudinary.uploader.upload(file);

const uploadHandler = (req, res) => {

  switch (req.method) {
    case 'POST':
      try {
        (async () => {
          const form = new formidable.IncomingForm();
          form.uploadDir = "./";
          form.keepExtensions = true;
          form.parse(req, async (err, fields, file) => {
            if (!file) { throw new Error('Image is not presented!'); }
            const response = await cloudinaryUpload(file.image.path);
            fs.unlinkSync(file.image.path);
            return res.status(200).json({ message: 'OK', data: response });
          });
        })();
      } catch (e) {
        return res.status(422).send({ message: e.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default uploadHandler;


