import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditProfilePopup({isOpen, onClose}) {
  const { handleChange } = useFormValidation()

  return (
    <PopupWithForm
          name='popupProfile'
          title='Редактировать профиль'
          isOpen={isOpen}
          onClose={onClose}
        > <input
            className="popup__input popup__input_type_name"
            type="text"
            name="name"
            minLength={2}
            maxLength={40}
            placeholder="Имя"
            id="popupProfileName"
            required=""
            onChange={handleChange}
          />
          <span className="popup__error" id="popupProfileName-error" />
          <input
            className="popup__input popup__input_type_info"
            type="text"
            name="info"
            minLength={2}
            maxLength={200}
            placeholder="О себе"
            id="popupProfileInfo"
            required=""
            onChange={handleChange}
          />
          <span className="popup__error" id="popupProfileInfo-error" />
        </PopupWithForm>
  )
}
