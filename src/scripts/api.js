import { avatarInput, placesList } from "./constants";
import { createCard, getLikes, showDeleteButton } from "./cards";

// Отображение текущих карточек
export function getInitialCards(apiConfig) {
    const targetUrlUsers = apiConfig.baseUrl + apiConfig.uriUsers;
    const usersList = fetch(targetUrlUsers, {
        headers: {
            authorization: apiConfig.token
        }
        })
    .then(res => res.json());

    const targetUrlCards = apiConfig.baseUrl + apiConfig.uriCards;
    const cardsList = fetch(targetUrlCards, {
        headers: {
            authorization: apiConfig.token
        }
    })
    .then(res => res.json())

    const promises = [ usersList, cardsList ];

    return Promise.all(promises)
        .then((results) => {
                return results;
        })
        .catch(error => {
            console.error('Ошибка при добавлении карточек с сервера:', error);
        });
}

// Добавление новой карточки на сервер
export function addCard(cardName, cardLink, deleteFn, handleLikeFn, openFn, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards
    fetch(targetUrl, {
        method: 'POST',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink }),
    })
    .then(res => res.json())
    .then(data => {
        const cardElement = createCard(cardLink, cardName, cardName, deleteFn, handleLikeFn, openFn);
        cardElement.id = data._id;
        cardElement.dataset.likes = data.likes.length;
        cardElement.dataset.ownerId = data.owner._id;
        showDeleteButton(cardElement, apiConfig);
        getLikes(cardElement, data)
        placesList.prepend(cardElement);
    })
    .catch(error => {
        console.error('Ошибка при создании карточки:', error);
    });
}

// Удаление карточки
export function deleteCardFromServer(evt, apiConfig) {
    const cardToDelete = evt.target.closest('.places__item');
    if (cardToDelete.dataset.ownerId === apiConfig.myId) {
        cardToDelete.remove();
        const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + '/' + cardToDelete.id;
        return fetch(targetUrl, {
            method: 'DELETE',
            headers: {
                authorization: apiConfig.token,
                'Content-Type': 'application/json'
            }
        })
    }
}

// Добавление, удаление лайков
export function handleLike(evt, apiConfig) {
    const buttonLike = evt.target.closest('.card__like-button');
    const cardToLike = buttonLike.closest('.places__item');
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + apiConfig.uriLikes + '/' + cardToLike.id;

    if (!buttonLike.classList.contains('card__like-button_is-active')) {
        return fetch(targetUrl, {
            method: 'PUT',
            headers: {
                authorization: apiConfig.token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                getLikes(cardToLike, data, apiConfig)
            })
    } else {
        return fetch(targetUrl, {
            method: 'DELETE',
            headers: {
                authorization: apiConfig.token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                getLikes(cardToLike, data, apiConfig)  
            })
    }
}

// Изменение аватара
export function changeAvatarOnServer(profileAvatar, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriUsers + apiConfig.uriMe + apiConfig.uriAvatar;
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            avatar: profileAvatar
        })
    })
        .then(res => res.json())
        .catch(error => {
            console.error('Ошибка при изменении аватара:', error);
        });
}

// Изменение данных профиля
export function changeProfileData(profileName, profileDescription, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriUsers + apiConfig.uriMe;
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: profileName,
            about: profileDescription
        })
    })
        .then(res => res.json())
        .catch(error => {
            console.error('Ошибка при изменении данных пользователя:', error);
        });
}

// Отображение данных профиля
export function handleProfileData(apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriUsers + apiConfig.uriMe;
    return fetch(targetUrl, {
        method: 'GET',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
}