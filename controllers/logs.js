import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllController = async (req, res) => {
    try {
        /* if we want the logs pertaining to a particular user */
        // const logs = await prisma.log.findMany({
        //     where: {
        //         userId: req.user.id
        //     }
        // })
        /* if we want all logs */
        const logs = await prisma.log.findMany()

        res.status(200).json(logs)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error getting data.' })
    }
}

export const createLogController = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error creating log.' })
    }
}