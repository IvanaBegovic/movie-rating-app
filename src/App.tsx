import React from 'react';
import './App.css';
import {HomePage} from "./pages";
import {initializeApp} from "firebase/app"
import {firebaseDatabaseConfig} from "./firebase-database-config";

export const firebaseApp = initializeApp(firebaseDatabaseConfig);

function App() {
  return (
    <div className="App">
      <HomePage/>
    </div>
  );
}

export default App;
