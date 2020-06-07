
/*Introduzindo a aplicação da API da seleção de Estados*/
function populateUfs() {
    const ufSelect = document.querySelector('select[name = uf]');

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then( states => {

            for( const state of states) {

                ufSelect.innerHTML += `<option value = ${state.id}>${state.nome}</option>`
            }
        })    
}

populateUfs();


function getCities(event) {
    const citySelect = document.querySelector('select[name = city]');
    const stateInput = document.querySelector('input[name = state]');


    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

  

    

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
            
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;


    fetch(url).then( (res) => {
        return res.json().then( cities => {
            
            for( const city of cities) {

                citySelect.innerHTML += `<option value = ${city.nome}>${city.nome}</option>`
            }

            citySelect.disabled = false;

        })
    })
}

document.querySelector("select[name = uf]").addEventListener("change", getCities)



// Itens de coleta 
// pegar todos os elementos com li's

const ItemsToColect = document.querySelectorAll('.items-grid li');

for(const item of ItemsToColect) {
   item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name = items]");

// variavel let para pegar os inputs do meus itens selecionados
let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target
    // add or remove a class with javaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id;

    // testar dado  => console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId; // isso retornará true or false.
        return itemFound;

    });

    // se já estiver selecionado, tirar da seleção
    if( alreadySelected >= 0 ) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent;
        })

        selectedItems = filteredItems;

    }else {
        // se não estiver selecionado
        //adicionar à seleção
        selectedItems.push(itemId);
    }

  // testar dado  => console.log(' selectedItems: ', selectedItems)
    // atualizar o campo escondido com os itens selecionados

    collectedItems.value = selectedItems;
} 

