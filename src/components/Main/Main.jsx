import { useEffect, useState } from "react"
import api from "../../utils/api"
import Card from "../Card/Card"

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])


  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setUserName(dataUser.name)
        setUserDescription(dataUser.about)
        setUserAvatar(dataUser.avatar)
        if (Array.isArray(dataCards)) {
          dataCards.forEach(data => data.myid = dataUser._id)
          setCards(dataCards)
        }
      })
      .catch((error) => console.error(`Ошибка при загрузке данных ${error}`));
  }, [])
  return (
    <main>
      <section className="profile" aria-label="Info profile">
        <div className="profile__avatar-info">
          <button type="button" className="profile__avatar-overlay" onClick={onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="Аватар профиля" />
          </button>
          <div className="profile__info">
            <div className="profile__info-edit">
              <h1 className="profile__name"> {userName} </h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="button edit"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__description"> {userDescription} </p>
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
