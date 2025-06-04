import "https://deno.land/std@0.224.0/dotenv/load.ts";
import {
  create,
  getNumericDate,
  verify,
} from "../Dependencies/Dependencias.ts";
import { generarKey } from "./CriptoKey.ts";

const key = Deno.env.get("MY_SECRET_KEY") || "default_key";
const server = Deno.env.get("SERVER");

export const CrearToken = async (userId: string) => {
  const payload = {
    iss: server,
    sub: userId,
    jti: crypto.randomUUID(),
    exp: getNumericDate(60 * 15), //duracion de token de 15 minutos
  };

  const secretKey = await generarKey(key);

  return await create({ alg: "HS256", typ: "JWT" }, payload, secretKey);
};

export const VerificarTokenAccesso = async (token: string) => {
  const secretKey = await generarKey(key);

  try {
    return await verify(token, secretKey);
  } catch (error) {
    console.error("Token invalido:", error);
    return null;
  }
};
