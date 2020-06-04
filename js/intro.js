

function populateUFs() {
    var ufSelect = document.querySelector('select[name=uf]')   

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => { return res.json()})
        .then( states => {
            states.forEach(element => {
                ufSelect.innerHTML += `<option value="${element.id}">${element.nome}</option>`
            });
        })
}

populateUFs()


function getCities(event){
    var citySelect = document.querySelector('select[name=city]')
    var stateInput = document.querySelector('input[name=state]')

    var valueUf = event.target.value

    var indexOfSelect = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelect].text

    var url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valueUf}/municipios`

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            cities.forEach(element => {
                citySelect.innerHTML += `<option value="${element.id}">${element.nome}</option>`
                citySelect.disabled = false
            })
        })
}

document
    .querySelector('select[name=uf]')
    .addEventListener("change", getCities);