/// Importações
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

// Schema e Model
const UsuarioEsquema = new mongoose.Schema({
    
    nome: {type: String, required: true},
    estado: {type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    status: {type: String, required: true, default: 'ativo'},

    senha: {type: String, required: true},
    criadoEm: {type: Date, default: Date.now}
})
const UsuarioModelo = mongoose.model('Usuario', UsuarioEsquema)

// Classe

class Usuario {

    constructor(body) {
        this.dados = body;
        this.senhaGerada = "" // Armazena temporariamente a senha gerada, antes do hash para salvar no banco de dados
                              // É usada para enviar a senha para o e-mail do usuário
        this.erros = {
            nome: "",
            estado: "",
            email: "",
            telefone: "",
            senha: "",
            emailEnviado: ""
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
        this.senhaGerada = Math.random().toString(36).slice(-6) // 6 caracteres alfanuméricos
    }

    hashSenha() {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(this.senhaGerada, salt);
            this.dados.senha = hash
        } catch(e) {
            this.erros.senha = "Erro durante a criação (hash) da senha! Tente novamente!"
            this.valido = false
        }
    }

    async enviarSenha(tipo) {

        var assunto = ""
        var texto = ""
        var html = ""

        if (tipo === "senhaInicial") {
            assunto = "SENHA DE ACESSO (Projeto Controle de Usuário)";
            texto = ""
            html = `<p>Conta criada com sucesso!</p><p>Senha de acesso:</p><h3>${this.dados.senhaGerada}</h3>`
        }

        // Transportador
        let transporter = nodemailer.createTransport({
            host: process.env.emailServico,
            port: 587,
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
            from: 'Projeto Controle de Usuário',
            to: this.dados.email,
            subject: assunto,
            text: texto,
            html: html
        };

        // Envio
        try {
            const info = await transporter.sendMail(mailOptions)
            if (info === undefined) {
                this.erros.emailEnviado = "Erro ao enviar a senha para o e-mail informado."
                this.valido = false
            }
        } catch(e) { // Se ocorrer QUALQUER tipo de erro na tentativa de envio do e-mail
            this.erros.emailEnviado = "Erro desconhecido ao enviar a senha para o e-mail informado."
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

        // Geração e hash de senha
        this.gerarSenha()
        this.hashSenha()
        if (!this.valido) return

        // Criação do usuário no banco de dados
        this.usuario = await UsuarioModelo.create(this.dados)
    }
}

export default {
    Usuario
}