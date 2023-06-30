import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


export default function AddPlacePopup({isOpen, onClose, onAddPlace, loadingButtonDelete}) {

  const { values, errors, isValid, isInputValid, handleChange, reset, } = useFormValidation()

  function resetClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({name: values.name, link: values.link}, reset)
  }

  return (
    <PopupWithForm
      name='popupCard'
      title='Новое место'
      titleButton='Создать'
      isOpen={isAddPlacePopupOpen}
      onClose={resetClose}
      isValid={isValid}
    >
      <input
        className={`popup__input popup__input_type_card ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__error'}`}
        id="cardInputName"
        type="text"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required=""
        value={values.name ? values.name : ''}
        disabled={loadingButtonDelete}
        onChange={handleChange}
      />
      <span className="popup__error" id="cardInputName-error">{errors.name}</span>
      <input
        className={`popup__input popup__input_type_link${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__error'}`}
        id="cardInputLink"
        type="url"
        name="link"
        placeholder="Ссылка на изображение"
        required=""
        value={values.link ? values.link : ''}
        disabled={loadingButtonDelete}
        onChange={handleChange}
      />
      <span className="popup__error" id="cardInputLink-error" >{errors.link}</span>
    </PopupWithForm>
  )
}