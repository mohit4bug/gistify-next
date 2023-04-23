import dbConnect from "@/lib/mongodb"
import User from '@/models/User'
import jwt from 'jsonwebtoken'

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}


export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {

        case "POST":
            const { username, password } = req.body
            const isUser = await User.findOne({ username: username })
            if (!isUser) {
                return res.status(404).json("User does not exists!")
            }

            if (isUser.password !== password) {
                return res.status(404).json("Invalid credentials!")
            }

            const token = generateAccessToken({ id: isUser._id, username: isUser.username, name: isUser.name })
            return res.status(201).json(token)
    }

}