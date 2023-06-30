import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Like from "../Like/Like"

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <article className="element__card">
      {currentUser._id === card.owner._id && (<button type="button" className="element__delete" onClick={() => card._id && onDelete(card._id)} />)}
      <img className="element__image" src={card.link} alt={`Изображение ${card.name}`}
        onClick={() => onCardClick(card)}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container">
          <Like likes={card.likes} myid={currentUser._id} cardId={card._id} />
        </div>
      </div>
    </article>
  )
}
