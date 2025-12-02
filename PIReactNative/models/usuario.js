// models/usuario.js

export class Usuario {
    constructor(id, nombre, fechaCreacion) {
        this.id = id;
        this.nombre = nombre;
        // Si no hay fecha, crea una nueva [cite: 63]
        this.fechaCreacion = fechaCreacion || new Date().toISOString();
    }

    // Validaciones del modelo [cite: 68]
    static validar(nombre) {
        // Valida que no esté vacío [cite: 72]
        if (!nombre || nombre.trim().length === 0) {
            throw new Error('El nombre no puede estar vacío');
        }
        // Valida longitud máxima [cite: 78]
        if (nombre.length > 50) {
            throw new Error('El nombre no puede tener más de 50 caracteres');
        }
        return true;
    }
}