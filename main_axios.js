// archivo principal Axios
const {
    get_productos,
    get_productos_limite,
    escribir_archivo,
    post_nuevo_producto,
    get_producto_id,
    delete_producto_id,
    put_producto_id,
    eliminar_producto_archivo,
    guardar_producto_archivo
} = require('./axios');

// Usamos readline, para poder pedir valores desde consola.

const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout
});



async function pruebaConsultasAxios () {
    try{
        console.log("1. Obteniendo todos los productos...");
        const total_productos = await get_productos();
        console.log(total_productos);
        console.log(`\n`);
        
        console.log("2. Obteniendo x productos...");
        const limit = await readline.question('¿Cuántos productos quieres ver? (deja vacío para el número por defecto): ');
        const productos_limite = await get_productos_limite();
        if (limit && !isNaN(limit)) {
            productos_limite = await get_productos_limite(limit);
        }

        // Utilizamos los pruductos obtenidos
        console.log("\n3. Guardando productos en archivo...");
        await escribir_archivo(productos_limite);
        console.log(`\n`);

        console.log("4. Agregando nuevo producto...");
        const producto_nuevo = {
                "id": parseInt(await readline.question('Inserte id del producto: ')),
                "title": await readline.question('Inserte nombre del producto: '),
                "price": parseFloat(await readline.question('Inserte precio del producto: ')),
                "description": await readline.question('Inserte descripción del producto: '),
                "category": await readline.question('Inserte categoria del producto: '),
                "image": await readline.question('Inserte url de la imagen del producto: ')
        }
        await post_nuevo_producto(producto_nuevo);

        // Aprovechamos esta parte para no volvera pedir los datos y tambien agregar este producto al archivo local.
        await guardar_producto_archivo(producto);

        console.log("5. Obteniendo producto con ID");
        const producto_id = await get_producto_id();
        console.log(producto_id);
        console.log(`\n`);

        console.log("6. Eliminando producto...");
        await delete_producto_id();
        console.log(`\n`);

        console.log("7. Actualizando producto con ID...");
        await put_producto_id();
        console.log(`\n`);

        console.log("8. Eliminando producto del archivo...");
        await eliminar_producto_archivo();

    }catch(error){
        console.error(error);
    }finally{
        readline.close();
    }
}

pruebaConsultasAxios()

