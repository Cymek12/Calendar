
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtwH6-hzwP97EIqBJl2BsrRCaavQpowwY",
  authDomain: "schedule-wellcode.firebaseapp.com",
  projectId: "schedule-wellcode",
  storageBucket: "schedule-wellcode.appspot.com",
  messagingSenderId: "1067414712578",
  appId: "1:1067414712578:web:4bd972a1ebf7a155b2121b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
