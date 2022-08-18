  // Validation
const validationConfig = {
  formSelector: '.popup__info',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_error_active',
  errorBorder: 'popup__input_error-border'
};
 




  // Передадим текст ошибки
  const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.errorBorder);
    formError.textContent = errorMessage;
    formError.classList.add(settings.inputErrorClass);
  };

  // очистим ошибку
  const hideInputError = (formElement, inputElement, settings) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.errorBorder);
    formError.classList.remove(settings.inputErrorClass);
    formError.textContent = '';
  };

  // Проверка на наличие невалидного поля
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    })
  };
  
  // Функция переключения состояния кнопки
  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', 'disabled');
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
    //return hasInvalidInput(inputList);
  };

  // функция ВАЛИДНА?
  const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };

  // Добавление обработчика всем полям формы
  const setEventListeners = (formElement, settings) => {
    // находим все поля внутри формы
    // сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }; 

    // функция поиска и обработки всех форм с классом popup__info
    const enableValidation = (settings) => {
      const formList = Array.from(document.querySelectorAll(settings.formSelector));
      formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
        });
      setEventListeners(formElement, settings);
      });
    };

    enableValidation(validationConfig);

