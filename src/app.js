import express from "express"//instância da aplicação - API
import routerUser from "./routes/userRoutes.js";
import routerProduct from "./routes/productRoutes.js";

const app = express() //guardando express na const app

app.use(express.json()) //permite que o express entenda json no corpo da requisição(body)

app.use("/users",routerUser) //define a endpoint /users para as rotas de usuário
app.use("/products",routerProduct)
export default app;