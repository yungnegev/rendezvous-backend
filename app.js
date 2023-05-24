// Desc: Main entry point for the application
import * as dotenv from 'dotenv'
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import auth from './middleware/auth.js';
import { 
    loginController, 
    registerController, 
    currentController 
} from './controllers/users.js';
import { 
    getAllController 
} from './controllers/logs.js';



// Load .env file
dotenv.config(); 


// express app
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) =>{ 
    res.status(200).send('<h1> Hello :) <h1>')
})

// user routes
app.post('/api/users/login', loginController);
app.post('/api/users/register', registerController);
app.get('/api/users/current', auth, currentController);

// log routes
app.get('/api/logs', getAllController)
app.get('/api/logs/:id', (req, res) => {})
app.post('/api/logs', (req, res) => {})
app.delete('/api/logs/:id', (req, res) => {})
app.put('/api/logs/:id', (req, res) => {})
  

app.listen(process.env.PORT || 8000, (err) => {
    if(err){
        return(console.log(err))
    }
    console.log('All good cuh')
})