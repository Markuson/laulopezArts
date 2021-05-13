const cloudinary = require('cloudinary').v2

const {
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUDNAME
} = process.env;

cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
});

const cloudinaryDelete = publicId => cloudinary.uploader.destroy(publicId)

const deleteHandler = async (req, res) => {
  const { method, body: { data: { publicId } } } = req
  switch (method) {
    case 'PUT':
      try {
          const response = await cloudinaryDelete(publicId);
          return res.status(200).json({ message: 'OK', data: response });
      } catch (e) {
        return res.status(422).send({ message: e.message })
      }
      break;
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default deleteHandler;