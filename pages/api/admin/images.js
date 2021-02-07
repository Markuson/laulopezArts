// import logic from '../../../logic/api'
// import { connectToDatabase } from '../../../utils/mongodb';

// export default function userHandler (req, res) {
//     const {
//         body: { command, data },
//         method,
//     } = req

//     switch (method) {
//         case 'GET':
//             // Get data from your database
//             return (async () => {
//                 const { db } = await connectToDatabase();

//                 const portfolios = await db
//                     .collection("portfolios")
//                     .find({})
//                     // .sort({ metacritic: -1 })
//                     // .limit(20)
//                     .toArray();

//                 const response = await logic.getImageList()
//                 console.log(portfolios)
//                 res.status(200).json(portfolios)
//             })();
//             break
//         default:
//             res.setHeader('Allow', ['GET'])
//             res.status(405).end(`Method ${method} Not Allowed`)
//     }
// }
