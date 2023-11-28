import { renderCard, openModalImage, cardIds } from './index.js';
import { createCard, deleteCard, likeCard } from './cards.js';
import { placesList, apiConfiguration } from './constants.js';

// Изменение данных профиля
export function changeProfileData(apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriUsers + apiConfig.uriMe;
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Svetlana P',
            about: 'Student'
        })
    })
}

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

    Promise.all(promises)
        .then((results) => {
            const cards = results[1];
            cards.forEach((card) => {
                renderCard(createCard(card.link, card.name, card.name, deleteCard, likeCard, openModalImage), placesList);
                
                //console.log(card, card.likes.length);
            });

            const users = results[0];
            users.forEach((user) => {
                //console.log(user._id);
                return user._id;
            })

        })
}

// Добавление карточки
export function addCard(cardName, cardLink, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards
    return fetch(targetUrl, {
        method: 'POST',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
}

// Отображение количества лайков
export function getLikeQuantity(apiConfig, button) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards;
    return fetch(targetUrl, {
        headers: {
            authorization: apiConfig.token
        }
    })
        .then( res => res.json())
        .then( cards => {


        })
}

export function getCardIds(apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards;
    return fetch(targetUrl, {
        headers: {
            authorization: apiConfig.token
        }
    })
        .then( res => res.json())
        .then( cards => {
            return cards._id
        })
}