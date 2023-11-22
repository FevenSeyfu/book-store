import express from "express"
import mongoose from "mongoose";
// import { PORT,mongoDBURL } from "./config.js"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
import 'dotenv/config'

const app = express();

// Middleware for parsing request  body
app.use(express.json());


// Middleware for handking cors policy
// option1 :Allow ALl origins with default cors
app.use(cors())
// option2 Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:5555',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['content-type'],
//     })
// )
app.get('/',(req,res)=>{
    return res.status(234).send('welcome')
})

app.use('/books',booksRoute);

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('App connected to database')
    app.listen(5555 , ()=>{
        console.log(`App is listening to Port : ${process.env.PORT}`)
    })
}).catch((error)=> {
    console.log(error)
})