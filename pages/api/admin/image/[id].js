import logic from '../../../../logic/api'
import { mongoose } from 'data'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const { env: { MONGODB_URI } } = process

export default function userHandler(req, res) {
    const {
      query:{id},
      body:{command, data},
      method,
    } = req;
    
    (async () => {
      try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
      } catch (error) {
        console.error(error.message)
      }
    })();

    switch (method) {
      case 'GET':
        // Get data from your database
        return (async () => {
          res.status(200).json({status:'OK', message:'nothing hapened'})
        })();
        break
      case 'PUT':
        switch(command){
          case 'add':
            return (async () => {
              try {
                await logic.addImage(data)
                res.status(200).json({status:'OK', message:'Image added'})
              } catch (error) {
                res.status(200).json({status:'KO', message:error.message})
              }
            })();
            break
          case 'edit':
            return (async () => {
              try{
                await logic.editImage(data)
                res.status(200).json({ status: 'OK', message: 'Image edited' })
              } catch (error) {
                res.status(200).json({ status: 'KO', message: error.message })
              }
            })();
            break
          case 'delete':
            return (async () => {
              try {
                console.log(data.publicId)
                await logic.deleteImage(data.publicId)
                res.status(200).json({ status: 'OK', message: 'Image deleted' })
              } catch (error) {
                res.status(200).json({ status: 'KO', message: error.message })
              }
            })();
            break
          default:
            res.status(200).json({status:'KO', message:'unrecognized command'})
        }
        break

      case 'DELETE':
        return (async () => {
          const response = await logic.deleteImage(id)
          res.status(200).json(response)
        })();
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
  