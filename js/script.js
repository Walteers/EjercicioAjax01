//  "searchForm" es para identificar los 'radio button' en el HTML(opciones de busqueda)
const searchForm = document.getElementById('searchForm');

//  "searchButton" es para identificar el boton de busqueda del los 'radio button'
const searchButton = document.getElementById('searchButton');


//  Identificamos a cada uno de los SELECTED, estos se encuentran desactivados por defecto, en caso de elejir uno lo activamos y al resto al mismo tiempo lo desactivamos, por si en una ocasión anterior hayan sido activados
const optionBoxName = document.getElementById('optionBoxName');
const optionBoxAlignment = document.getElementById('optionBoxAlignment');
const optionBoxHomeTown = document.getElementById('optionBoxHomeTown');
const optionBoxGender = document.getElementById('optionBoxGender');
const optionBoxFighting = document.getElementById('optionBoxFighting');


//  Escuchamos el evento 'click' en el boton de opciones de 'radio button'
searchButton.addEventListener('click', () => {

    //  Si al hacer click, el value del radio button esta vacio, se habre una ventana de alerta pidiendo seleccionar una opcion de búsqueda,
    if (searchForm.searchOption.value == '' || searchForm.searchOption.value == undefined) alert(`Seleccione una opcion de busqueda`);
    else {
        console.log(searchForm.searchOption.value);

        //  En cada caso del switch habilitamos el SELECT correspondiente a la elección del VALUE del RADIO BUTTON correspondiente y deshabilitamos el resto.
        switch (searchForm.searchOption.value) {
            case 'name':
                optionBoxName.disabled = false;

                optionBoxAlignment.disabled = true;
                optionBoxHomeTown.disabled = true;
                optionBoxGender.disabled = true;
                optionBoxFighting.disabled = true;
                break;

            case 'aligment':
                optionBoxAlignment.disabled = false;

                optionBoxName.disabled = true;
                optionBoxHomeTown.disabled = true;
                optionBoxGender.disabled = true;
                optionBoxFighting.disabled = true;
                break;

            case 'hometown':
                optionBoxHomeTown.disabled = false;

                optionBoxName.disabled = true;
                optionBoxAlignment.disabled = true;
                optionBoxGender.disabled = true;
                optionBoxFighting.disabled = true;
                break;

            case 'gender':
                optionBoxGender.disabled = false;

                optionBoxName.disabled = true;
                optionBoxAlignment.disabled = true;
                optionBoxHomeTown.disabled = true;
                optionBoxFighting.disabled = true;
                break;

            case 'fighting_skill':
                optionBoxFighting.disabled = false;

                optionBoxName.disabled = true;
                optionBoxAlignment.disabled = true;
                optionBoxHomeTown.disabled = true;
                optionBoxGender.disabled = true;
                break;

            default:
                console.error('Error en la opcion de RADIO BUTTON');
                break;
        }

    }

})