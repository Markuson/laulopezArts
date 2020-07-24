import logic from '../../../logic/api'

export default function userHandler(req, res) {
    const {
        body: { command, data },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get data from your database
            return (async () => {
                const response = await logic.getImageList()
                res.status(200).json(response)
            })();
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
