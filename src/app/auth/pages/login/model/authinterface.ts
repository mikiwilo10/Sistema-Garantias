export interface AuthResponse {
    ok:             boolean;
    codigo?:         number;
    token:          string;
    idUsuario?:      string;
    nombreApellido?: string;
}