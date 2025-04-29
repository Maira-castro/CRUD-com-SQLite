//NESTE ARQUIVO IREMOS PROGRAMAR O QUE SERÁ FEITO AO ACESSAR AQUELA ROTA

export const getAllUsers = (req, res) => {
    res.status(200).json({
        message: "Rota GET users funcionando!"
    })
}

export const postCreateUsers = (req, res) => {
    const { nome, email } = req.body
    if (!nome || !email) {
        res.status(400).json({ erro: "Os dados são obrigatorios!" })
    } else {
        const newUsuario = [{
            nome, email
        }]
        res.status(200).json(newUsuario)
    }
}