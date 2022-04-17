const searchForm = document.getElementById('searchForm');
const searchButton = document.getElementById('searchButton');

const optionBoxName = document.getElementById('optionBoxName');
const optionBoxAlignment = document.getElementById('optionBoxAlignment');
const optionBoxHomeTown = document.getElementById('optionBoxHomeTown');
const optionBoxGender = document.getElementById('optionBoxGender');
const optionBoxFighting = document.getElementById('optionBoxFighting');



searchButton.addEventListener('click', () => {

    if (searchForm.searchOption.value == '' || searchForm.searchOption.value == undefined) alert(`Seleccione una opcion de busqueda`);
    else {
        console.log(searchForm.searchOption.value);

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