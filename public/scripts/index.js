const buttonSearch = document.querySelector('#page-home main a');
const modal = document.querySelector('#modal');
const close = document.querySelector('#modal .header a');

// rota para acionar o modal quando clicado no botão pesquisar pontos de coleta
buttonSearch.addEventListener('click', () => {
    modal.classList.remove('hide');
})

close.addEventListener('click', () => {
    modal.classList.add('hide');
})


