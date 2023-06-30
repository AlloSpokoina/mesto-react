import { useEffect, useState } from "react"
import api from "../../utils/api"


export default function Like({ likes, myid, cardId }) {
  const [isLike, setIsLike] = useState(false)
  const [count, setCount] = useState(likes.length)

  useEffect(() => {
    setIsLike(likes.some(element => myid === element._id))
  }, [likes, myid])

  function handleLike() {
    if (isLike) {
      api.deleteLike(cardId)
        .then(res => {
          setIsLike(false)
          setCount(res.likes.length)
        })
        .catch((error) => console.error(`Ошибка при клике на лайк ${error}`))
    } else {
      api.addLike(cardId)
        .then(res => {
          setIsLike(true)
          setCount(res.likes.length)
        })
        .catch((error) => console.error(`Ошибка при клике на лайк ${error}`))
    }
  }

  return (
    <>
      <button className={`element__like ${isLike ? 'element__like_type_active' : ''}`} type="button" onClick={handleLike} />
      <span className="element__counter">{count}</span>
    </>
  )
}
