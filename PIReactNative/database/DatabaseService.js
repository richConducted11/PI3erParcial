// database/DatabaseService.js
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
    constructor() {
        this.db = null;
        this.storageKey = 'usuarios'; // Clave para LocalStorage en web [cite: 114]
    }

    // Inicializa la BD y crea la tabla si no existe [cite: 122]
    async initialize() {
        if (Platform.OS === 'web') {
            console.log('Usando LocalStorage para web');
        } else {
            console.log('Usando SQLite para móvil');
            // Abre la base de datos de forma asíncrona [cite: 127]
            this.db = await SQLite.openDatabaseAsync('miapp.db');
            
            // Crea la tabla usuarios [cite: 128]
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);
        }
    }

    // Obtener todos los usuarios [cite: 154]
    async getAll() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } else {
            // Consulta SQL ordenada por ID descendente [cite: 169]
            return await this.db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC');
        }
    }

    // Agregar nuevo usuario [cite: 174]
    async add(nombre) {
        if (Platform.OS === 'web') {
            const usuarios = await this.getAll();
            const nuevoUsuario = {
                id: Date.now(),
                nombre,
                fecha_creacion: new Date().toISOString()
            };
            usuarios.unshift(nuevoUsuario);
            localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
            return nuevoUsuario;
        } else {
            // Inserta en SQLite y retorna el ID insertado [cite: 223]
            const result = await this.db.runAsync(
                'INSERT INTO usuarios (nombre) VALUES (?)',
                nombre
            );
            return {
                id: result.lastInsertRowId, // [cite: 228]
                nombre,
                fecha_creacion: new Date().toISOString()
            };
        }
    }
}

// Exportar una instancia única (Singleton) [cite: 232]
export default new DatabaseService();