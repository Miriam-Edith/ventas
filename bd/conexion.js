const admin = require("firebase-admin");
const keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

const bd=admin.firestore();
const usuarios=bd.collection("mi-ejemplo-bd");
const productos=bd.collection("productos");
const ventas = bd.collection("ventas"); 

module.exports={
    usuarios,
    productos,
    ventas
}

//console.log(usuarios);