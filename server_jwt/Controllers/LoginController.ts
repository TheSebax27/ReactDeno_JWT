// deno-lint-ignore-file no-explicit-any
import { CrearToken, VerificarTokenAccesso } from "../helpers/JWT.ts";
import { iniciarSesion } from "../Models/LoginModel.ts";

export const posUserLogin = async (ctx: any) => {
  const { request, response } = ctx;

  try {
    const contentLength = request.headers.get("content-Length");
    //verificamos si el cuerpo de la solicitud contiene informacion
    if (contentLength === "0") {
      response.status = 400;
      response.body = { success: false, msg: "Cuerpo de la solicitud vacio" };
      return;
    }

    const body = await request.body.json();
    //validar si tenemos email y contraseña
    if (!body.email || !body.password) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "faltan datos (email o contraseña)",
      };
      return;
    }

    const result = await iniciarSesion(body.email, body.password);
    if (result.success) {
        const token = await CrearToken(result.data.idUsuario);

        response.status = 200;
        response.body = {
            success: true,
            accessToken: token,  // ✅ CORREGIDO: era "aceessToken"
            data: `${result.data.nombre} ${result.data.apellido}`
        }
        
    } else {
        // ✅ AGREGADO: Manejo del caso cuando las credenciales son incorrectas
        response.status = 401;
        response.body = {
            success: false,
            msg: result.msg || "Credenciales incorrectas"
        }
    }
  } catch (error) {
    response.status = 500;
    response.body = {
        success: false,
        error: `error interno del servidor, ${error}`,
    };
  }
};