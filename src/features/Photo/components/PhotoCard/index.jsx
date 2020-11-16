import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './PhotoCard.scss';

PhotoCard.propTypes = {
  photo: PropTypes.object,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onOpenClick: PropTypes.func
};

PhotoCard.defaultProps = {
  photo: {},
  onEditClick: null,
  onRemoveClick: null,
  onOpenClick: null
}

function PhotoCard(props) {
  const { photo, onEditClick, onRemoveClick, onOpenClick } = props;

  const handleEditClick = () => {
    if (onEditClick) onEditClick(photo);
  }

  const handleRemoveClick = () => {
    if (onRemoveClick) onRemoveClick(photo);
  }

  const handleOpenClick = () =>{
    if (onOpenClick) onOpenClick(photo);
  }

  return (
    <div className="photo">
      <img src={photo.photo} alt={photo.title}  />

      <div className="photo__overlay" >
        <h3 className="photo__title">{photo.title}</h3>

        <div className="photo__actions">
        <div>
            <Button outline size="sm" color="success" onClick={handleOpenClick}>
              View
            </Button>
          </div>
          <div>
            <Button outline size="sm" color="light" onClick={handleEditClick}>
              Edit
            </Button>
          </div>

          <div>
            <Button outline size="sm" color="danger" onClick={handleRemoveClick}>
              Remove
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;