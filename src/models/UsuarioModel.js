/// Importações
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

// Schema e Model
const UsuarioEsquema = new mongoose.Schema({
    
    nome: {type: String, required: true},
    estado: {type: String, required: true},
    email: {type: String, required: true},
    emailVisivel: {type: Boolean, required: true, default: true},
    telefone: {type: String, required: true},
    telefoneVisivel: {type: Boolean, required: true, default: true},
    status: {type: String, required: true, default: 'ativo'},

    senha: {type: String, required: true},
    criadoEm: {type: Date, default: Date.now}
})
const UsuarioModelo = mongoose.model('Usuario', UsuarioEsquema)

// Classe

class Usuario {

    constructor(body) {
        this.dados = body;
        this.erros = {
            nome: "",
            estado: "",
            email: "",
            telefone: "",
            senha: "",
        };
        this.usuario = null;
        this.valido = true;
    }


    limpar() {

        // Garantia que todos os campos serão string
        for (const chave in this.dados) {
            if (typeof chave !== 'string') {
                this.dados[chave] = ""
            }
            this.dados[chave].trim()
        }

        // Armazenamento de campos de interesse
        this.dados = {
            nome: this.dados.nome,
            estado: this.dados.estado,
            email: this.dados.email,
            telefone: this.dados.telefone
        }
    }

    validar() {

        this.limpar()

        let regex = ""

        // Nome
        regex = /^([a-zA-Zà-úÀ-Ú '])+$/
        if (!regex.test(this.dados.nome)) {
            this.erros.nome = "Nome inválido"
        }

        // Estado
        const lista = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
                       "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
                       "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO", "EX"]
        if (!lista.includes(this.dados.estado)) {
            this.erros.estado = "Estado inválido"
        }

        // E-mail
        regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!regex.test(this.dados.email)) {
            this.erros.email = "Email inválido."
        }

        // Telefone
        regex = /^([0-9])+$/
        if (regex.test(this.dados.telefone)) {
            if (this.dados.telefone.length < 10 || this.dados.telefone.length > 11) {
                this.erros.telefone = "Telefone inválido"
            }
        } else {
            this.erros.telefone = "Telefone inválido."
        }

        // Resultado da validação
        for (const chave in this.erros) {
            if (this.erros[chave] !== "") this.valido = false
        }
    }

    async verificarEmail() {
        this.usuario = await UsuarioModelo.findOne({email: this.dados.email}).lean()

        if (this.usuario) {
            this.erros.email = "Email já utilizado em outra conta."
            this.valido = false
        }
    }

    gerarSenha() {
        this.dados.senha = Math.random().toString(36).slice(-6) // 6 caracteres alfanuméricos
    }

    async enviarSenha(tipo) {

        // Textos para o e-mail a ser enviado em função do tipo de envio
        const opcoes = {
            
            senhaInicial: {
                assunto: `SENHA DE ACESSO (Projeto Controle de Usuário)`,
                texto: ``,
                html: `<h2>Olá, ${this.usuario.nome}.</h2> <h2>Conta criada com sucesso.</h2> <h2>Senha de acesso:</h2> <h1 style="color: blue">${this.usuario.senha}</h1>`
            },
            
            senhaRecuperada: {
                assunto: `RECUPERAÇÃO DE SENHA (Projeto Controle de Usuário)`,
                texto: ``,
                html: `<h2>Olá, ${this.usuario.nome}.</h2> <h2>Recuperação de senha.</h2> <h2>Senha de acesso:</h2> <h1 style="color: blue">${this.usuario.senha}</h1>`
            }
        }

        // Seleção do texto em função tipo passado como parâmetro
        var assunto = opcoes[tipo].assunto
        var texto = opcoes[tipo].texto
        var html = opcoes[tipo].html

        // Transportador
        let transporter = nodemailer.createTransport({
            host: process.env.emailServico,
            port: process.env.emailPorta,
            secure: false,
            auth: {
                user: process.env.emailUsuario,
                pass: process.env.emailSenha
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Opções
        let mailOptions = {
            from: process.env.emailUsuario,
            to: this.usuario.email,
            subject: assunto,
            text: texto,
            html: html
        };

        // Envio
        try {
            transporter.sendMail(mailOptions, () => {})
        } catch(e) {
            console.log(e)
            this.valido = false
        }
    }

    async acharPorId(id) {
        this.usuario = await UsuarioModelo.findOne({_id: id})
        return
    }

    async acharPorEmail(email) {
        this.usuario = await UsuarioModelo.findOne({email: email}).lean()
        if (!this.usuario) {
            this.erros.email = "Email não encontrado."
            this.valido = false
        }
    }

    async registrar() {

        // Validação
        this.validar()
        if (!this.valido) return

        // Verificação de duplicidade de e-mail
        await this.verificarEmail()
        if (!this.valido) return

        // Geração da senha
        this.gerarSenha()

        // Criação do usuário no banco de dados
        this.usuario = await UsuarioModelo.create(this.dados)
    }
}

export default {
    Usuario
}