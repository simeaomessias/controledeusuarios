// Express
import express from 'express'
const router = express.Router();

// Controllers
import homeController from "../controllers/homeController.js"
import usuarioController from "../controllers/usuarioController.js"

// Home - Login
router.get('/', homeController.formLogin)
router.post('/', homeController.verificaLogin)

// Home - Criar nova conta + Envio de senha inicial
router.get('/criar-conta', homeController.formCriarConta)
router.post('/criar-conta', homeController.criaConta)
router.get('/enviar-senha-inicial/:id?', homeController.msgEmailSenhaInicial)
router.post('/enviar-senha-inicial', homeController.enviaSenhaInicial)

// Home - Recuperar de senha
router.get('/recuperar-senha', homeController.formRecuperarSenha)
router.post('/recuperar-senha', homeController.recuperaSenha)
router.get('/enviar-senha-recuperada/:id?', homeController.msgEmailSenhaRecuperada)
router.post('/enviar-senha-recuperada/:id?', homeController.enviaSenhaRecuperada)

// Usuario - Tela inicial
router.get('/usuario', usuarioController.telaInicial)

// Usuario - Minha Conta
router.get('/usuario/minha-conta', usuarioController.minhaConta)

// Usuario - Lista geral de usuários
router.get('/usuario/listar-usuarios', usuarioController.listarUsuarios)

// Usuario - Logout
router.get('/usuario/logout', usuarioController.logout)

export default router