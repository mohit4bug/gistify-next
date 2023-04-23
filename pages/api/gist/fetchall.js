import dbConnect from "@/lib/mongodb"
import User from '@/models/User'

export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {
        case "GET":
            try {
                const { id } = req.query
                if (!id) {
                    return res.status(400).json("Unauthorized!")
                }
                const user = await User.findById(id).populate('gists')

                if (!user) {
                    return res.status(404).json("Unauthorized!")
                }
                return res.status(201).json(user)
            } catch (error) {
                return res.status(500).json(error.message)
            }

    }

}