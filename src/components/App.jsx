import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)
  console.log()

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setisEditAvatarPopupOpen(false)
    setIsImagePopup(false)
  }

  return (
    <div className="page__container">

      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name='popupProfile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      > <input
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          minLength={2}
          maxLength={40}
          placeholder="Имя"
          id="popupProfileName"
          required=""
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
        />
        <span className="popup__error" id="popupProfileInfo-error" />
      </PopupWithForm>

      <PopupWithForm
        name='popupCard'
        title='Новое место'
        titleButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_card"
          id="cardInputName"
          type="text"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
        />
        <span className="popup__error" id="cardInputName-error" />
        <input
          className="popup__input popup__input_type_link"
          id="cardInputLink"
          type="url"
          name="link"
          placeholder="Ссылка на изображение"
          required=""
        />
        <span className="popup__error" id="cardInputLink-error" />
      </PopupWithForm>

      <PopupWithForm
        name='popupAvatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_link"
          id="cardInputLinkAvatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на изображение"
          required=""
        />
        <span className="popup__error" id="cardInputLinkAvatar-error" />
      </PopupWithForm>

      <PopupWithForm
        name='popupDelete'
        title='Вы уверенны'
        titleButton='Да'
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups} />
    </div>

  );
}

export default App;
