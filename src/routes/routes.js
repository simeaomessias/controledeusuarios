// Express
import express from 'express'
const router = express.Router();

// Controllers
import homeController from "../controllers/homeController.js"

// Home - Login
router.get('/', homeController.formLogin)
router.post('/', homeController.verificaLogin)

// Home - Recuperação de senha
router.get('/recuperar-senha', homeController.formRecuperarSenha)
router.post('/recuperar-senha', homeController.recuperaSenha)

// Home - Criar nova conta
router.get('/criar-conta', homeController.formCriarConta)
router.post('/criar-conta', homeController.criaConta)

// Home - Enviar senha
router.get('/enviar-senha-inicial/:id?', homeController.msgEmailSenhaInicial)
router.post('/enviar-senha-inicial', homeController.enviaSenhaInicial)

export default router