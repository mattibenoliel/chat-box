import Rebase from 're-base' //permet d'integrer firebase ds react
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAKg41qmk56mWGcduaQH3svyh7Tt7TQdpw",
  authDomain: "chatbox-8492b.firebaseapp.com",
  databaseURL: "https://chatbox-8492b.firebaseio.com",
})


const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base
