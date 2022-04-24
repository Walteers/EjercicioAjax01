//  Para eliminar datos en la tabla previamente cargados
const cleanTable = (table) => {
    if (table.children[1]) {
        for (let i = table.children.length; i > 1; i--) {
            table.removeChild(table.children[i - 1]);
        }
    }
}


//---------------------------------------------------------------

//  Funcion para crear un objeto XMLHttpRequest, este retorna un objeto de este tipo
const getXHR = () => {
    let xhr;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
    else xhr = new ActiveXObject("Microsoft.XMLHTTP");
    return xhr;
}


//---------------------------------------------------------------

//  Función para crear un OPTION para SELECT

const addOptionToSelect = (dataJson, property) => {

    const valuesOptions = [];
    for (const heroe of dataJson) {
        //creamos un array con datos "property". Son los VALUE de cada OPTION del SELECT(aca hay repetidos)
        valuesOptions.push(heroe[property]);
    }
    //  Obtenemos c/u de los datos sin repetir para completar el SELECT
    const dataOption = [... new Set(valuesOptions)];


    //Completamos la lista SELECT
    const fragment = document.createDocumentFragment();
    for (const data of dataOption) {
        const listOption = document.createElement('OPTION');
        listOption.textContent = data;
        listOption.value = data;
        fragment.appendChild(listOption);
    }

    return fragment;
}


//---------------------------------------------------------------

//   Funcion para crear una fila(TR o table row) con sus datos (TD) correspondientes. Los parametros son un 'dataJson' que es la respuesta del objeto XMLHttpRequest(Toda la informacion completa en este caso). Una 'property', que es la propiedad a buscar en cada heroe(cada objeto del array de la respuesta a la petición Ajax). El optionValue' es la opción elejida en el SELECTED´ para hacer la busqueda en el array de objetos de la petición Ajax(dataJson).
//  Al finalizar, retornamos el/los datos de los heroes a mostrar en pantalla(TABLE).
const addTRwithTD = (dataJson, property, optionValue) => {

    const fragment = document.createDocumentFragment();
    for (const heroe of dataJson) {

        //Verifico si el dato a buscar es igual al dato en el Json
        if (heroe[property] == optionValue) {

            const listRow = document.createElement('TR');
            const nameTD = document.createElement('TD');
            const alignmentTD = document.createElement('TD');
            const homeTownTD = document.createElement('TD');
            const genderTD = document.createElement('TD');
            const fightingTD = document.createElement('TD');

            nameTD.textContent = heroe.Name;
            alignmentTD.textContent = heroe.Alignment;
            homeTownTD.textContent = heroe.Hometown;
            genderTD.textContent = heroe.Gender;
            fightingTD.textContent = heroe.Fighting_Skills;

            listRow.appendChild(nameTD);
            listRow.appendChild(alignmentTD);
            listRow.appendChild(homeTownTD);
            listRow.appendChild(genderTD);
            listRow.appendChild(fightingTD);

            fragment.appendChild(listRow);
        }
    }
    return fragment;
}


//---------------------------------------------------------------

// Funcion para desactivar los SELECT
const selectGroupDisable = (selectGroup) => {
    for (let i = 0; i < selectGroup.children.length; i++) {
        selectGroup.children[i].disabled = true;
    }
}