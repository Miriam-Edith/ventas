var ruta = require("express").Router();
var { mostrarVentas, nuevaVenta, buscarPorId, cancelarVenta } = require("../bd/ventasBD");

// Ruta para mostrar todas las ventas
ruta.get("/", async (req, res) => {
    const ventas = await mostrarVentas();
    res.json(ventas);
});

// Ruta para buscar una venta por ID
ruta.get("/buscarPorId/:id", async (req, res) => {
    const venta = await buscarPorId(req.params.id);
    res.json(venta);
});

// Ruta para crear una nueva venta
ruta.post("/nuevaVenta", async (req, res) => {
    const ventaValida = await nuevaVenta(req.body);
    res.json({ ventaValida });
});

// Ruta para cancelar una venta
ruta.put("/cancelarVenta/:id", async (req, res) => {
    const cancelada = await cancelarVenta(req.params.id);
    res.json({ cancelada });
});

module.exports = ruta;
