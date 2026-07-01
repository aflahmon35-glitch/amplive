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
       
       document.getElementById("teamAFlag").src = getFlag(match.teamA);
       document.getElementById("teamAFlag").alt = match.teamA;
       
       document.getElementById("teamBFlag").src = getFlag(match.teamB);
       document.getElementById("teamBFlag").alt = match.teamB;

       // game status
       const score = document.getElementById("matchScore");
       const status = document.getElementById("matchStatus");

// Score
if (match.score && match.score.trim() !== "") {
    score.textContent = match.score;
    score.style.display = "block";
} else {
    score.style.display = "none";
}

// Status
status.textContent = match.status;

// Badge colour
status.className = "status-badge";

switch (match.status.toUpperCase()) {

    case "LIVE":
        status.classList.add("live");
        break;

    case "HT":
        status.classList.add("ht");
        break;

    case "ET":
        status.classList.add("et");
        break;

    case "PEN":
        status.classList.add("pen");
        break;

    case "FT":
        status.classList.add("ft");
        break;

    default:
        status.classList.add("upcoming");
}

        // Match details
        document.getElementById("competition").textContent = match.competition;
        document.getElementById("group").textContent = match.group;
        document.getElementById("stadium").textContent = match.stadium;
        document.getElementById("date").textContent = match.date;
        document.getElementById("time").textContent = match.time;

       // =============================
// Load Live Links
// =============================

const streamsContainer = document.getElementById("streamsContainer");
const linksMessage = document.getElementById("linksMessage");

// Hide everything initially
streamsContainer.style.display = "none";
linksMessage.style.display = "none";

// Show links only if linkAvailable = Y
if (
    match.linkavailable &&
    match.linkavailable.toUpperCase() === "Y"
) {

    const links = await window.AMP_FIREBASE.getMatchLinks();

    if (links) {

        streamsContainer.style.display = "flex";
        streamsContainer.innerHTML = "";

        Object.keys(links)
            .sort()
            .forEach(key => {

                const url = links[key];

                if (!url) return;

                const btn = document.createElement("a");

                btn.href = `watch.html?stream=${key}`;
                btn.className = "stream-btn";
                btn.textContent = key.replace("live", "Live ");

                streamsContainer.appendChild(btn);

            });

    }

} else {

    // Show message instead of links
    linksMessage.style.display = "block";

}

} catch (err) {

    console.error("MATCH ERROR:", err);
    alert(err.message);

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
