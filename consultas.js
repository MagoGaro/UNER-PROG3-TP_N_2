const BASE_URL =' https://fakestoreapi.com/products';

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

