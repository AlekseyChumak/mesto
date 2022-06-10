const button1 = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

button1.addEventListener('click', function() {
    popup.classList.remove('popup_hiden');
})

popupCloseButton.addEventListener('click', function() {
    popup.classList.add('popup_hiden');
})

popup.addEventListener('click', function (e){
    if (e.target === e.currentTarget) {
        popup.classList.add('popup_hiden');
    }
})




let formElement = document.querySelector('.popup__container');
let nameInput =  document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__text');


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let profileName = document.querySelector('.profile__title');
    let profilejob = document.querySelector('.profile__subtitle');

    profileName.textContent = popup__name.value;
    profilejob.textContent = popup__text.value;

    toggle.popup();

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
let submit = document.querySelector('popup__submit-button')
formElement.addEventListener('submit', formSubmitHandler); 