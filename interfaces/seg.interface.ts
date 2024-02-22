export interface Usuario {
    username: string;
    nombre: string;
    apellido: string;
    correo: string;
    roles: string;
    estado?: string;
    password?: string
}