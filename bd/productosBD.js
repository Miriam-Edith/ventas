const productosBD = require("./conexion").productos;
const Producto = require("../clase/productoClase");
const {encriptarPassword, validarPassword}= require("../middelwares/funcionesPassword")

function validarDatos(producto2){
    //console.log("Validando producto:", producto2);  // Depuración
    var datosCorrectos=false;
    if(producto2.empresa != undefined && producto2.producto != undefined){
        datosCorrectos=true;
    }
    return datosCorrectos;
}

async function mostrarProductos(){
    const productos = await productosBD.get();
    var productosValidos=[];
    productos.forEach(producto => {
        const producto1 = new Producto({id:producto.id,...producto.data()});
        const producto2 = producto1.getproducto;
        if(validarDatos(producto2)){
            productosValidos.push(producto2);
        }
    });
    return productosValidos;
}

async function buscarPorId(id) {
   const producto=await productosBD.doc(id).get();
   //console.log(producto.data());
   const producto1=new Producto({id:producto.id,...producto.data()});
   var productoValido={error:true};
   if(validarDatos(producto1.getproducto)){
    productoValido=producto1.getproducto
   }
   return productoValido;
}

async function nuevoProducto(data){
    const producto1=new Producto(data);
    var productoValido=false;
    if(validarDatos(producto1.getproducto)){
        await productosBD.doc().set(producto1.getproducto);
        productoValido=true;
    }
    return productoValido;
}

async function borrarProducto(id){
    const producto= await buscarPorId(id);
    var borrado=false;
    if(producto.error!=true){
        await productosBD.doc(id).delete();
        borrado=true;
    }
    return borrado;
}

module.exports={
    mostrarProductos: mostrarProductos,
    nuevoProducto: nuevoProducto,
    borrarProducto: borrarProducto,
    buscarPorId
}

/*data={
    nombre:"Lara",
    producto:"delicias",
}

nuevoProducto(data);*/