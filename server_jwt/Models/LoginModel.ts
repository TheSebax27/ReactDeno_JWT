import { conexion } from "./Conexion.ts";
import { z } from "../Dependencies/Dependencias.ts";

export const iniciarSesion = async (email: string, password: string) => {
  try {
    const [usuario] = await conexion.query(
      "SELECT * FROM usuario WHERE email=?",
      [email],
    );
    

    if (password === usuario.password) {
      return {
        success: true,
        msg: "Sesion iniciada correctamente",
        data: usuario,
      };
    } else {
      return {
        success: false,
        msg: "Error al iniciar sesion",
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, msg: error.message };
    }else{
        return{success:false, msg:`error interno:${error}`}
    }
  }
};
