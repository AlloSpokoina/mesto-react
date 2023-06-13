export default function PopupImage() {
  return (
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
  )
}
