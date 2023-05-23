import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient()

export const loginController = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ message: 'Please enter all fields' });
      }

      const user = await prisma.user.findFirst({ where: { email: email } });
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch || !user) {
         return res.status(400).json({ message: 'Invalid email or password.' });
      }

      const secret = process.env.JWT_SECRET || 'trurbosecret';
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });

      return res.status(200).json({
         id: user.id,
         name: user.name,
         email: user.email,
         message: 'User logged in successfully',
         token: token,
      })

   } catch (error) {
      console.error(error);
      res.status(500).json({
         message: 'Auth failed (caught in controller).',
     })
   }
 }

export const registerController = async (req, res) => {
   try {

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
         return res.status(400).json({ message: 'Please enter all required fields.' });
      }

      const alreadyRegistered = await prisma.user.findFirst({ where: { email: email } });

      if (alreadyRegistered) {
         return res.status(400).json({ message: 'User with that email is already registered.' });
      }

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
         data: {
            name: name,
            email: email,
            password: hashedPassword,
         }
      })

      const secret = process.env.JWT_SECRET || 'trurbosecret';

      if (user) {
         const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });

         return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
            message: 'User registered successfully',
         })
      } else {
         return res.status(400).json({ message: 'User registration failed.' });f
      }

   } catch (error) {
      console.error(error);
      res.status(500).json({
         message: 'Registration failed (caught in controller).',
     })
   }
 }

export const currentController = async (req, res) => {
    res.send('current');
}