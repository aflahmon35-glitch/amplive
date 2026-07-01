/* =========================================================
   AMP LIVE - MATCH JS (Part 1)
   Load Match From Firestore
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    // Get match ID from URL
    const params = new URLSearchParams(window.location.search);
    const matchId = params.get("id");

    if (!matchId) {
        alert("Match not found.");
        return;
    }

    try {

        // Load match document
        const match = await window.AMP_FIREBASE.getMatchById(matchId);

if (!match) {
    alert("Match not found.");
    return;
}

        console.log("Match Loaded:", match);

        // Team names
        document.getElementById("teamA").textContent = match.teamA;
        document.getElementById("teamB").textContent = match.teamB;

        // Match details
        document.getElementById("competition").textContent = match.competition;
        document.getElementById("group").textContent = match.group;
        document.getElementById("stadium").textContent = match.stadium;
        document.getElementById("date").textContent = match.date;
        document.getElementById("time").textContent = match.time;

    } catch (err) {

        console.error(err);
        alert("Unable to load match.");

    }

});

/* =========================================================
   AMP LIVE - MATCH JS (Part 2)
   Stream Handling + Future Firebase Hooks
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       STREAM BUTTON LOGIC
       (Basic routing to watch page)
    ------------------------- */

    const streamButtons = document.querySelectorAll(".stream-btn");

    streamButtons.forEach((btn, index) => {

        btn.addEventListener("click", (e) => {

            // Allow special Live 6 (WhatsApp) to behave normally
            if (btn.classList.contains("special")) return;

            e.preventDefault();

            // Future: pass stream ID via URL or storage
            const streamId = index + 1;

            console.log("Opening Stream:", streamId);

            // Navigate to watch page
            window.location.href = `watch.html?stream=${streamId}`;

        });

    });

    /* -------------------------
       FUTURE FIREBASE PLACEHOLDER
    ------------------------- */

    window.AMP_MATCH = {
        getMatch: () => {
            console.log("Firebase hook ready (match data)");
        },

        updateStreamLinks: (links) => {
            console.log("Firebase stream update hook", links);
        }
    };

});
