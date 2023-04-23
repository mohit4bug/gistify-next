import dbConnect from "@/lib/mongodb"
import Gist from '@/models/Gist'
import User from '@/models/User'

export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {

        case "POST":
            const { desc, lang, code, filename, userId } = req.body
            console.log(req.body)
            if (!desc || !lang || !code || !filename || !userId) {
                return res.status(400).json("Fill all required fields!")
            }
            const gist = new Gist({
                desc,
                lang,
                code,
                filename,
                userId
            })

            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json("Unauthorized!")
            }
            user.gists.push(gist._id)
            await user.save()
            await gist.save()
            res.status(201).json("Gist created!")

    }

}