'use strict'
const http = require('http');
const fs = require('fs');


const leer_documento = fs.read('./panel.html', function(err, data){
    if(err){
        console.log(err)
        return;
    }
    console.log(data);
    return data;
});

const callbackServer = (req, res)=>{
    // Configura la respuesta HTTP
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Escribe la respuesta que se enviará al cliente
    res.write(leer_documento.toString());
    res.end();
};

const nuevoServer = http.createServer(callbackServer)

nuevoServer.listen(3000, function(){
    console.log("Servidor avierto en 3000");
});clearInterval