import { Router } from "../Dependencies/Dependencias.ts";
import { posUserLogin } from "../Controllers/LoginController.ts";

const LoginRouter = new Router();

LoginRouter.post("/",posUserLogin);

export{LoginRouter};