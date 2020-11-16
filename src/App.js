import productApi from 'api/productApi';
import SignIn from './features/Auth/pages/SignIn/index';
import firebase from 'firebase';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Button } from 'reactstrap';
import './App.scss';
import Header from './components/Header';
import NotFound from './components/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from 'app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

// Lazy load - Code splitting
const Photo = React.lazy(() => import('./features/Photo'));


// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAINE,
};
firebase.initializeApp(config);

function App() {

  //const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  console.log(user);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = { _page: 1, _limit: 10 };
        const response = await productApi.getAll(params);
        //console.log('Fetch products successfully: ', response);
        //setProductList(response.data);
      }catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    }

    fetchProductList();
  }, []);

  // Handle firebase auth changed
  useEffect(()=>{
    // remplace componentDidMount()
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) =>{
      if (!user){
        //user logs out, handle something here
        console.log("User is not logged in");
        return;
      }

      //lay dc token o day
      //get me when signed in
      try {
        const action = getMe();
        const actionResult = await dispatch(action);
        const currentUser = unwrapResult(actionResult);
        //console.log(currentUser); 
      } catch (error) {
        console('Failed to login', error);
      }
      
      //console.log('Log in user:', user.displayName);
      //const token = await user.getIdToken();
      //console.log('Log in token:', token);
    });
    
    // remplace componentWillMount() 
    return () => unregisterAuthObserver();  
  },[])

  const handleButtonClick = async () => {
    try {
      const params = { _page: 1, _limit: 10 };

      const response = await productApi.getAll(params);
      console.log(response);
    }catch (error) {
      console.log('Failed to fetch product list: ', error);
    }
  }

  //test

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Button onClick={()=>handleButtonClick()}>Fetch Product List</Button>

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;