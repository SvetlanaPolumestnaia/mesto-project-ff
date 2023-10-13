const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach(cardData => { 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    placesList.append(cardElement);     
    
    const deleteButtons = document.querySelectorAll('.card__delete-button');

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', deleteCard)
    });
});

function deleteCard(evt) {
    const currentCard = evt.target;
    currentCard.closest('.places__item').remove();
};