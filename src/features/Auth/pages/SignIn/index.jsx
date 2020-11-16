//import PropTypes from 'prop-types';
import firebase from 'firebase';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

SignIn.propTypes = {

};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  signInSuccessUrl: '/photos',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

export default function SignIn() {
     return (
          <div>
               <div className="text-center">
                    <h2>Login Form</h2>

                    <p>or login with social accounts</p>
               </div>

               <StyledFirebaseAuth 
                    uiConfig={uiConfig} 
                    firebaseAuth={firebase.auth()}
               />
          </div>
     )
}
