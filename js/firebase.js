
/* =========================================================
   AMP LIVE - FIREBASE CONNECTION (REAL)
========================================================= */

// Your Firebase config (copy from console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore DB
const db = firebase.firestore();

/* =========================================================
   GLOBAL API
========================================================= */

window.AMP_FIREBASE = {

    db,

    // Get all matches by date
    getMatchesByDate: async function (day) {

        const snapshot = await db.collection("matches")
            .where("date", "==", day)
            .get();

        const matches = [];

        snapshot.forEach(doc => {
            matches.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return matches;
    },

    // Get single match
    getMatchById: async function (id) {

        const doc = await db.collection("matches").doc(id).get();

        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

};

console.log("🔥 Firebase Connected");