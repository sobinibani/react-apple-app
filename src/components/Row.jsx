import { useCallback, useEffect, useState } from 'react';
import axios from '../api/axios'
import './Row.css'
import MovieModal from './MovieModal/index'
import styled from "styled-components";

// Import Swiper
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Row = ({title, id, fetchUrl}) => {

  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }
    
  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl])

  useEffect(()=>{
    fetchMovieData();
  },[])


  return (
    <Container>
      <h2>{title}</h2>
      <div className='slider'>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          breakpoints={{
            1378:{
              slidesPerView: 6, //한번에 보이는 슬라이드 개수
              slidesPerGroup: 6, // 몇개씩 슬라이드 할지
            },
            998:{
              slidesPerView: 5, //한번에 보이는 슬라이드 개수
              slidesPerGroup: 5, // 몇개씩 슬라이드 할지
            },
            625:{
              slidesPerView: 4, //한번에 보이는 슬라이드 개수
              slidesPerGroup: 4, // 몇개씩 슬라이드 할지
            },
            0:{
              slidesPerView: 3, //한번에 보이는 슬라이드 개수
              slidesPerGroup: 3, // 몇개씩 슬라이드 할지
            },
          }}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
        <div id={id} className='row_posters'>
            {movies.map((movie)=>{
                return (
                <SwiperSlide key={movie.id}>
                  <Wrap>
                    <img
                        className='row_poster'
                        src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt={movie.name}
                        onClick={()=>handleClick(movie)}
                    />
                  </Wrap>
                </SwiperSlide>
                )
            })}
        </div>
        </Swiper>
      </div>
      {modalOpen ? 
      <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
      : null}

    </Container>
  )
}

const Container = styled.div`
  padding: 0 0 26px;
`

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0/ 69%) 0 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor:pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25 0.46 0.45 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top:0;
  }
`

export default Row;
