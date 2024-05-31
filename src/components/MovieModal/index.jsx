import React from 'react'
import {imageBasePath} from '../../constant'
import './MovieModal.css'
import useOneClickOutSide from '../../hooks/useOnClickOutside';
import { useRef } from 'react';

const MovieModal = ({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen
}) => {

  const ref = useRef(null);
  useOneClickOutSide(ref, ()=>{setModalOpen(false)})

  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
            <span
                onClick={()=> setModalOpen(false)}
                className='modal-close'
            >X</span>
            <img 
                className='modal_poster'
                src={`${imageBasePath}${backdrop_path}`}
                alt='modal-poster-img'
            />
            <div className='modal_content'>
                <p className='modal_details'>
                    <span>100% for you</span>{""}
                    {release_date ? release_date : first_air_date}
                </p>
                <h2 className='modal_title'>
                    {title ?  title : name}
                </h2>
                <p className='modal_overview'>평점: {vote_average}</p>
                <p className='modal_overview'>{overview}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
