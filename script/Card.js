import { initialCards } from './initialCards.js';
import { openPopup, popupOpenImg } from './index.js';

export class Card {
    constructor(name, link, templete){
      this._name = name;
      this._link = link;
      this._templete = templete;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector('#item__template')
        .content
        .querySelector('.elements__card')
        .cloneNode(true);

        return cardElement;
    };

    generateCard() {
       
        this._element = this._getTemplate();
        this._element.querySelector('.elements__text').textContent = this._name;
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = this._name;
        this._setEventListeners();
        return this._element
    };

    _buttonLike() {
        this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
    }

    _buttonDelete() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        //Слушатель кнопки лайк
        this._element.querySelector('.elements__like').addEventListener('click', () => {
            this._buttonLike()
        });
        
        // Слушатель кнопки удаления карточки
        this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
            this._buttonDelete()
        });

        // Слушатель клика на открытие изображения
        this._element.querySelector('.elements__image').addEventListener('click', () => {
            openPopup(popupOpenImg);
            document.querySelector('.popup__img').src = this._link;
            document.querySelector('.popup__img').alt = this._name;
            document.querySelector('.popup__img-title').textContent =  this._name;
        });
    }


};

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '.elements__card');
    const cardElement = card.generateCard();
 
   // Добавляем в DOM
   document.querySelector('.elements__cards').append(cardElement);
 });