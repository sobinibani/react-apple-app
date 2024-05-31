import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { imageBasePath } from "../../constant";
import './DetailPage.css'

const DetailPage = () => {
  const {movieId} = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(()=>{
    async function fetchData(){
      const response = await axios.get(`/movie/${movieId}`)
      setMovie(response.data)
      console.log(movie)
    }
    fetchData();
  },[movieId])

  if(!movie) return null;

  return (
    <section className="detailpage">
      <img
        src={`${imageBasePath}${movie.backdrop_path}`}
        alt="detail"
        className="detail-img"
      />
      <h2>{movie.title}</h2>
      <p>평점 : {movie.vote_average}</p>

      <div className="item">
        <p className="item-title">장르</p>
          {movie.genres.map((movie)=>{
            return (
              <span className="genres">{movie.name}</span>
            )
          })}
      </div>

      <div className="item">
        <p className="item-title">콘텐츠 설명</p>
        <div className="movie-overview">
          <p>{movie.overview}</p>
        </div>
      </div>
    </section>
  )
}

export default DetailPage
