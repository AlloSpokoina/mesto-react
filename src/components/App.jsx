import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js'
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

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

  function handleDeletePopup(cardId) {
    setDeleteCardId(cardId)
    setDeletePopup(true)
    setEvantListenerForDocument()
  }

  function handleUpdateUser(dataUser, reset) {
    setLoadingButtonDelete(true)
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setLoadingButtonDelete(false)
      })
      .catch((error) => console.error(`Ошибка при вводе данных ${error}`));
  }

  function handleUpdateAvatar(dataUser, reset) {
    setLoadingButtonDelete(true)
    api.setAddNewAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setLoadingButtonDelete(false)
      })
      .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`));
  }

function handleSubmitPlace(dataCard, reset) {
  setLoadingButtonDelete(true)
  api.addCard(dataCard)
  .then((res) => {
    setCards([res, ...cards])
    closeAllPopups()
    reset()
    setLoadingButtonDelete(false)
  })
  .catch((error) => console.error(`Ошибка добавления карточки ${error}`));
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
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          loadingButtonDelete={loadingButtonDelete}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleSubmitPlace}
          onClose={closeAllPopups}
          loadingButtonDelete={loadingButtonDelete}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          loadingButtonDelete={loadingButtonDelete}
        />

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
