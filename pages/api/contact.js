import logic from '../../logic/api'

export default function userHandler(req, res) {
    const {
        body: {email, subject, text},
        method,
    } = req

    switch (method) {
        case 'POST':
            return (async () => {
                try {
                    const response = await logic.nodemailerSend(email, subject, text)
                    res.status(200).json(response)
                } catch (error) {
                    res.status(409).json(error.message)
                }
            })();
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
