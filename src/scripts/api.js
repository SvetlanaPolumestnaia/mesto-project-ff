import { placesList } from "./constants";
import { createCard, showDeleteButton } from "./cards";

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

    return Promise.all(promises)
        .then((results) => {
                return results;
        })
}

export function getCardData(apiConfig) {
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
}

// Удаление карточки
// export function deleteCardFromServer(cardId, apiConfig) {
//     const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + '/' + cardId;
//     return fetch(targetUrl, {
//         method: 'DELETE',
//         headers: {
//             authorization: apiConfig.token,
//             'Content-Type': 'application/json'
//         }
//         })
// }


// Добавление новой карточки на сервер
export function addCard(cardName, cardLink, deleteFn,likeFn, openFn, apiConfig) {
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
        const cardElement = createCard(cardLink, cardName, cardName, deleteFn, likeFn, openFn);
        cardElement.id = data._id;
        cardElement.dataset.likes = data.likes.length;
        cardElement.dataset.ownerId = data.owner._id;
        showDeleteButton(cardElement, apiConfig);
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