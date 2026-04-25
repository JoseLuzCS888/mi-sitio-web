import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlwa657fa4hqS8mp1N3vzjCV6cYJdNHvo",
  authDomain: "casa-el-molino.firebaseapp.com",
  projectId: "casa-el-molino",
  storageBucket: "casa-el-molino.firebasestorage.app",
  messagingSenderId: "816277763842",
  appId: "1:816277763842:web:07f6c304d44f5b0a49741b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
