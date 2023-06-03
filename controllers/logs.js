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

export const getByIdController = async (req, res) => {
    try {
        const { id } = req.params
        
        const log = await prisma.log.findUnique({
            where: {
                id
            }
        })

        res.status(200).json(log)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error getting data.' })
    }
}

export const createLogController = async (req, res) => {
    try {
        const data = req.body

        console.log(data)

        if (!data.firstName || !data.lastName || !data.address || !data.age) {
            return res.status(400).json({ message: 'Please fill all the missing fields.' })
        }

        const log = await prisma.log.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })

        return res.status(200).json(log)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error creating log.' })
    }
}

export const deleteLogController = async (req, res) => {
    try {

        const { id } = req.body

        await prisma.log.delete({
            where: {
                id: id
            }
        })

        res.status(204).json({ message: 'Log removed successfully.' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error removing log.' })
    }
}

export const updateLogController = async (req, res) => {
    try {
        const data = req.body
        const id = body.id

        await prisma.log.update({
            where: {
                id: id
            },
            data: { 
                ...data
            }
        })

        res.status(204).json({ message: 'Log updated successfully.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error updating log.' })
    }
}