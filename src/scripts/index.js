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
         likeCard, 
         deleteCard } from './cards.js';
import { openModal, 
         closeModal } from './modals.js';
import { enableValidation, 
         clearValidation } from './validation.js';
import { changeProfileData,
         addCardToServer, 
         getInitialData, 
         changeProfileAvatar } from './api.js';

// Добавление данных при загрузке страницы
getInitialData(apiConfiguration)
    .then((results) => {
        const [ users, cards ] = results;

        const myProfile = users.find(user => user._id === apiConfiguration.myId);
        profileTitle.textContent = myProfile.name;
        profileDescription.textContent = myProfile.about;
        profileAvatar.style.backgroundImage = `url('${myProfile.avatar}')`;

        cards.forEach((card) => {
            const newCard = createCard(card.link, card.name, card.name, deleteCard, likeCard, openModalImage, card, apiConfiguration);
            placesList.append(newCard);
    })
})

// Добавление новой карточки пользователем
function handleFormAddNewCard(evt, link, name, alt, deleteFn, likeFn, openFn, apiConfig) {
    evt.preventDefault();
    buttonSaveNewCard.textContent = 'Сохранение...';
    addCardToServer(link, name, apiConfig)
        .then(data => {
            const newCard = createCard(link, name, alt, deleteFn, likeFn, openFn, data, apiConfig);
            placesList.prepend(newCard);
        })
        .catch(error => {
            console.error('Ошибка при создании карточки:', error);
        });
    buttonSaveNewCard.textContent = 'Сохранить';
};

formNewCard.addEventListener('submit', (evt) => {
    handleFormAddNewCard(evt, urlInput.value, placeNameInput.value, placeNameInput.value, deleteCard, likeCard, openModalImage, apiConfiguration)
});



// Редактирование профиля
function handleFormEditProfile(evt) {        
    evt.preventDefault();
    buttonSaveProfile.textContent = 'Сохранение...'
    changeProfileData(nameInput.value, jobInput.value, apiConfiguration)
        .catch(error => {
            console.error('Ошибка при изменении данных профиля на сервере:', error);
        });
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    buttonSaveProfile.textContent = 'Сохранить'
}

formEditProfile.addEventListener('submit', handleFormEditProfile);

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