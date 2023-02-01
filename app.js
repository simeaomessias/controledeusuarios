// Express
import express from 'express'
const app = express()

// Public directory
app.use(express.static('public'))

// Express.json() e Express.urlencoded()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Dotenv (loads environment variables)
import dotenv from 'dotenv'
dotenv.config()

// Express-handlebars
import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Mongoose
import mongoose from 'mongoose'
mongoose.set('strictQuery', false);
const mongoUri = process.env.mongoUri
mongoose.Promise = global.Promise
mongoose.connect(mongoUri).then( () => {
    console.log("BANCO DE DADOS: Conectado.")
    app.emit("connectedDatabase")
}).catch( (erro) => {
    console.log(`BANCO DE DADOS: A conexão com o MongoDB não foi realizada! ERRO: ${erro}`)
})

// Session - Configurations and variables initialization
import session from 'express-session'
import MongoStore from 'connect-mongo'
app.use(session({
    secret: 'qualquerCoisa',
    store: MongoStore.create({
        mongoUrl: mongoUri
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*5, // 5 minutes
        httpOnly: true
    }
}))

// Connect-flash
import flash from 'connect-flash'
app.use(flash())

// Middlewares
import middleware from './src/middlewares/middleware.js'
app.use(middleware.global)

// Routes
import routes from './src/routes/routes.js'
app.use(routes)

// Server
const PORT = process.env.PORT || 8081
app.on('connectedDatabase', () => {
    app.listen(PORT, () => {
        console.log(`SERVIDOR: Ativo na porta ${PORT}`)
    })    
})



