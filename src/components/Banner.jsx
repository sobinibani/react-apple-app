import { useEffect, useState } from "react"
import styled from "styled-components";
import axiosInstance from '../api/axios'
import requests from '../api/requests'
import './Banner.css'

const Banner = () => {

    const [movie, setMovie] = useState(null);
    const [isClicked, setisClicked] = useState(false);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async() => {
        //현재 상영중인 영화 정보를 가져오기 (여러 영화)
        const response = await axiosInstance.get(requests.fecthNowPlaying)
        // 여러 영화중 영화 하나의 id 가져오기
        const movieId = response.data.results[
            Math.floor(Math.random() * response.data.results.length)
        ].id       

        //특정 영화의 더 상세한 정보를 가져오기 (비디오 정보도 포함)
        const {data: movieDetail} = 
        await axiosInstance.get(`movie/${movieId}`, {params: {append_to_response: "videos"}})
        setMovie(movieDetail);
        // console.log(movie)
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substring(0, n) + '...' : str
    }

    if(!movie){
        // movie데이터를 가져오지 않았을때
        return(
            <div>loading...</div>
        )
    }
    
    if(!isClicked){
        return(
            <div 
                className="banner" 
                style={{
                    backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: 'top center',
                    backgroundSize: 'cover'
                }}
            >
                <div className="banner_contents">
                    <h1 className="banner_title">
                        {movie.title || movie.name || movie.original_name}
                    </h1>
                    <div className="banner_buttons">
                        {movie.videos?.results[0]?.key ? 
                            <button 
                                className="banner_button play"
                                onClick={()=>{setisClicked(true)}}
                            >
                                play
                            </button>
                            : null
                        }
                    </div>
                    <p className="banner_description">
                        {truncate(movie.overview, 100)}
                    </p>
                </div>
                <div className="banner--fadeBottom"></div>
            </div>
        )
    }
    else{
        return (
            <>
            <Container>
                <HomeContainer>
                    <Iframe src={`http://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}></Iframe>
                </HomeContainer>
            </Container>
            <button onClick={()=>{setisClicked(false)}}>x</button>
            </>
        )
    }
}

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    bodrer: none;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:100%;
    height: 100vh;
`

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`

export default Banner