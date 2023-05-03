const express=require('express');
const app=express();
const authRouter=require('./routes/auth');
const connectdb=require('./db/connect')
const AuthMiddleware=require('./middleware/authenticate')
const userRouter=require('./routes/user');
const movieroute=require('./routes/movieroute');
const listroute=require('./routes/listroute');


require('dotenv').config();

app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/users',AuthMiddleware,userRouter);
app.use('/api/movies',AuthMiddleware,movieroute);
app.use('/api/lists',AuthMiddleware,listroute);

const start= async ()=>{
    try {

        await connectdb(process.env.MONGO_URL);
        app.listen(8800, ()=>{
            console.log('Server started')
        })

    } catch (error) {
        
        console.log(error);
    }
}

start();
