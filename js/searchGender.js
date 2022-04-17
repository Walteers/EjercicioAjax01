const genderCharacters = document.getElementById('genderCharacters');

//Comentamos la declaracion de "Const table" ya que esta se encuentra declarda en "searchName.js"
//const table = document.getElementById('table');
const genderForm = document.getElementById('genderForm');

genderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getDataGender(genderCharacters.value);
})



const getDataGender = (genderData) => {

    //Instanciamos el objeto XMLHttpRequest
    let xhr;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
    else xhr = new ActiveXObject("Microsoft.XMLHTTP");


    if (genderData == undefined) {
        //Abrimos la peticion en la primera recarga de la pagina(en este caso si los Gender no estan cargados)
        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);
            //console.table(dataJson);

            //Obtenemos c/u de los Generos sin repetir de ".Genders"
            const genero = [];
            for (const heroe of dataJson) {
                //creamos un array con datos "Gender"
                genero.push(heroe.Gender);
            }
            const generos = [... new Set(genero)];
            //console.log(generos);

            //Completamos la lista SELECT
            const fragment = document.createDocumentFragment();
            for (const gender of generos) {
                const listOption = document.createElement('OPTION');
                listOption.textContent = gender;
                listOption.value = gender;
                fragment.appendChild(listOption);
            }
            genderCharacters.appendChild(fragment);

        })

    } else {

        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);


            //Enviamos los generos a pantalla
            const fragment = document.createDocumentFragment();
            for (const heroe of dataJson) {

                //Verifico si el dato a buscar es igual al dato en el Json
                if (heroe.Gender == genderData) {

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

            // Para eliminar datos en la tabla previamente cargados
            cleanTable(table);

            // Agregamos datos a la tabla
            table.appendChild(fragment);

        })

    }

    xhr.send();
}

getDataGender();
