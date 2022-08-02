// Popups
const formElement = document.querySelector(".popup__info_edit");
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
const popupCloseButton = document.querySelector(".popup__close-button");
const buttonAdd = document.querySelector(".profile__button-add");
const closeButtonAdd = document.querySelector(".popup__close-button_add");
const imgCloseButton = document.querySelector(".popup__close-button_img");

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

// Автоматическое заполнение формы профиля 
nameInput.value = profileName.textContent;
jobInput.value = profilejob.textContent;

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Обработчик «отправки» формы
function sendformSubmit(evt) {
  evt.preventDefault();
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
  evt.preventDefault();
  const name = nameAdd.value;
  const link = urlAdd.value;
  const cardElement = createCard(name, link);
  renderCard(cardElement);
  closePopup(popupCardAdd);
  nameAdd.value = "";
  urlAdd.value = "";
}

// Слушатель клика на открытие редактирование профиля
buttonEdit.addEventListener("click", () => openPopup(popupProfile));

// Слушатель клика на открытие добавление карточки
buttonAdd.addEventListener("click", () => openPopup(popupCardAdd));

// Слушатель клика на закрытие
popupCloseButton.addEventListener("click", () => {
  closePopup(popupProfile);
});

closeButtonAdd.addEventListener("click", () => {
  closePopup(popupCardAdd);
});

imgCloseButton.addEventListener("click", () => {
  closePopup(popupOpenImg);
});

// Отправка изменений в профиль
formElement.addEventListener("submit", sendformSubmit);

popupCardAdd.addEventListener("submit", addCardSubmitHandler);
