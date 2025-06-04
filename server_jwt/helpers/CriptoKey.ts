export async function generarKey(secret: string): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
        "raw",                                  // Formato de entrada: secuencia de bytes sin codificar
        new TextEncoder().encode(secret),       // Convierte la clave en uint8array entendible para importKey
        { name: "HMAC", hash: "SHA-256" },      // Define el algoritmo para HMAC con SHA-256
        false,                                  // Define si la clave puede ser exportada (en este caso no)
        ["sign", "verify"]                      // Permisos: firmar y verificar datos
    );
}
