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



// Функция открытия модального окна
function openModal (modalForOpen, buttonForOpen) {
    const modalOpen = document.querySelector(modalForOpen);
    const button = document.querySelector(buttonForOpen);
        
    button.addEventListener('click', function() {
        modalOpen.classList.add('popup_is-opened');
        modalOpen.classList.add('popup_is-animated');
    })
}

// Вызов открытия модальных окон редактирования и добавления карточки
openModal('.popup_type_edit', '.profile__edit-button');
openModal('.popup_type_new-card', '.profile__add-button');


// Функция закрытия модального окна
function closeModal(modalForClose) {
    const modalClose = document.querySelector(modalForClose);
    
    function handleTarget(evt) {
        const target = evt.target;  
        if (
            target === modalClose ||
            target.closest('.popup__close') ||
            evt.code === 'Escape') {
                modalClose.classList.remove('popup_is-opened');
        }
    }

    modalClose.addEventListener('click', handleTarget);
    window.addEventListener('keydown', handleTarget);
}

// Вызов закрытия модальных окон редактирования и добавления карточки
closeModal('.popup_type_edit');
closeModal('.popup_type_new-card');


// const formElement = document.querySelector('.popup__form');

// const nameInput = formElement.querySelector('.popup__input_type_name');
// const jobInput = formElement.querySelector('.popup__input_type_description');

// const profileTitle = document.querySelector('.profile__title');
// const profileDescription = document.querySelector('.profile__description');

// nameInput.value = profileTitle.textContent;
// jobInput.value = profileDescription.textContent;


// function handleFormSubmit(evt) {
//     evt.preventDefault(); 

//     profileTitle.textContent = nameInput.value;
//     profileDescription.textContent = jobInput.value;

//     handleModal('.popup__button', '.popup_type_edit');
// }

// formElement.addEventListener('submit', handleFormSubmit); 
 


