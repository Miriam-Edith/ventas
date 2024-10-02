const ventasBD = require("./conexion").ventas; // Se asume que ya configuraste ventas en conexion.js

// Mostrar todas las ventas
async function mostrarVentas() {
    const ventas1 = await ventasBD.get();  // Obtener todas las ventas desde Firestore
    const ventas = [];
    ventas1.forEach(doc => {
        ventas.push({ id: doc.id, ...doc.data() });
    });
    return ventas;
}

// Buscar venta por ID
async function buscarPorId(id) {
    const ventaSis = await ventasBD.doc(id).get();
    if (!ventaSis.exists) {
        return null;  // Si no existe la venta, retorna null
    }
    return { id: ventaSis.id, ...ventaSis.data() };
}

// Crear nueva venta
async function nuevaVenta(data) {
    const fecha = new Date().toISOString();
    const venta = {
        ...data,
        fecha: fecha.split('T')[0],  // Solo la fecha (YYYY-MM-DD)
        hora: fecha.split('T')[1].split('.')[0],  // Solo la hora (HH:MM:SS)
        estatus: "vendido"  // Estado inicial de la venta
    };
    const nuevaVentaRef = await ventasBD.add(venta);  // Agregar nueva venta con ID automático
    return nuevaVentaRef.id;  // Retornar el ID de la venta creada
}

// Cancelar venta (actualizar estatus a "cancelado")
async function cancelarVenta(id) {
    const venta = await buscarPorId(id);
    if (!venta) {
        return { error: "La venta no existe" };  // Retorna error si no existe
    }
    await ventasBD.doc(id).update({ estatus: "cancelado" });
    return { success: true, message: "Venta cancelada con éxito" };
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarPorId,
    cancelarVenta
};
