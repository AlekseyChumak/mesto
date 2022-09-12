//Импорт 
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from './initialCards.js';

export const validationConfig = {
  formSelector: ".popup__info",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_error_active",
  errorBorder: "popup__input_error-border",
  formAdd: ".popup__info_add_card",
};

export const templateSelector = {
  itemTemplate: ".item__template",
  elementsTemplateCard: ".elements__cards",
  element: ".elements",
  cardTemplate: ".elements__card"
}

// Popups
const formProfile = document.querySelector(".popup__info_edit_profile");
const formNewCard = document.querySelector(".popup__info_add_card");
const popupProfile = document.querySelector(".popup_type_edit");
const popupCardAdd = document.querySelector(".popup_type_new-card");
export const popupOpenImg = document.querySelector(".popup_type_open-img");
const popupFigure = document.querySelector(".popup__figure");
const popupImg = document.querySelector(".popup__img");
const popupImgTitle = document.querySelector(".popup__img-title");

// Поля ввода профиля
const nameInput = document.querySelector(".popup__input_position_top");
const jobInput = document.querySelector(".popup__input_position_buttom");
const profileName = document.querySelector(".profile__title");
const profilejob = document.querySelector(".profile__subtitle");
const nameAdd = document.querySelector(".popup__input_add_title");
const urlAdd = document.querySelector(".popup__input_add_url");

// Кнопки
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonCloseEdit = document.querySelector(".popup__button_close_edit");
const buttonAdd = document.querySelector(".profile__button-add");
const buttonCloseAdd = document.querySelector(".popup__button_close_new-card");
const buttonCloseImg = document.querySelector(".popup__button_close_img");
const buttonFormNewCard = formNewCard.querySelector(".popup__submit-button");

// Добавления класса FormValidator
const nameProfileValid = new FormValidator(validationConfig, formProfile);
nameProfileValid.enableValidation();

const cardProfileValid = new FormValidator(validationConfig, formNewCard);
cardProfileValid.enableValidation();

const cardList = document.querySelector(templateSelector.elementsTemplateCard);


// Функция закрытия попапа по кнопке ESC
function closeEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}


// Функция закрытия попапа по клику Overlay и клику на крест
function closeClickOverlay(popup) {
  popup.addEventListener('mousedown', function(evt) {
    if(evt.target.classList.contains("popup") || evt.target.classList.contains("popup__button")) {
      closePopup(popup);
    } 
  })
}


// поиск всех попапов для закрытия по клику Overlay и клику на крест
document.querySelectorAll('.popup').forEach( popup => {
  closeClickOverlay(popup);
});

// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
}

// Обработчик «отправки» формы
function sendFormProfile(evt) {
  evt.preventDefault(); // отменям стандартное поведение браузера
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  closePopup(popupProfile);
}


function createCard(name, link) {
  const card = new Card({name, link}, templateSelector.cardTemplate);
  return card.generateCard();
}

//Функция добавления новой карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const name = nameAdd.value;
  const link = urlAdd.value;
  createCard(name, link);
  const card = createCard(name, link);
  cardList.prepend(card); 
  closePopup(popupCardAdd);
  evt.target.reset();
};


//Обработка начального массива карточек
initialCards.forEach((item) => { 
 const card = createCard(item.name, item.link); 
 // Добавляем в DOM 
 cardList.append(card); 
}); 



// Слушатель клика на открытие редактирование профиля
buttonEdit.addEventListener("click", () => {
  // Автоматическое заполнение формы профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profilejob.textContent;
  openPopup(popupProfile);
  nameProfileValid.enableValidation();
});

// Слушатель клика на открытие добавление карточки
buttonAdd.addEventListener("click", () => {
  formNewCard.reset();
  openPopup(popupCardAdd);
  cardProfileValid.enableValidation();
});


// Отправка изменений в профиль (слушатель)
formProfile.addEventListener("submit", sendFormProfile);

//Добавление новой карточки (слушатель)
formNewCard.addEventListener("submit", addCardSubmitHandler);
