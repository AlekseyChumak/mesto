const buttonEdit = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__info');
const nameInput =  document.querySelector('.popup__info_input_name-js');
const jobInput = document.querySelector('.popup__info_input_text-js');

const profileName = document.querySelector('.profile__title');
const profilejob = document.querySelector('.profile__subtitle');


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
}

// Функция закрытия попапа
function closePopup() {
    popup.classList.add('popup_hiden');
    document.removeEventListener('keypress', closePopupOnQ);
}

// Слушатель клика на открытие
buttonEdit.addEventListener('click', function() {
    openPopup();
    nameInput.value = profileName.textContent;
    jobInput.value = profilejob.textContent;
})

// Слушатель клика на закрытие
popupCloseButton.addEventListener('click', function() {
    closePopup();
})

popup.addEventListener('click', function (e){
    if (e.target === e.currentTarget) {
        closePopup();
    }
})


// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profilejob.textContent = jobInput.value;
    closePopup();
}

// Отправка изменений в профиль
formElement.addEventListener('submit', formSubmitHandler); 