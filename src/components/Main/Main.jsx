import { useContext } from "react"
import Card from "../Card/Card"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards }) {
const currentUser = useContext(CurrentUserContext)


  return (
    <main>
      <section className="profile" aria-label="Info profile">
        <div className="profile__avatar-info">
          <button type="button" className="profile__avatar-overlay" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
          </button>
          <div className="profile__info">
            <div className="profile__info-edit">
              <h1 className="profile__name"> {currentUser.name} </h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="button edit"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__description"> {currentUser.about} </p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="add info"
          onClick={onAddPlace}
        />
      </section>
      <section className="element" aria-label="Photo card">
        {cards.map(data => {
          return <Card key = { data._id } card={data} onCardClick={onCardClick} />
        })}
      </section>
    </main>
  )
}
