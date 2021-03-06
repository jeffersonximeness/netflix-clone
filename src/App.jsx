import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import Header from './components/Header'
import FeaturedMovie from './components/FeaturedMovie/index'


export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList()
                  .then(
                    response => setTimeout(() => setMovieList(response), 1950)
                  )
    
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

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }

  }, [])

  return (
    <div className='page'>
      <Header black={blackHeader} />

      { featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        { movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        )) }
      </section>

      <footer>
        Direitos de imagem pertencentes a Netflix <br/>
        Dados obtidos via API do site themoviedb.org
      </footer>
      
      { movieList.length <= 0 &&  
        <div className='loading'>
          <img src="https://c.tenor.com/Rfyx9OkRI38AAAAC/netflix-netflix-startup.gif" alt="carregando" />
        </div>
      }
    </div>
  )
}