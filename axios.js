//Versión con Axios
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const BASE_URL_API ='https://fakestoreapi.com/products';
const BASE_URL_ARCHIVO = path.join(__dirname, 'productos.json');

//Recuperar la información de todos los productos (GET).
async function get_productos() {
    try {
        const response = await axios.get(BASE_URL_API);
        return response.data;

    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

//Recuperar la información de un número limitado de productos (GET).
async function get_productos_limite(limite=3) {
    try {
        const response = await axios.get(`${BASE_URL_API}?limit=${limite}`);
        return response.data;

    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

//Persistir los datos de la consulta anterior en un archivo local JSON.

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


//Agregar un nuevo producto (POST).
async function post_nuevo_producto(producto) {
    try {
        await axios.post(BASE_URL_API, producto);
        console.log('Producto agregado exitosamente');

    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

//Buscar la información de un determinado producto, utilizando un “id” como parámetro (GET).
async function get_producto_id() {
    try {
        const id = parseInt(await readline.question('Ingrese ID del producto a buscar: '));

        const response = await axios.get(`${BASE_URL_API}/${id}`);
        return response.data;

    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

//Eliminar un producto (DELETE).
async function delete_producto_id() {
    try {
        const id = parseInt(await readline.question('Ingrese ID del producto a eliminar: '));

        const response = await axios.delete(`${BASE_URL_API}/${id}`);
        console.log('Producto eliminado correctamente.');

    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

//Modificar los datos de un producto (UPDATE).

async function put_producto_id() {
    try {
        const id = parseInt(await readline.question('Ingrese ID del producto a modificar: '));

        const producto = {
            "title": await readline.question('Inserte nombre del producto: '),
            "price": parseFloat(await readline.question('Inserte precio del producto: ')),
            "description": await readline.question('Inserte descripción del producto: '),
            "category": await readline.question('Inserte categoria del producto: '),
            "image": await readline.question('Inserte url de la imagen del producto: ')
        }

        const response = await axios.put(`${BASE_URL_API}/${id}`, producto);
        console.log('Producto modificado correctamente.');

    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

//Agregar producto al archivo local.
const guardar_producto_archivo = async (datos_a_guardar)  => {

    try{
        //Para no volver a pedir datos, usamos el producto creado en el POST.
        const datos = await fs.readFile(BASE_URL_ARCHIVO,'utf-8');
        const contenido = JSON.parse(datos);

        contenido.push(datos_a_guardar);
        await fs.writeFile(BASE_URL_ARCHIVO, JSON.stringify(contenido, null, 2));

        console.log('Datos guardados correctamente.');
        console.log(contenido);

    }catch(error){
        console.error(error);
    }

}

//Eliminar los productos superiores a un determinado valor.
const eliminar_producto_archivo = async ()  => {

    try{
        
        const valor = parseInt(await readline.question('Ingrese valor para eliminar productos: '))

        const datos = await fs.readFile(BASE_URL_ARCHIVO,'utf-8');
        const contenido = JSON.parse(datos);

        const nuevo_contenido = contenido.filter(producto => producto.id <= valor);
        
        //verificamos si se borro algun producto

        const cEliminados = contenido.length - nuevo_contenido.length;
        if (cEliminados === 0) {
            console.log(`No se encontraron productos con ID mayor a ${valor}`);
            return
        }

        await fs.writeFile(BASE_URL_ARCHIVO, JSON.stringify(nuevo_contenido, null, 2));

        console.log('Datos eliminados correctamente.');

    }catch(error){
        console.error(error);
    }

}




// Usamos readline, para poder pedir valores desde consola.

const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout
});


/*
async function main() {
    try{
        const limit = await readline.question('¿Cuántos productos quieres ver? (deja vacío para el número por defecto): ');

        let productos = await get_productos_limite();

        if (limit && !isNaN(limit)) {
            productos = await get_productos_limite(limit);

        }

        escribir_archivo(productos);

    }catch(error){
        console.error(error);
    }
}*/

/*
async function main() {
    try{
       const producto = {
            "id": parseInt(await readline.question('Inserte id del producto: ')),
            "title": await readline.question('Inserte nombre del producto: '),
            "price": parseFloat(await readline.question('Inserte precio del producto: ')),
            "description": await readline.question('Inserte descripción del producto: '),
            "category": await readline.question('Inserte categoria del producto: '),
            "image": await readline.question('Inserte url de la imagen del producto: ')
        }

        await post_nuevo_producto(producto);

        // Aprovechamos esta parte para no volvera pedir los datos y tambien agregar este producto al archivo local.
        guardar_producto_archivo(producto);

    }catch(error){
        console.error(error);
    }finally{
        readline.close();
    }
}*/

/*
async function main() {
    try{

        const producto = await get_producto_id();
        console.log(producto);

    }catch(error){
        console.error(error);
    }finally{
        readline.close();
    }
}*/

/*
async function main() {
    try{

        await delete_producto_id();

    }catch(error){
        console.error(error);
    }finally{
        readline.close();
    }
}*/

/*
async function main() {
    try{

        await put_producto_id();

    }catch(error){
        console.error(error);
    }finally{
        readline.close();
    }
}*/
/*
async function main() {
    try{

        await eliminar_producto_archivo();

    }catch(error){
        console.error(error);
    }finally{
        readline.close();
    }
}*/

main()