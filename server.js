const express = require('express')
const app = express();
const http = require('http')
const path = require('path')
const dotenv = require('dotenv')
const multer =  require('multer')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const courseRoutes = require('./routes/course')


dotenv.config();


mongoose.connect('mongodb+srv://aj:ajmani@cluster0-c60su.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));


// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Set Storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '=' + Date.now() + path.extname(file.originalname))
    }
})
//Init upload
const upload = multer({
    storage: storage
}).single('myImage')


//template engine
app.set('view engine', 'ejs')

//static folder
app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.render('index')
})

app.use('/user', userRoutes)

app.use('/course', courseRoutes)


//Image Post
app.post('/upload' , (req,res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {msg: err})
        } else {
            console.log(req.file)
            res.send('test')
        }
    })
})


http.createServer(app).listen(process.env.PORT || 3000);
console.log("BackEnd Server Is On=", process.env.PORT || 3000);