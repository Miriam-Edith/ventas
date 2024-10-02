const express = require("express");
const usuariosRutas=require("./rutas/rutasUsuarios");
const productosRutas = require ("./rutas/rutasProductos");
const ventasRutas = require("./rutas/rutasVentas");

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/P",productosRutas);
app.use("/u",usuariosRutas);
app.use("/v", ventasRutas);

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});