var ruta = require("express").Router();
var {mostrarProductos,nuevoProducto,borrarProducto,buscarPorId}=require("../bd/productosBD");


ruta.get("/",async (req,res)=>{
    const productos=await mostrarProductos();
    res.json(productos);
});

ruta.get("/buscarPorId/:id",async(req,res)=>{
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});
ruta.get("/borrarProducto/:id",async(req,res)=>{
    var borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoProducto",async(req,res)=>{
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

module.exports=ruta;