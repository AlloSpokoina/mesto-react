export default function Card({ card }) {
  return (
    <article className="element__card">
      <button className="element__delete" type="button" aria-label="delete" />
      <img className="element__image" src={card.link} alt={`Изображение ${card.name}`} />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container">
          <button className="element__like" type="button" />
          <span className="element__counter" />
        </div>
      </div>
    </article>
  )
}
