import '../pages/index.css';
import { initialCards } from './cards.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(link, name, alt, deleteFn) { 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').alt = alt;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteFn); 

   
   // handleModal('.card__image', '.popup_type_image')
  

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
    renderCard(createCard(cards.link, cards.name, cards.name, deleteCard), placesList);
});


// Открытие и закрытие модальных окон

function handleModal(btnForOpen, modal) {
    const btn = document.querySelector(btnForOpen);
    const mdl = document.querySelector(modal);

    function closeModal(evt) {
        const target = evt.target;

        if (
            target === mdl ||
            target.closest('.popup__close') ||
            evt.code === 'Escape') {
                mdl.classList.remove('popup_is-opened');
            }
    }

    function openModal() {
        mdl.classList.add('popup_is-opened');  
        mdl.classList.add('popup_is-animated');
        
    }

    btn.addEventListener('click', openModal);
    mdl.addEventListener('click', closeModal)
    window.addEventListener('keydown', closeModal);
}


// Вызов функции открытия и закрытия модальных оконо для Редактирования и Добавления нового места
handleModal('.profile__edit-button', '.popup_type_edit');
handleModal('.profile__add-button', '.popup_type_new-card');


// 
const formElement = document.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;


function handleFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    handleModal('.popup__button', '.popup_type_edit');
}

formElement.addEventListener('submit', handleFormSubmit); 
 


