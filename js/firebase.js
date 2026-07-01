
/* =========================================================
   AMP LIVE - FIREBASE CONNECTION (REAL)
========================================================= */

// Your Firebase config (copy from console)
const firebaseConfig = {
    apiKey: "AIzaSyChTxJYk92E7_SptJrSz57xQ2MA2d_sAJw",
    authDomain: "amplive-2d1ad.firebaseapp.com",
    projectId: "amplive-2d1ad",
    storageBucket: "amplive-2d1ad.firebasestorage.app",
    messagingSenderId: "742405124371",
    appId: "1:742405124371:web:601c3a3f6b498f3868eae6"
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
},

// Get all live links
getMatchLinks: async function () {

    const doc = await db.collection("matchLinks").doc("current").get();

    return doc.exists ? doc.data() : null;
}

};

console.log("🔥 Firebase Connected");
