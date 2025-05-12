import bcrypt from 'bcrypt' //AQUI SERA FEITA A CRIPTOGRAFIA DA SENHA
import jwt from 'jsonwebtoken' //GERAÇÃO DE TOKEN
import dotenv from 'dotenv' //carrega as variáveis do arquivo .env para o process.env. Sem ela, process.env.JWT_SECRET será undefined.
dotenv.config()

const SALT_ROUNDS = 10;//a senha sera criptografada 10 vezes
const JWT_SECRET = process.env.JWT_SECRET

//criptografar a senha
export async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

//gerar o token para o usuario
export function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email }, //dados unicos do usuario
        JWT_SECRET,//chave secreta
        { expiresIn: '1h' } //tempo de expiração
    )
}

//FUNÇÃO PARA O USUARIO PRECISAR INFORMAR O TOKEN
//Ele verifica se o usuário enviou um token válido antes de permitir o acesso a certas rotas.
export function authenticate(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(400).json({ message: 'token nao fornecido' });
    }
    try {
        const tokenG = jwt.verify(token, JWT_SECRET);
        req.userId = tokenG.id;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'token invalido' });
    }
};
