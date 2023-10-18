const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(link, name, alt, deleteFn) { 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').alt = alt;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteFn); 

    return cardElement;
};

function renderCard(cardData, container){
    container.append(cardData);
};

function deleteCard(evt) {
    const currentCard =evt.target;
    currentCard.closest('.places__item').remove();
};

initialCards.forEach((cards) => {
    renderCard(createCard(cards.link, cards.name, cards.name, deleteCard), placesList)
});
