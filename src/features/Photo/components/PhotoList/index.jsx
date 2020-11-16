import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import PhotoCard from '../PhotoCard';

PhotoList.propTypes = {
  photoList: PropTypes.array,
  onPhotoEditClick: PropTypes.func,
  onPhotoRemoveClick: PropTypes.func,
  onPhotoClick: PropTypes.func
};

PhotoList.defaultProps = {
  photoList: [],
  onPhotoEditClick: null,
  onPhotoRemoveClick: null,
  onPhotoClick: null
};

function PhotoList(props) {
  const { photoList, onPhotoEditClick, onPhotoRemoveClick, onPhotoClick } = props;

  return (
    <Row>
      {photoList.map(photo => (
        <Col key={photo.title} xs="12" md="6" lg="3">
          <PhotoCard
            photo={photo}
            onEditClick={onPhotoEditClick}
            onRemoveClick={onPhotoRemoveClick}
            onOpenClick={onPhotoClick}
          />
        </Col>
      ))}
    </Row>
  );
}

export default PhotoList;