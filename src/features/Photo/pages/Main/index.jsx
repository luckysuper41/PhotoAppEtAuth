import Banner from 'components/Banner';
import Images from 'constants/images';
import Modal from 'features/Photo/components/Modal/Modal';
import PhotoList from 'features/Photo/components/PhotoList';
import { removePhoto } from 'features/Photo/photoSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';

MainPage.propTypes = {
};


function MainPage(props) {

  const [isOpenClick,setIsOpenClick] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const dispatch = useDispatch();
  const photos = useSelector(state => state.photos);
  const history = useHistory();
  // console.log('List of photos: ', photos);

  const handlePhotoEditClick = (photo) => {
    //console.log('Edit: ', photo);
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
    setIsOpenClick(false);
  }

  const handlePhotoRemoveClick = (photo) => {
    //console.log('Remove: ', photo);
    const removePhotoId = photo.id;
    const action = removePhoto(removePhotoId);
    setIsOpenClick(false);
    dispatch(action);
    
  }

  const handlePhotoOpen = (photo) => {
    setIsOpenClick(!isOpenClick);
    //console.log(isOpenClick);
    if(!isOpenClick){
      setSelectedImg(photo.photo);
    }else{
      setSelectedImg(null);
    }
  }

  //console.log(selectedImg);
  return (
    <div className="photo-main">
      <Banner title="Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">Add new photo</Link>
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
          onPhotoClick={handlePhotoOpen}
        />

        {isOpenClick ? (<Modal selectedImg={selectedImg} setIsOpenClick={setIsOpenClick} />) : null}
      </Container>
    </div>
  );
}

export default MainPage;