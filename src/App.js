import React, { useEffect, useState } from 'react'
import Tmdb from './Tmdb'

export default () => {

  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    const loadAll = async () => {
      let list = Tmdb.getHomeList().then(response => setMovieList(response))
    }

    loadAll()
  }, [])

  console.log(movieList)

  return (
    <div className='page'>
    </div>
  )
}