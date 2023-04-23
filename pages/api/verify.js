import dbConnect from "@/lib/mongodb"
import User from '@/models/User'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {
        case "POST":
            const { token } = req.body
            if (!token) {
                return res.status(400).json("Unauthorized!")
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (!decoded) {
                return res.status(400).json("Unauthorized!")
            }
            const user = await User.findById(decoded.id)
            if (!user) {
                return res.status(400).json("Unauthorized!")
            }
            return res.status(200).json(decoded)

    }

}