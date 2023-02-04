/// Importações
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Schema e Model
const UsuarioEsquema = new mongoose.Schema({
    
    nome: {type: String, required: true},
    estado: {type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    senha: {type: String, required: true},
    status: {type: String, required: true, default: 'ativo'},

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
            telefone: ""
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

    gerarSenha() {

        // 6 caracteres alfanuméricos
        this.dados.senha = Math.random().toString(36).slice(-7)

    }

    async registrar() {

        this.validar()
        if (!this.valido) return

        // Verificar se o e-mail já possui cadastro

        this.gerarSenha()
        this.usuario = await UsuarioModelo.create(this.dados)
    }
}

export default {
    Usuario
}