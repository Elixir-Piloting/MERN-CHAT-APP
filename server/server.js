const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = {
    origin: "*",
    credential: true
};

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chat.route')
const connectDB = require('./config/DB.JS');

dotenv.config();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;


const app = express();

connectDB();


app.use(express.json());
app.use(cookieParser()); 

app.use(cors(corsOptions));




app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.listen(PORT, ()=>{
    console.log(`app is running on PORT ${PORT}`)
});