import logic from '../../../../logic/api'

export default function userHandler(req, res) {
    const {
      query:{id},
      body:{command, data},
      method,
    } = req

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
              const response = await logic.addImage(data)
              res.status(200).json(response)
            })();
            break
          case 'edit':
            return (async () => {
              const response = await logic.editImage(id, data)
              res.status(200).json(response)
            })();
            break
          case 'delete':
            return (async () => {
              const response = await logic.deleteImage(data)
              res.status(200).json(response)
            })();
            break
          default:
            res.status(200).json({status:'ERROR', message:'unrecognized command'})
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
  