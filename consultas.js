const BASE_URL =' https://fakestoreapi.com/products';
const fs = require('fs').promises;
const path = require('path');
const BASE_URL_ARCHIVO = path.join(__dirname,'productos.json');

//Recuperar la información de todos los productos (GET).

async function get_productos() {
    try{
        const response = await fetch(BASE_URL);

        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        };

        const datos = await response.json();
        console.log(datos);

    }catch{
        console.error(`Error: ${error}`);
    };
};

// Recuperar la información de un número limitado de productos (GET). 

async function get_productos_limite(limite = 5) {
    try{
        const response = await fetch(`${BASE_URL}?limit=${limite}`);

        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        };

        const datos = await response.json();
        //console.log(datos);
        return datos
    }catch{
        console.error(`Error: ${error}`);
    };
};

// Persistir los datos de la consulta anterior en un archivo local JSON.

const escribir_archivo = async (datos_a_guardar)  => {

    try{
        await fs.writeFile(BASE_URL_ARCHIVO, JSON.stringify(datos_a_guardar, null, 2));

        console.log('Mostrando los datos guardados: ');

        const datos = await fs.readFile(BASE_URL_ARCHIVO,'utf-8');
        const contenido = JSON.parse(datos);
        console.log(contenido);

    }catch(error){
        console.error(error);
    }

}

 // Agregar un nuevo producto (POST).

 async function post_nuevo_producto(producto) {
     try {
         const response = await fetch(BASE_URL,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(producto)
         });

         if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        };
        const datos = await response.json();
        console.log('Producto agregado correctamente:',datos);
     } catch (error) {
                console.error(`Error: ${error}`);

     }
 }

// Buscar la información de un determinado producto, utilizando un “id” como parámetro (GET).

 async function get_producto_id(id) {
     try {
        const response = await fetch(`${BASE_URL}/${id}`);

        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        };

        const datos = await response.json();
        console.log(datos);

    }catch{
        console.error(`Error: ${error}`);
    };
};

// Eliminar un producto (DELETE).

 async function delete_producto_id(id) {
     try {
        const response = await fetch(`${BASE_URL}/${id}`,{
            method: 'DELETE'
        });

        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        };

        const datos = await response.json();
        console.log('Producto eliminado correctamente:',datos);

    }catch{
        console.error(`Error: ${error}`);
    };
};

// Modificar los datos de un producto (UPDATE).

 async function put_producto(id,producto) {
     try {
         const response = await fetch(`${BASE_URL}/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(producto)
         });

         if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        };
        const datos = await response.json();
        console.log('Producto actualizado correctamente:',datos);
     } catch (error) {
                console.error(`Error: ${error}`);

     }
 }


// Exportar todas las funciones
module.exports = {
    get_productos,
    get_productos_limite,
    escribir_archivo,
    post_nuevo_producto,
    get_producto_id,
    delete_producto_id,
    put_producto
};
