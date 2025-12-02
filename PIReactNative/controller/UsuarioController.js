// controller/UsuarioController.js
import { Usuario } from '../models/usuario'; // [cite: 243]
import DatabaseService from '../database/DatabaseService'; // [cite: 244]

export class UsuarioController {
    constructor() {
        this.listeners = []; // Lista de observadores [cite: 247]
    }

    // Inicializar el servicio de BD [cite: 264]
    async initialize() {
        await DatabaseService.initialize();
    }

    // Sistema de observadores [cite: 295]
    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }

    // Obtener usuarios y convertirlos a objetos del Modelo [cite: 268]
    async obtenerUsuarios() {
        try {
            const data = await DatabaseService.getAll();
            // Mapea los datos crudos a instancias de la clase Usuario [cite: 271]
            return data.map(u => new Usuario(u.id, u.nombre, u.fecha_creacion));
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw new Error('No se pudieron cargar los usuarios');
        }
    }

    // Crear usuario con validación y notificación [cite: 290]
    async crearUsuario(nombre) {
        try {
            // 1. Validar datos usando el Modelo [cite: 290]
            Usuario.validar(nombre);

            // 2. Insertar en BD usando el Servicio [cite: 290]
            const nuevoUsuario = await DatabaseService.add(nombre.trim());

            // 3. Notificar a los observadores para actualizar vista [cite: 290]
            this.notifyListeners();

            // 4. Retornar instancia del Modelo Usuario [cite: 290]
            return new Usuario(
                nuevoUsuario.id,
                nuevoUsuario.nombre,
                nuevoUsuario.fecha_creacion
            );
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }
}