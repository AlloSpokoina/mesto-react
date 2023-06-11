export default function Main() {
    return (
        <main>
            <section className="profile" aria-label="Info profile">
                <div className="profile__avatar-info">
                    <button type="button" className="profile__avatar-overlay">
                        <img className="profile__avatar" src="#" alt="Аватар профиля" />
                    </button>
                    <div className="profile__info">
                        <div className="profile__info-edit">
                            <h1 className="profile__name"> </h1>
                            <button
                                className="profile__edit-button"
                                type="button"
                                aria-label="button edit"
                            />
                        </div>
                        <p className="profile__description" />
                    </div>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="add info"
                />
            </section>
        </main>
    )
}