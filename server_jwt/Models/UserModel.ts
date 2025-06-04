import { conexion } from "./Conexion.ts";
import { z } from "../Dependencies/Dependencias.ts";

export const obtenerTodosLosUsuarios = async () => {
  try {
    const usuarios = await conexion.query(
      "SELECT idUsuario, nombre, apellido, email FROM usuario ORDER BY nombre ASC"
    );

    return {
      success: true,
      msg: "Usuarios obtenidos correctamente",
      data: usuarios,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        msg: error.message 
      };
    } else {
      return {
        success: false, 
        msg: `Error interno: ${error}`
      };
    }
  }
};

export const obtenerUsuarioPorId = async (id: string) => {
  try {
    const [usuario] = await conexion.query(
      "SELECT idUsuario, nombre, apellido, email FROM usuario WHERE idUsuario = ?",
      [id]
    );

    if (!usuario) {
      return {
        success: false,
        msg: "Usuario no encontrado",
      };
    }

    return {
      success: true,
      msg: "Usuario obtenido correctamente",
      data: usuario,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        msg: error.message 
      };
    } else {
      return {
        success: false, 
        msg: `Error interno: ${error}`
      };
    }
  }
};