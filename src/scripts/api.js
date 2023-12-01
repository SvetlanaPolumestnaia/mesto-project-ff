import { deleteCard } from "./cards";

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

// Удаление карточки

export function deleteCardFromServer(card, deleteFn1, deleteFn2, apiConfig) {
    const deleteElement = card.querySelector('.card__delete-button');
    if (card.dataset.ownerId === apiConfig.myId) {
        deleteElement.classList.add('card__delete-button_visible');
        deleteElement.addEventListener(('click'), deleteFn1);
        deleteElement.addEventListener(('click'), () => {
            deleteFn2()
        });
    }
  }

export function deleteMyCard(cardId, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + '/' + cardId;
    console.log(targetUrl);
    // return fetch(targetUrl, {
    //     method: 'DELETE',
    //     headers: {
    //         authorization: apiConfig.token,
    //         'Content-Type': 'application/json'
    //     }
    //     })
    //     .then((res) => res.json())
    //     .then((evt) => {
    //         deleteCard(evt)
    //     })
}

//   const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + '/' + cardId
//             return fetch(targetUrl, {
//                 method: 'DELETE',
//                 headers: {
//                     authorization: apiConfig.token,
//                     'Content-Type': 'application/json'
//                 }
//                 })
//                 .then((res) => res.json())
//                 .then((evt) => {
//                     deleteCard(evt)
//                 })