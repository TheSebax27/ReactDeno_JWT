// deno-lint-ignore-file no-explicit-any
import { obtenerTodosLosUsuarios, obtenerUsuarioPorId } from "../Models/UserModel.ts";

export const getAllUsers = async (ctx: any) => {
  const { response } = ctx;

  try {
    const result = await obtenerTodosLosUsuarios();
    
    if (result.success) {
      response.status = 200;
      response.body = {
        success: true,
        data: result.data,
        total: result.data.length
      };
    } else {
      response.status = 404;
      response.body = {
        success: false,
        msg: result.msg || "No se pudieron obtener los usuarios"
      };
    }
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      error: `Error interno del servidor: ${error}`,
    };
  }
};

export const getUserById = async (ctx: any) => {
  const { response, params } = ctx;
  const userId = params.id;

  try {
    if (!userId) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "ID de usuario requerido"
      };
      return;
    }

    const result = await obtenerUsuarioPorId(userId);
    
    if (result.success) {
      response.status = 200;
      response.body = {
        success: true,
        data: result.data
      };
    } else {
      response.status = 404;
      response.body = {
        success: false,
        msg: result.msg || "Usuario no encontrado"
      };
    }
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      error: `Error interno del servidor: ${error}`,
    };
  }
};