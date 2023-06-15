import React from "react"

export default function PopupWhithForm({name, title, titleButton, children, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="close popup edit profile"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form
          className="popup__form"
          id="profileEdit"
          name={name}
          noValidate=""
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
