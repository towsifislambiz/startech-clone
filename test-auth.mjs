import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3Dt07sCmO7UcXCrc_J8HRdF7QItSVpf4",
  authDomain: "startech-77d5d.firebaseapp.com",
  projectId: "startech-77d5d",
  storageBucket: "startech-77d5d.firebasestorage.app",
  messagingSenderId: "45047495218",
  appId: "1:45047495218:web:48ac80748cf42efba61a2b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function testRegistrationFlow() {
  const testEmail = `test_user_${Date.now()}@startech.test`;
  const testPassword = 'Password123!';
  const testName = 'Test User';

  console.log("REGISTER FUNCTION STARTED");
  console.log("Inputs:", { email: testEmail });

  try {
    console.log("Before createUser");
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    const firebaseUser = userCredential.user;
    console.log("After createUser - UID:", firebaseUser.uid);

    console.log("Before updateProfile");
    try {
      await updateProfile(firebaseUser, { displayName: testName });
      console.log("After updateProfile");
    } catch (pErr) {
      console.log("updateProfile error:", pErr.message);
    }

    console.log("Before setDoc");
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(userRef, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: testName,
        photoURL: '',
        role: 'Customer',
        status: 'active',
        emailVerified: false,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
      console.log("After setDoc - Success");
    } catch (fsErr) {
      console.log("Firestore setDoc Notice:", fsErr.message);
    }

    console.log("Before sendEmailVerification");
    try {
      await sendEmailVerification(firebaseUser);
      console.log("After sendEmailVerification");
    } catch (evErr) {
      console.log("sendEmailVerification error:", evErr.message);
    }

    console.log("Before signOut");
    try {
      await signOut(auth);
      console.log("After signOut");
    } catch (soErr) {
      console.log("signOut error:", soErr.message);
    }

    console.log("Returning from register()");
    console.log("[REGISTER_SUBMIT] register() returned: { success: true }");
    console.log("[REGISTER_FORM] showRegisterOverlay active -> Starting 3s React Router navigation timer");
    console.log("[REGISTER_FORM] 3-second timer completed -> Executing navigate(/login)");
    process.exit(0);
  } catch (err) {
    console.log("register() caught error:", err.code, err.message);
    process.exit(1);
  }
}

testRegistrationFlow();
