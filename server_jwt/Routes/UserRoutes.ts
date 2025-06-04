import { Router } from "../Dependencies/Dependencias.ts";
import { authMiddleware } from "../Middlewares/ValidateJWT.ts";
import { getAllUsers, getUserById } from "../Controllers/UserController.ts";

const UserRouter = new Router();

// Ruta protegida para obtener todos los usuarios
UserRouter.get("/users", authMiddleware, getAllUsers);

// Ruta protegida para obtener un usuario por ID
UserRouter.get("/users/:id", authMiddleware, getUserById);

// Ruta de prueba para verificar autenticación
UserRouter.get("/protected", authMiddleware, (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = { 
    success: true,
    msg: "Acceso permitido",
    user: ctx.state.user 
  };
});

UserRouter.post("/users", authMiddleware, (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = { msg: "POST /users - Funcionalidad por implementar" };
});

UserRouter.put("/users/:id", authMiddleware, (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = { msg: `PUT /users/${ctx.params.id} - Funcionalidad por implementar` };
});

UserRouter.delete("/users/:id", authMiddleware, (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = { msg: `DELETE /users/${ctx.params.id} - Funcionalidad por implementar` };
});

export { UserRouter };