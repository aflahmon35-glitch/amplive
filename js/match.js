
/* =========================================================
   AMP LIVE - MATCH JS (Part 1)
   Match Page Data Loader (Core Setup)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       PLACEHOLDER MATCH DATA
       (Later replaced by Firebase / URL params)
    ------------------------- */

    const matchData = {
        teamA: "Team A",
        teamB: "Team B",
        competition: "FIFA World Cup",
        group: "Group A",
        stadium: "Main Stadium",
        date: "2026-06-27",
        time: "20:00"
    };

    /* -------------------------
       DOM ELEMENTS
    ------------------------- */

    const teamA = document.getElementById("teamA");
    const teamB = document.getElementById("teamB");

    const competition = document.getElementById("competition");
    const group = document.getElementById("group");
    const stadium = document.getElementById("stadium");
    const date = document.getElementById("date");
    const time = document.getElementById("time");

    /* -------------------------
       LOAD MATCH DATA INTO UI
    ------------------------- */

    function loadMatch() {

        if (teamA) teamA.textContent = matchData.teamA;
        if (teamB) teamB.textContent = matchData.teamB;

        if (competition) competition.textContent = matchData.competition;
        if (group) group.textContent = matchData.group;
        if (stadium) stadium.textContent = matchData.stadium;
        if (date) date.textContent = matchData.date;
        if (time) time.textContent = matchData.time;
    }

    loadMatch();

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