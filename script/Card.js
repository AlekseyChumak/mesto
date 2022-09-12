import { openPopup, popupOpenImg } from './index.js';

export class Card {
    constructor({name, link}, templateSelector){
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector('#item__template')
        .content
        .cloneNode(true);

        return cardElement;
    };

    generateCard() {       
        this._element = this._getTemplate();

        this._imageElement = this._element.querySelector('.elements__image');
        this._textElement = this._element.querySelector('.elements__text');
        this._likeElement = this._element.querySelector('.elements__like');
        this._deleteElement = this._element.querySelector('.elements__delete-button');
        this._cardTemplate = this._element.querySelector('.elements__card');

        this._textElement.textContent = this._name;
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._setEventListeners();
        return this._element
    };

    _likeButton() {
        this._likeElement.classList.toggle('elements__like_active');
    }

    _deleteButton() {
        this._cardTemplate.remove();
        this._cardTemplate = null;
    }

    _setEventListeners() {
        //Слушатель кнопки лайк
        this._likeElement.addEventListener('click', () => {
            this._likeButton()
        });
        
        // Слушатель кнопки удаления карточки
        this._deleteElement.addEventListener('click', () => {
            this._deleteButton()
        });

        // Слушатель клика на открытие изображения
        this._imageElement.addEventListener('click', () => {
            openPopup(popupOpenImg);
            document.querySelector('.popup__img').src = this._link;
            document.querySelector('.popup__img').alt = this._name;
            document.querySelector('.popup__img-title').textContent =  this._name;
        });
    }


};

