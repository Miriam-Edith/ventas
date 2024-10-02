const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../clase/usuarioClase");
const {encriptarPassword, validarPassword}=require("../middelwares/funcionesPassword");

function validarDatos(usuario2){
   var datosCorrectos=false;
   if(usuario2.nombre!=undefined && usuario2.usuario!=undefined && usuario2.password!=undefined){
      datosCorrectos=true;
   }
   return datosCorrectos;
}


async function mostrarUsuarios(){
   const  usuario = await usuariosBD.get();
   //console.log(usuarios);
   var usuariosValidos=[];
   usuario.forEach(usuario => {
      //console.log(usuario.data());
      const usuario1 = new Usuario({id:usuario.id,...usuario.data()});
      //console.log(usuario1);
      const usuario2 = usuario1.getUsuario;
      //console.log(usuario2);
      
      if(validarDatos(usuario2)){
         usuariosValidos.push(usuario2);
   }
   });
   console.log(usuariosValidos);
   return usuariosValidos;
    
}
//mostrarUsuarios();

async function buscarPorId(id){
   const usuario=await usuariosBD.doc(id).get();
   const usuario1=new Usuario({id:usuario.id,...usuario.data()});
   var usuarioValido={error:true};
   //console.log(usuario1.getUsuario);
   //buscarPorId("2tzbrz2uzy6K5hoK7f6f");
//buscarPorId("8KFw7vjJkDHezOMFdrp0");

   
   if(validarDatos(usuario1.getUsuario)){
      usuarioValido=usuario1.getUsuario 
   }
   //console.log(usuarioValido);
   //console.log(usuario.data());
}

//agregar usuario a la BD

async function nuevoUsuario(data) {
   const {salt, hash}=encriptarPassword(data.password);
   data.password=hash;
   data.salt=salt;
   data.tipoUsuario="usuario";
   const usuario1=new Usuario(data);
   //console.log(usuario1.getUsuario);
   var usuarioValido=false;
   if (validarDatos(usuario1.getUsuario)){
      await usuariosBD.doc().set(usuario1.getUsuario)
      usuarioValido=true;
   }
   return usuarioValido;
}

   async function borrarUsuario(id) {
      const usuario = await buscarPorId(id);
      var borrador=false;
      //if (usuario=undefined){
         if (usuario.error!=true){
         await usuariosBD.doc(id).delete();
         //var borrado;
         borrador=true;
      }
      //console.log(usuario);
      return borrado;
   }

   module.exports={
      mostrarUsuarios,
      nuevoUsuario,
      borrarUsuario,
      buscarPorId
   }
    //borrarUsuaruio("100");
   //borrarUsuaruio("200");
   //borrarUsuaruio("300");


   /*data ={
      nombre:"Pancho Villa",
      usuario:"pancho",
      password:"abc"
    }
   nuevoUsuario(data);*/

  
