// Express
import express from 'express'
const router = express.Router();

// Controllers
import loginController from "../controllers/loginController.js"

// Home
router.get('/', (req, res) => {
    res.redirect('/login')
})

// Login
router.get('/login', loginController.index)
router.post('/login', loginController.verifyLogin)


export default router