function populateUFs() {
    var ufSelect = document.querySelector('select[name=uf]')   

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json())
        .then( states => {
            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}
    
populateUFs()


function getCities(event){
    const citySelect = document.querySelector('select[name=city]')
    var stateInput = document.querySelector('input[name=state]')
    
    
    const valueUf = event.target.value
    
    const indexOfSelect = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelect].text
    
    console.log(valueUf)
    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valueUf}/municipios`

    citySelect.innerHTML = "<option value>Seleciona a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            citySelect.innerHTML = ""
            for(const element of cities){
                citySelect.innerHTML += `<option value="${element.nome}">${element.nome}</option>`                
            }
            citySelect.disabled = false
        })
}

document
    .querySelector('select[name=uf]')
    .addEventListener("change", getCities);
    

// itens de coleta
const itemsToCollect = document.querySelectorAll(".itens-grid li")


for(const item of itemsToCollect){
    item.addEventListener('click', selectItem)
    
}

let selectedItems = [];

function selectItem(event) {
    const itemLi = event.target;

    //-- add ou remover uma classe com js - se já tiver remove, se não tiver add
    itemLi.classList.toggle('select')

    const itemId = itemLi.dataset.id  
    
    //verifica se existem itens selecionados, se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound;
    } )

    // se já tiver selecionado , tirar da seleção
    if(alreadySelected >= 0){
        const filterItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent;
        })

        selectedItems = filterItems
    } else {
        selectedItems.push(itemId)
    }

    console.log(selectedItems)
    document.querySelector('input[name=items]')
}


