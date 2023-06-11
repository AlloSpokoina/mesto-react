import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/footer.jsx";
function App() {
  return (
    <div className="page__container">

      <Header/>

      <Main/>

      <Footer/>

      <div className="popup" id="popupProfile">
        <div className="popup__container">
          <button
            className="popup__close"
            type="button"
            aria-label="close popup edit profile"
          />
          <h3 className="popup__title">Редактировать профиль</h3>
          <form
            className="popup__form"
            id="profileEdit"
            name="profileEdit"
            noValidate=""
          >
            <input
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
            <button className="popup__submit" aria-label="save" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <div className="popup" id="popupCard">
        <div className="popup__container">
          <button
            className="popup__close"
            id="popupCloseCard"
            type="button"
            aria-label="close popup edit profile"
          />
          <h3 className="popup__title">Новое место</h3>
          <form className="popup__form" id="addCard" name="addCard" noValidate="">
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
            <button className="popup__submit" aria-label="save" type="submit">
              Создать
            </button>
          </form>
        </div>
      </div>
      <div className="popup" id="imagesPopup">
        <div className="popup__image-container">
          <button
            type="button"
            className="popup__close"
            aria-label="close"
            id="closeImageButton"
          />
          <img className="popup__image" src="#" alt="#" />
          <p className="popup__image-description" />
        </div>
      </div>
      <div className="popup" id="popupAvatar">
        <div className="popup__container">
          <button
            className="popup__close"
            id="popupAvatarClose"
            type="button"
            aria-label="close popup edit profile"
          />
          <h3 className="popup__title">Обновить аватар</h3>
          <form
            className="popup__form"
            id="editAvatar"
            name="editAvatar"
            noValidate=""
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
            <button className="popup__submit" aria-label="save" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <div className="popup" id="popupDelete">
        <div className="popup__container">
          <button
            className="popup__close"
            id="popupDeleteClose"
            type="button"
            aria-label="close popup edit profile"
          />
          <h3 className="popup__title">Вы уверены?</h3>
          <form className="popup__form" id="deleteCard" name="deleteCard">
            <button className="popup__submit" aria-label="save" type="submit">
              Да
            </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default App;
