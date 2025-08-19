// archivo principal

const {
    get_productos,
    get_productos_limite,
    escribir_archivo,
    post_nuevo_producto,
    get_producto_id,
    delete_producto_id,
    put_producto
} = require('./consultas');


async function pruebaConsultas () {

    console.log("1. Obteniendo todos los productos...");
    await get_productos();
    console.log(`\n`);

    console.log("2. Obteniendo 3 productos...");
    const productosLimitados = await get_productos_limite(3);
    console.log("Productos limitados:", productosLimitados);
    console.log(`\n`);

    console.log("\n3. Guardando productos en archivo...");
    await escribir_archivo(productosLimitados);
    console.log(`\n`);
    
    console.log("4. Agregando nuevo producto...");
    const producto = {
            "id":40 ,
            "title": 'Remera',
            "price": 65,
            "description":'remera de algodon manga corta',
            "category": 'ropa masculina',
            "image": 'imagen.com'
        }
    await post_nuevo_producto(producto);
    console.log(`\n`);


    console.log("5. Obteniendo producto con ID 1...");
    await get_producto_id(1);
    console.log(`\n`);
    
    console.log("6. Eliminando producto...");
    await delete_producto_id(10);
    console.log(`\n`);

    console.log("7. Actualizando producto con ID 1...");
    const producto2 = {
            "title": 'Remera',
            "price": 65,
            "description":'remera de algodon manga corta',
            "category": 'ropa masculina',
            "image": 'imagen.com'
    }
    await put_producto(1, producto2);
    console.log("Producto actualizado\n");
}

pruebaConsultas()