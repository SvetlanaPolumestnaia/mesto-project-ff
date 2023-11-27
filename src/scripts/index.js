import '../pages/index.css';
import { modals, 
         modalEditProfile, 
         modalAddNewCard,
         modalImage,
         modalImageImg,
         modalImageCaption,
         buttonCloseImage,
         buttonEditProfile,
         buttonSaveEditProfile,
         buttonCloseEditProfile,
         buttonAddNewCard,
         buttonSaveAddNewCard,
         buttonCloseAddNewCard,
         initialCards, 
         placesList, 
         formEditProfile, 
         nameInput, 
         jobInput, 
         profileTitle, 
         profileDescription, 
         formNewCard, 
         placeNameInput, 
         urlInput, 
         validationConfiguration,
         apiConfiguration} from './constants.js';
import { createCard, 
         deleteCard, 
         likeCard } from './cards.js';
import { openModal, 
         closeModal } from './modals.js';
import { enableValidation, 
         clearValidation } from './validation.js';
import { changeProfileData,
         getInitialCards } from './api.js';

// Функция добавления новой карточки на страницу
export function renderCard(cardData, container) {
    container.append(cardData);
  };

// Чтобы по умолчанию при открытии окна редактирования подставлялись значения из профайла
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Редактирование профиля
function handleFormEditProfile(evt) {        
    evt.preventDefault();

    buttonEditProfile.addEventListener('click', () => {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileDescription.textContent;
    })

    if (nameInput.validity.valid && jobInput.validity.valid) {
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
    }

    clearValidation(formEditProfile, nameInput, validationConfiguration);
    clearValidation(formEditProfile, jobInput, validationConfiguration);

}

formEditProfile.addEventListener('submit', handleFormEditProfile);

// Добавление новой карточки пользователем
function handleFormAddNewCard(evt) {
    evt.preventDefault();

    addCard(placeNameInput.value, urlInput.value);

    if (placeNameInput.validity.valid && urlInput.validity.valid) {
        const newCardData = createCard(urlInput.value, placeNameInput.value, placeNameInput.value, deleteCard, likeCard, openModalImage);
        placesList.prepend(newCardData);
    }
    
    clearValidation(formNewCard, placeNameInput, validationConfiguration);
    clearValidation(formNewCard, urlInput, validationConfiguration);

    formNewCard.reset();
};

formNewCard.addEventListener('submit', handleFormAddNewCard);

// Работа с открытием и закрытием модульных окон
// Открытие модульного окна с картинкой
export function openModalImage(evt) {
    evt.preventDefault();
    modalImageImg.src = evt.target.src;
    modalImageCaption.textContent = evt.target.alt;
    modalImageImg.alt = evt.target.alt;
    modalImage.style.backgroundColor =  'rgba(0, 0, 0, .9)';

    openModal(modalImage);    
}

// Чтобы модальные окна плавно открывались
modals.forEach((modal) => {
    modal.classList.add('popup_is-animated')
})

// Открытие модальных окон по кнопкам
buttonEditProfile.addEventListener('click', () => {
    openModal(modalEditProfile);
});

buttonAddNewCard.addEventListener('click', () => {
    openModal(modalAddNewCard);
});

// Закрытие модальных окон
// По крестику
buttonCloseEditProfile.addEventListener('click', () => {
    closeModal(modalEditProfile);
});

buttonCloseAddNewCard.addEventListener('click', () => {
    closeModal(modalAddNewCard);
});

buttonCloseImage.addEventListener('click', () => {
    closeModal(modalImage);
});

// По кнопке Сохранить
buttonSaveEditProfile.addEventListener('click', () => {
    closeModal(modalEditProfile);
});

buttonSaveAddNewCard.addEventListener('click', () => {
    closeModal(modalAddNewCard);
});

// По оверлею
modals.forEach((modal) => {
   modal.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closeModal(modal);
        }
    })
})

// По кнопке Escape
export function handleEsc(evt) {
    if (evt.key === 'Escape') {
        modals.forEach((modal) => closeModal(modal));
    }
};

// Валидация
  
enableValidation(validationConfiguration);

// API
// Изменение данных пользователя (меня)

changeProfileData(apiConfiguration);

// Добавление карточек на страницу


getInitialCards(apiConfiguration);

export const token = 'a3a5f573-877f-4323-8cbf-b12cc816b747'

//Добавление новой карточки
function addCard(cardName, cardLink) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
}


// Количество лайков
// export function getLikes(container) {
//     return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
//         headers: {
//             authorization: 'a3a5f573-877f-4323-8cbf-b12cc816b747'
//         }
//         })
//         .then(res => res.json())
//         .then(cards => {
//             cards.forEach(card => {
//                 //console.log(card, card.likes.length);
//                 container.textContent = card.likes.length;
//             })
//         })
// };

//getLikes();


import { imgId } from './api.js';
//imgId()
import { myId } from './constants.js';
