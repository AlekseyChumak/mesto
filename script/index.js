const buttonEdit = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__info');
const nameInput =  document.querySelector('.popup__input_position_top');
const jobInput = document.querySelector('.popup__input_position_buttom');

const profileName = document.querySelector('.profile__title');
const profilejob = document.querySelector('.profile__subtitle');


// like
const card = document.querySelector('.card')

const likeButton = card.querySelector('.elements__like');
       likeButton.addEventListener('click', function () {
               likeButton.classList.toggle('elements__like_active');
           });


// Функция закрытия попапа по кнопке Q
function closePopupOnQ (e) {
    if (e.code === 'KeyQ') {
        closePopup()
    }
}

// Функция открытия попапа
function openPopup() {
    popup.classList.remove('popup_hiden');
    document.addEventListener('keypress', closePopupOnQ);
    nameInput.value = profileName.textContent;
    jobInput.value = profilejob.textContent;
}

// Функция закрытия попапа
function closePopup() {
    popup.classList.add('popup_hiden');
    document.removeEventListener('keypress', closePopupOnQ);
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profilejob.textContent = jobInput.value;
    closePopup();
}


popup.addEventListener('click', function (e){
    if (e.target === e.currentTarget) {
        closePopup();
    }
})

// Слушатель клика на открытие
buttonEdit.addEventListener('click', openPopup);

// Слушатель клика на закрытие
popupCloseButton.addEventListener('click', closePopup);


// Отправка изменений в профиль
formElement.addEventListener('submit', formSubmitHandler); 