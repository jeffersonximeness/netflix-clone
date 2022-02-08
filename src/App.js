import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'

export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList().then(response => setMovieList(response))
    
      let originals = Tmdb.getHomeList()
        .then(item => item.filter(movies => movies.slug === 'originals'))
        .then(array => {
          let randomChosen = Math.floor(Math.random() * (array[0].items.results.length - 1))
          let chosen = array[0].items.results[randomChosen]

          let chosenInfo = async () => await Tmdb.getMovieInfo(chosen.id, 'tv').then(response => setFeaturedData(response))

          chosenInfo()
        })
      
    }

    loadAll()
  }, [])

  return (
    <div className='page'>

      { featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        { movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        )) }
      </section>
    </div>
  )
}