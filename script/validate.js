  // Validation
const validationConfig = {
  formSelector: '.popup__info',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_error_active',
  errorBorder: 'popup__input_error-border'
}
 
  // функция поиска и обработки всех форм с классом popup__info
  const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    setEventListeners(formElement);
    });
  };

  // Передадим текст ошибки
  const showInputError = (formElement, inputElement, errorMessage) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.errorBorder);
    formError.textContent = errorMessage;
    formError.classList.add(validationConfig.inputErrorClass);
  };

  // очистим ошибку
  const hideInputError = (formElement, inputElement) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.errorBorder);
    formError.classList.remove(validationConfig.inputErrorClass);
    formError.textContent = '';
  };

  // Проверка на наличие невалидного поля
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    })
  };
  
  // Функция переключения состояния кнопки
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', 'disabled');
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };

  // функция ВАЛИДНА?
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  // Добавление обработчика всем полям формы
  const setEventListeners = (formElement) => {
    // находим все поля внутри формы
    // сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 



  enableValidation(validationConfig);

