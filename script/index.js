// Popups
const formProfile = document.querySelector(".popup__info_edit_profile");
const formNewCard = document.querySelector(".popup__info_add_card");
const popupProfile = document.querySelector(".popup_type_edit");
const popupCardAdd = document.querySelector(".popup_type_new-card");
const popupOpenImg = document.querySelector(".popup_type_open-img");
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
// Tamplate
const elementsTemplateCard = document.querySelector(".elements__cards");
const element = document.querySelector(".elements");
const template = document.querySelector("#item__template").content;
const cardTemplate = template.querySelector(".elements__card");

// Функция закрытия попапа по кнопке ESC
function closeEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}

// Функция закрытия попапа по клику Overlay
function closeClickOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
  document.addEventListener("click", closeClickOverlay);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
  document.removeEventListener("click", closeClickOverlay);
}

// Обработчик «отправки» формы
function sendFormProfile(evt) {
  evt.preventDefault(); // отменям стандартное поведение браузера
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  closePopup(popupProfile);
}

//обработчик добавления карточек на страницу
const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".elements__image");
  const cardName = cardElement.querySelector(".elements__text");
  const buttonLike = cardElement.querySelector(".elements__like");
  const buttonDelete = cardElement.querySelector(".elements__delete-button");

  cardImg.src = link;
  cardImg.alt = name;
  cardName.textContent = name;
  // Слушатель клика на открытие изображения
  cardImg.addEventListener("click", () => {
    popupImg.src = cardImg.src;
    popupImg.alt = name;
    popupImgTitle.textContent = cardName.textContent;
    openPopup(popupOpenImg);
  });

  //Слушатель кнопки лайк
  buttonLike.addEventListener("click", function () {
    buttonLike.classList.toggle("elements__like_active");
  });

  // Слушатель кнопки удаления карточки
  buttonDelete.addEventListener("click", function (EventTarget) {
    cardElement.remove(EventTarget);
  });

  return cardElement;
};

function renderCard(cardElement) {
  elementsTemplateCard.prepend(cardElement);
}

initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link);
  renderCard(cardElement);
});

//Функция добавления новой карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault(); // отменям стандартное поведение браузера
  const name = nameAdd.value;
  const link = urlAdd.value;
  const cardElement = createCard(name, link);
  renderCard(cardElement);
  closePopup(popupCardAdd);
  evt.target.reset();
}

// Слушатель клика на открытие редактирование профиля
buttonEdit.addEventListener("click", () => {
  formProfile.reset();
  clearInputsError(formProfile, validationConfig);
  // Автоматическое заполнение формы профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profilejob.textContent;
  openPopup(popupProfile);
});

// Слушатель клика на открытие добавление карточки
buttonAdd.addEventListener("click", () => {
  formNewCard.reset();
  clearInputsError(formNewCard, validationConfig);
  disebledSubmitButton(buttonFormNewCard, validationConfig);
  openPopup(popupCardAdd);
});

// Слушатель клика на закрытие
buttonCloseEdit.addEventListener("click", () => {
  closePopup(popupProfile);
});

buttonCloseAdd.addEventListener("click", () => {
  closePopup(popupCardAdd);
});

buttonCloseImg.addEventListener("click", () => {
  closePopup(popupOpenImg);
});

// Отправка изменений в профиль
formProfile.addEventListener("submit", sendFormProfile);

formNewCard.addEventListener("submit", addCardSubmitHandler);
