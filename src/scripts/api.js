import { placesList } from "./constants";
import { createCard, handleLikes, showDeleteButton } from "./cards";

// Функция обработки ответа от сервера
function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
} 


// Отображение текущих карточек
export function getInitialData(apiConfig) {
    const targetUrlUsers = apiConfig.baseUrl + apiConfig.uriUsers;
    const usersList = fetch(targetUrlUsers, {
        headers: apiConfig.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            } console.error('Ошибка при получении списка пользователей с сервера:', error);
        })

    const targetUrlCards = apiConfig.baseUrl + apiConfig.uriCards;
    const cardsList = fetch(targetUrlCards, {
        headers: apiConfig.headers
    })
        .then(res => {
            if (res.ok) {
            return res.json();
            } console.error('Ошибка при получении списка карточек с сервера:', error);
        })   

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
export function addCardToServer(link, name, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards
    return fetch(targetUrl, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            link: link }),
    })
    .then(
        getResponseData
    )
}

// Удаление своей карточки с сервера
export function deleteCardFromServer(card, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + '/' + card.id;
    return fetch(targetUrl, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(res => {
            getResponseData(res)
        })
}

// Добавление, удаление лайков
export function toggleLikeCard(evt, apiConfig) {
    const buttonLike = evt.target.closest('.card__like-button');
    const cardToLike = buttonLike.closest('.places__item');
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + apiConfig.uriLikes + '/' + cardToLike.id;

    if (!buttonLike.classList.contains('card__like-button_is-active')) {
        return fetch(targetUrl, {
            method: 'PUT',
            headers: apiConfig.headers
        })
            .then(res => {
                getResponseData(res);
            })
    } else {
        return fetch(targetUrl, {
            method: 'DELETE',
            headers: apiConfig.headers
        })
            .then(res => {
                getResponseData(res);
            })
    }
}

// Добавление лайка на сервере
export function addLikeToServer(card, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + apiConfig.uriLikes + '/' + card.id;
    return fetch(targetUrl, {
        method: 'PUT',
        headers: apiConfig.headers
    })
        .then(res => {
            getResponseData(res);
        })
}

// Удаление лайка с сервера
export function deleteLikeFromServer(card, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + apiConfig.uriLikes + '/' + card.id;
    return fetch(targetUrl, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(res => {
            getResponseData(res);
        })
}

// Получение информации о количестве лайков
export function getLikes(card, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + apiConfig.uriLikes + '/' + card.id;
    return fetch(targetUrl, {
        method: 'GET',
        headers: apiConfig.headers
    })
        .then(res => {
            getResponseData(res);
        })
}

// Отображение данных профиля
export function handleProfileData(apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriUsers + apiConfig.uriMe;
    return fetch(targetUrl, {
        method: 'GET',
        headers: apiConfig.headers
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        } console.error('Ошибка при получении данных профиля с сервера:', error);
    })
        .catch(error => {
            console.error('Ошибка при отображении данных профиля:', error);
        });
}

// Изменение данных профиля
export function changeProfileData(profileName, profileDescription, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriUsers + apiConfig.uriMe;
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileDescription
        })
    })
        .then(res => {
            if (res.ok) {
            return res.json();
            } console.error('Ошибка при изменении данных профиля на сервере:', error);
        })
        .catch(error => {
            console.error('Ошибка при изменении данных профиля на сервере:', error);
        });
}

// Изменение аватара
export function changeProfileAvatar(profileAvatar, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriUsers + apiConfig.uriMe + apiConfig.uriAvatar;
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({ 
            avatar: profileAvatar
        })
    })
        .then(res => {
            if (res.ok) {
            return res.json();
            } console.error('Ошибка при изменении аватара на сервере:', error);
        })
        .catch(error => {
            console.error('Ошибка при изменении аватара на сервере:', error);
        });
}

