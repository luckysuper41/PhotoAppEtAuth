import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

Modal.propTypes = {
     selectedImg : PropTypes.string,
     setIsOpenClick: PropTypes.func
};

Modal.defaultProps = {
     selectedImg : null,
     setIsOpenClick: null
}

export default function Modal(props) {

     const {selectedImg,setIsOpenClick} = props;

     const handleClick = (e) =>{
          if(e.target.classList.contains("modal_show")){
               setIsOpenClick(false);
          }
     }

     return (
          <div className="modal_show" onClick={handleClick}>
               <img src={selectedImg} alt="selectedImage" />
          </div>
     )
}
