import '../pages/index.css';
import { modals, 
         modalEditProfile, 
         modalAddNewCard,
         modalEditAvatar,
         modalImage,
         modalImageImg,
         modalImageCaption,
         buttonCloseImage,
         buttonEditProfile,
         buttonSaveProfile,
         buttonCloseProfile,
         buttonAddNewCard,
         buttonSaveNewCard,
         buttonCloseNewCard,
         buttonEditAvatar,
         buttonSaveAvatar,
         buttonCloseAvatar,
         placesList, 
         formEditProfile, 
         nameInput, 
         jobInput, 
         profileAvatar, 
         profileTitle, 
         profileDescription, 
         formNewCard, 
         placeNameInput, 
         urlInput, 
         formEditAvatar, 
         avatarInput,
         validationConfiguration,
         apiConfiguration } from './constants.js';
import { createCard, 
         handleLikes, 
         showDeleteButton,
         deleteCard } from './cards.js';
import { openModal, 
         closeModal } from './modals.js';
import { enableValidation, 
         clearValidation } from './validation.js';
import { changeProfileData,
         addCardToServer, 
         getInitialCards, 
         deleteCardFromServer,
         toggleLikeCard,
         changeProfileAvatar,
         handleProfileData } from './api.js';

// Функция добавления новой карточки на страницу
function renderCard(cardData, container) {
    container.append(cardData);
  };

// Добавление существующих на сервере карточек
getInitialCards(apiConfiguration)
    .then((results) => {
        const cards = results[1];
        cards.forEach((data) => {
            const newCard = createCard(data.link, data.name, data.name, deleteCard, toggleLikeCard, openModalImage);
            renderCard(newCard, placesList);
        
            newCard.id = data._id;
            newCard.dataset.likes = data.likes.length;
            newCard.dataset.ownerId = data.owner._id;
        
            handleLikes(newCard, data, apiConfiguration);

            showDeleteButton(newCard, apiConfiguration);
    });
})

// Отображение данных профиля
handleProfileData(apiConfiguration)
    .then(data => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
    })
    .catch(error => {
        console.error('Ошибка при добавлении данных профиля с сервера:', error)
    })

// Редактирование профиля
function handleFormEditProfile(evt) {        
    evt.preventDefault();
    buttonSaveProfile.textContent = 'Сохранение...'
    if (nameInput.validity.valid && jobInput.validity.valid) {
        changeProfileData(nameInput.value, jobInput.value, apiConfiguration)
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
    }
    buttonSaveProfile.textContent = 'Сохранить'
}

formEditProfile.addEventListener('submit', handleFormEditProfile);

// Добавление новой карточки пользователем
function handleFormAddNewCard(evt) {
    evt.preventDefault();
    buttonSaveNewCard.textContent = 'Сохранение...';
    if (placeNameInput.validity.valid && urlInput.validity.valid) {
        addCardToServer(placeNameInput.value, urlInput.value, deleteCard, toggleLikeCard, openModalImage, apiConfiguration)
    }
    buttonSaveNewCard.textContent = 'Сохранить';
};

formNewCard.addEventListener('submit', handleFormAddNewCard);

// Изменение аватара
function handleFromEditAvatar(evt) {
    evt.preventDefault();
    buttonSaveAvatar.textContent = 'Сохранение...';
    if (avatarInput.validity.valid) {
        changeProfileAvatar(avatarInput.value, apiConfiguration)
            .then(data => {
                profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
            })
            .catch(error => {
                console.error('Ошибка при изменении аватара:', error);
            })
            .finally(() => {
                buttonSaveAvatar.textContent = 'Сохранить';
            })
    }
}

formEditAvatar.addEventListener('submit', handleFromEditAvatar)

// Работа с открытием и закрытием модульных окон
// Открытие модульного окна с картинкой
export function openModalImage(evt) {
    evt.preventDefault();
    modalImageImg.src = evt.target.src;
    modalImageCaption.textContent = evt.target.alt;
    modalImageImg.alt = evt.target.alt;
    // По фигме при открытии картинки фон затемнения отличается от стандратного
    modalImage.style.backgroundColor =  'rgba(0, 0, 0, .9)';

    openModal(modalImage);    
}

// Чтобы модальные окна плавно открывались
modals.forEach((modal) => {
    modal.classList.add('popup_is-animated');
})

// Открытие модальных окон по кнопкам
buttonEditProfile.addEventListener('click', () => {
    openModal(modalEditProfile);
    clearValidation(modalEditProfile, validationConfiguration);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

buttonAddNewCard.addEventListener('click', () => {
    openModal(modalAddNewCard);
    clearValidation(modalAddNewCard, validationConfiguration);
    formNewCard.reset();
});

buttonEditAvatar.addEventListener('click', () => {
    openModal(modalEditAvatar);
    clearValidation(modalEditAvatar, validationConfiguration);
    formEditAvatar.reset();
})

// Закрытие модальных окон
// По крестику
buttonCloseProfile.addEventListener('click', () => {
    closeModal(modalEditProfile);
});

buttonCloseNewCard.addEventListener('click', () => {
    closeModal(modalAddNewCard);
});

buttonCloseAvatar.addEventListener('click', () => {
    closeModal(modalEditAvatar);
})

buttonCloseImage.addEventListener('click', () => {
    closeModal(modalImage);
});

// По кнопке Сохранить
buttonSaveProfile.addEventListener('click', () => {
    closeModal(modalEditProfile);
});

buttonSaveNewCard.addEventListener('click', () => {
    closeModal(modalAddNewCard);
});

buttonSaveAvatar.addEventListener('click', () => {
    closeModal(modalEditAvatar);
})

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