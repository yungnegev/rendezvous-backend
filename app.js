// Desc: Main entry point for the application
import * as dotenv from 'dotenv'
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { loginController, registerController, currentController } from './controllers/users.js';
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
app.post('/users/login', loginController);
  
app.post('/users/register', registerController);

app.get('/users/current', currentController);
  

app.listen(process.env.PORT || 8000, (err) => {
    if(err){
        return(console.log(err))
    }
    console.log('All good cuh')
})