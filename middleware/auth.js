import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const auth = async (req, res, next) => {
    try {

        let token = req.headers.authorization?.split(' ')[1]
        // the token in turn has the user id among other things encoded into it, when you decoded you get an object with an id property
        // so the user id if it exists is on the decoded object decoded.id
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        // we can then fetch the user from the db using prisma
        let user = await prisma.user.findUnique({ where: { id: decoded.id } })

        // now if we acheive what we set out to do, we can attach the user to the request object
        // and pass it on to the next middleware
        req.user = user
        next()

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized.' })
    }
}


export default auth;