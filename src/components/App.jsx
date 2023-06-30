import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js'
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [isDeletePopup, setDeletePopup] = useState(false)

  const [currentUser, setCurrentUser] = useState({})

  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([])
  const [deleteCardId, setDeleteCardId] = useState('')
  const [loadingButtonDelete, setLoadingButtonDelete] = useState(false)


  const setStatesForCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setisEditAvatarPopupOpen(false)
    setIsImagePopup(false)
    setDeletePopup(false)
  }, [])

  const closePopupEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setStatesForCloseAllPopups()
      document.removeEventListener('keydown', closePopupEsc)
    }
  }, [setStatesForCloseAllPopups])

  const closeAllPopups = useCallback(() => {
    setStatesForCloseAllPopups()
    document.removeEventListener('keydown', closePopupEsc)
  }, [setStatesForCloseAllPopups, closePopupEsc])

  function setEvantListenerForDocument() {
    document.addEventListener('keydown', closePopupEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEvantListenerForDocument()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEvantListenerForDocument()
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true)
    setEvantListenerForDocument()
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
    setEvantListenerForDocument()
  }

  function handleDeletePopup (cardId) {
    setDeleteCardId(cardId)
    setDeletePopup(true)
    setEvantListenerForDocument()
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setCards(dataCards)
        setLoading(false)
      })
      .catch((error) => console.error(`Ошибка при загрузке данных ${error}`));
  }, [])

  function handleDeleteSubmit(evt) {
    evt.preventDefault()
    setLoadingButtonDelete(true)
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
        setLoadingButtonDelete(false)
      })
      .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          loading={loading}
          onDelete={handleDeletePopup}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} />

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
          isOpen={isDeletePopup}
          onSubmit={handleDeleteSubmit}
          loadingButtonDelete={loadingButtonDelete}
          onClose={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
