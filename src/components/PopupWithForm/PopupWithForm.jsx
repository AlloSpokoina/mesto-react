import React from "react"

export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
        <button
          className="popup__close"
          type="button"
          aria-label="close popup edit profile"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form
          className="popup__form"
          name={name}
        >
          {children}
          <button className="popup__submit" aria-label="save" type="submit">
            {titleButton || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  )
}
