// Ordenes
export interface Ordenes {
    orden: OrdenTrabajo;
    detalles: Detalle[];
}

export interface Detalle {
    idEstado?: number;
    fecha?: number;
    ubicacion?: string;
    descripcion?: string;
    imagen?: string;
    idOrdenTrabajo?: number;
    historialEstado?: HistorialEstado;
    idHistorialEstado?: number
}


export interface HistorialEstado {
    idHistorial: number;
    nombre: string;
}
export interface OrdenTrabajo {
    idOrdenTrabajo?: number;
    numeroOrden?: string;
    categoria?: string;
    tipoGarantia?: string;
    nombreEquipo?: string;
    numeroSerie?: string;
    marca?: string;
    modelo?: string;
    observacionesEquipo?: string;
    fecha?: Date;
    aniosGarantia?: number;
    estado?: string,
    numeroFactura?: string;
    fechaFactura?: Date;
    montoFactura?: number;
    usuario?: Usuario;
    cliente?: Cliente;
    proveedor?: Proveedor;
}

export interface Cliente {
    idCliente?: number,
    cedula?: string;
    nombres?: string;
    apellidos?: string;
    telefono?: string;
    direccion?: string;
    correo?: string;
}
export interface Usuario {
    idUsuario?: number;
    cedula?: string;
    nombres?: string;
    apellidos?: string;
    telefono?: string;
    direccion?: string;
    correo?: string;
    contrasena?: string;

}

export interface ProductoDanado {
    idOrdenTrabajo?: number,
    nombreEquipo?: string;
    numeroSerie?: string;
    marca?: string;
    modelo?: string;
}


export interface CambioProducto {
    descripcion?: string;
    ordenTrabajo?: OrdenTrabajo;
    producto?: Producto
}

// interface Producto {
//     nombre?: string;
//     numeroSerie?: string;
//     marca?: string;
//     modelo?: string;
// }


export interface EntregaProducto {
    nombres: string;
    apellidos: string;
    cedula: string;
    telefono: string;
    correo: string;
    ubicacion: string;
    descripcion: string;
    idOrdenTrabajo: number;
    imagen: string,
}


/////////////////////////////////////////////////////////////////// productos

export interface Productos {
    producto:            Producto;
    cantidad:            number;
    numeroSerieProducto: NumeroSerieProducto[];
}

export interface NumeroSerieProducto {
    numeroSerie: string;
}


export interface Inventario {
    idInventario:       number;
    decripcionProducto: string;
    fecha:              number;
    movimiento:         string;
    existentes:         number;
    tipo:               string;
    cantidad:           number;
    stock:               number;
    producto:           Producto;
}


export interface Producto {
    idProducto?: number,
    nombre?:      string;
    marca?:       string;
    modelo?:      string;
    origen?:      string;
    categoria?:   Categoria;
    proveedor?:   Proveedor;
    stock? :      string;
}

export interface Categoria {
    idCategoria?: number;
    nombre: string;
}

export interface Proveedor {
    id?: number,
    cedula?:      string;
    nombres?:     string;
    apellidos?:   string;
    telefono?:    string;
    direccion?:   string;
    correo?:      string;
}
