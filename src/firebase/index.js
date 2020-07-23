import firebase from 'firebase/app'
import 'firebase/storage'

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyCisS7c77p1cN96S5lUZhgrsTe8B2V7J9o',
    authDomain: 'test-image-9800c.firebaseapp.com',
    databaseURL: 'https://test-image-9800c.firebaseio.com',
    projectId: 'test-image-9800c',
    storageBucket: 'test-image-9800c.appspot.com',
    messagingSenderId: '671123933918',
    appId: '1:671123933918:web:bfc753a9820f05e1ced04f',
}
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
