// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBD6xwWWuT4xbQDRWUfpO2_lJC3bYyL8Go",
    authDomain: "jogjourney-k16.firebaseapp.com",
    projectId: "jogjourney-k16",
    storageBucket: "jogjourney-k16.firebasestorage.app",
    messagingSenderId: "779217320193",
    appId: "1:779217320193:web:3f640fae00de551b6a8300",
    measurementId: "G-M6Y3NFN9JX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize auth; only for native platforms (Android and iOS)
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

const firestore = getFirestore();

export { auth, app, firestore };