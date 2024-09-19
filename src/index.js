import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext, Context } from './store/FirebaseContext';

import {firestore, auth} from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <FirebaseContext.Provider value={{firestore, auth}}>
        <Context>
            <App/>
        </Context>
    </FirebaseContext.Provider>
)
