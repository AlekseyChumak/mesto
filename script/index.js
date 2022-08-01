const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];



// Popups
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__info');
const popupProfile = document.querySelector('.popup_type_edit');
const popupCardAdd = document.querySelector('.popup_type_new-card');
const popupOpenImg = document.querySelector('.popup_type_open-img');
const popupFigure = document.querySelector('.popup__figure');
const popupImg = document.querySelector('.popup__img');
const popupImgTitle = document.querySelector('.popup__img-title');

// Поля ввода профиля
const nameInput =  document.querySelector('.popup__input_position_top');
const jobInput = document.querySelector('.popup__input_position_buttom');
const profileName = document.querySelector('.profile__title');
const profilejob = document.querySelector('.profile__subtitle');
const addName = document.querySelector('.popup__input_add_title');
const addUrl = document.querySelector('.popup__input_add_url')


// Кнопки
const buttonEdit = document.querySelector('.profile__button-edit');
const popupCloseButton = document.querySelector('.popup__close-button');
const buttonAdd = document.querySelector('.profile__button-add');
const AddCloseButton = document.querySelector('.popup__close-button-add');
const imgCloseButton = document.querySelector('.popup__close-button_img');

// Tamplate
const elementsTemplateCards = document.querySelector('.elements__cards');
const elements = document.querySelector('.elements');
const template = document.querySelector('#item__template').content;
const cardTemplate = template.querySelector('.elements__card');





// Функция закрытия попапа по кнопке ESC
function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
};

// Слушатель на закрытие по клику вне попапа
popup.addEventListener('click', function (e){
  if (e.target === e.currentTarget) {
      closePopup(popup);
  } 
});


// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
    nameInput.value = profileName.textContent;
    jobInput.value = profilejob.textContent;
};

// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
};


// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profilejob.textContent = jobInput.value;
    closePopup(popupProfile);
};

//обработчик добавления карточек на страницу
const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector('.elements__image');
  const cardName = cardElement.querySelector('.elements__text');
  const likeButton = cardElement.querySelector('.elements__like');
  const deleteButton = cardElement.querySelector('.elements__delete-button');
  
  cardImg.src = link;
  cardImg.alt = name;
  cardName.textContent = name;
  // Слушатель клика на открытие изображения
  cardImg.addEventListener('click', () => {
    popupImg.src = cardImg.src;
    popupImg.alt = name;
    popupImgTitle.textContent = cardName.textContent;
    openPopup(popupOpenImg);
  });
//Слушатель кнопки лайк
  likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('elements__like_active')
  });
// Слушатель кнопки удаления карточки
  deleteButton.addEventListener('click', function(EventTarget){
    cardElement.remove(EventTarget);
  });

  return cardElement;
};



function renderCard(cardElement) {
  elementsTemplateCards.prepend(cardElement);
};

initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link);
  renderCard(cardElement);
});




//Функция добавления новой карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const name = addName.value;
  const link = addUrl.value;
  const cardElement = createCard(name, link);
  renderCard(cardElement);
  closePopup(popupCardAdd);
  addName.value = '';
  addUrl.value = '';
};


// Слушатель клика на открытие редактирование профиля
buttonEdit.addEventListener('click', () =>  openPopup(popupProfile));

// Слушатель клика на открытие добавление карточки
buttonAdd.addEventListener('click', () =>  openPopup(popupCardAdd));

// Слушатель клика на закрытие
 popupCloseButton.addEventListener('click', () => {
    closePopup(popupProfile);
  });

 AddCloseButton.addEventListener('click', () => {
    closePopup(popupCardAdd);
  });

imgCloseButton.addEventListener('click', () => {
  closePopup(popupOpenImg);
});


// Отправка изменений в профиль
formElement.addEventListener('submit', formSubmitHandler); 


popupCardAdd.addEventListener('submit', addCardSubmitHandler);
