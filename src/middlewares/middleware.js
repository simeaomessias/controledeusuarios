const global = (req, res, next)=>{
    // Variáveis para mensagens rápidas
    res.locals.msgSuccess = req.flash("msgSuccess")
    res.locals.msgError = req.flash("msgError")

    next()
}

export default {
    global
}