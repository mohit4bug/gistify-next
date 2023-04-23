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
            const { username, name, password } = req.body
            const isUser = await User.findOne({ username: username })
            if (isUser) {
                return res.status(400).json("User already exists!")
            }
            const user = new User({
                username: username,
                name: name,
                password: password
            })
            await user.save()
            return res.status(201).json("User created!")
    }

}