import { renderCard, openModalImage } from './index.js';
import { createCard, deleteCard, likeCard } from './cards.js';
import { placesList } from './constants.js';

export function changeProfileData(config) {
    const targetUrl = config.baseUrl + config.uriUsers + config.uriMe;
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: {
            authorization: config.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Svetlana P',
            about: 'Student'
        })
    })
}

export function getInitialCards(config) {
    const targetUrlUsers = config.baseUrl + config.uriUsers;
    const getUsers = fetch(targetUrlUsers, {
        headers: {
            authorization: config.token
        }
        })
    .then(res => res.json())

    const targetUrlCards = config.baseUrl + config.uriCards;
    const getCards = fetch(targetUrlCards, {
        headers: {
            authorization: config.token
        }
    })
    .then(res => res.json())

    const promises = [ getUsers, getCards ];

    Promise.all(promises)
        .then((results) => {
            const cards = results[1];
            cards.forEach((card) => {
                renderCard(createCard(card.link, card.name, card.name, deleteCard, likeCard, openModalImage), placesList);
            });
            const users = results[0];
            console.log(users)
        })
}