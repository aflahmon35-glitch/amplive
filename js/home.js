
/* =========================================================
   AMP LIVE - HOME JS (Part 1)
   Date Selector + Match System Core
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       DATE SELECTOR
    ------------------------- */
    const dateButtons = document.querySelectorAll(".date-btn");

    dateButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            // remove active from all
            dateButtons.forEach(b => b.classList.remove("active"));

            // set active
            btn.classList.add("active");

            const selectedDay = btn.getAttribute("data-day");

            console.log("Selected Day:", selectedDay);

         

            // later: fetch matches based on selectedDay
            loadMatches(selectedDay);

        });

    });

    /* -------------------------
       MATCH CONTAINER
    ------------------------- */

    const matchesContainer = document.getElementById("matchesContainer");



       /* -------------------------
       LOAD MATCHES FUNCTION
    ------------------------- */
   function formatTime(time24) {

    const [hour, minute] = time24.split(":");

    let h = parseInt(hour, 10);

    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    if (h === 0) h = 12;

    return `${h}:${minute} ${ampm}`;
}

       /* -------------------------
       LOAD MATCHES FUNCTION
    ------------------------- */

async function loadMatches(day) {

    const container = document.querySelector(".matches-container");

    if (!container) return;

    container.innerHTML = "Loading matches...";

    try {

        // 🔥 GET REAL DATA FROM FIREBASE
        const matches = await window.AMP_FIREBASE.getMatchesByDate(day);

       matches.sort((a, b) => {

    if (day !== "today") {
        return a.time.localeCompare(b.time);
    }

    function priority(status) {

        switch (status.toUpperCase()) {

            case "LIVE": return 0;
            case "HT":   return 1;
            case "ET":   return 2;
            case "PEN":  return 3;
            case "FT":   return 5;

            default:     return 4; // UPCOMING
        }
    }

    const p = priority(a.status) - priority(b.status);

    if (p !== 0) return p;

    return a.time.localeCompare(b.time);

});

        container.innerHTML = "";

        if (!matches || matches.length === 0) {
            container.innerHTML = "<p style='text-align:center;color:gray;'>No matches found</p>";
            return;
        }

        // 🔥 CREATE MATCH CARDS
        matches.forEach(match => {

            const card = document.createElement("a");

            card.href = `match.html?id=${match.id}`;
            card.className = "match-card";

            let teamAClass = "";
let teamBClass = "";

if (match.score && match.score.includes("-")) {

    const [a, b] = match.score.split("-").map(Number);

    if (!isNaN(a) && !isNaN(b)) {

        if (a > b) {
            teamAClass = "winner";
            teamBClass = "loser";
        }

        else if (b > a) {
            teamBClass = "winner";
            teamAClass = "loser";
        }

    }

}

            card.innerHTML = `
<div class="match-content">

    <div class="team team-left">
        <img src="${getFlag(match.teamA)}" class="team-logo" alt="${match.teamA}">
        <span class="team-name ${teamAClass}">${match.teamA}</span>
    </div>

    <div class="match-center">
    <div class="match-time">${formatTime(match.time)}</div>

    <span class="status-badge ${match.status.toLowerCase()}">
        ${match.status}
    </span>

    ${
        match.score
            ? `<div class="match-score">${match.score}</div>`
            : ""
    }
</div>

    <div class="team team-right">
        <img src="${getFlag(match.teamB)}" class="team-logo" alt="${match.teamB}">
        <span class="team-name ${teamBClass}">${match.teamB}</span>
    </div>

</div>

<div class="match-footer">
    <span>${match.competition}</span>
    <span>•</span>
    <span>${match.group}</span>
</div>
`;
            container.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = "Error loading matches";
    }
}



   

    /* -------------------------
       INITIAL LOAD
    ------------------------- */

    loadMatches("today");

});


/* =========================================================
   AMP LIVE - HOME JS (Part 2)
   Status Styling + Match Navigation Fixes
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const matchesContainer = document.getElementById("matchesContainer");

    /* -------------------------
       STATUS COLOR FIX
    ------------------------- */

    function formatStatus(status) {

        if (!status) return "";

        const s = status.toUpperCase();

        if (s === "LIVE") return `<span class="status-badge live">LIVE</span>`;
        if (s === "UPCOMING") return `<span class="status-badge">UPCOMING</span>`;
        if (s === "FINISHED") return `<span class="status-badge">FINISHED</span>`;

        return `<span class="status-badge">${status}</span>`;
    }

    /* -------------------------
       OVERRIDE RENDER (PATCH VERSION)
    ------------------------- */

    window.renderMatchCard = function(match) {

        const card = document.createElement("a");
        card.href = "match.html";
        card.className = "match-card";

        card.innerHTML = `
            <div class="accent-bar"></div>

            <div class="match-content">

                <div class="team team-left">
                    <img src="images/team-placeholder.png" class="team-logo">
                    <span class="team-name">${match.teamA}</span>
                </div>

                <div class="match-center">
                    <div class="match-time">${match.time}</div>
                    ${formatStatus(match.status)}
                </div>

                <div class="team team-right">
                    <img src="images/team-placeholder.png" class="team-logo">
                    <span class="team-name">${match.teamB}</span>
                </div>

            </div>

            <div class="match-footer">
                <span class="competition">${match.competition}</span>
                <span>•</span>
                <span class="brand">AMP LIVE</span>
                <span>•</span>
                <span class="group">${match.group}</span>
            </div>
        `;

        return card;
    };

    /* -------------------------
       CLICK ENHANCEMENT (FUTURE SAFE)
    ------------------------- */

    if (matchesContainer) {
        matchesContainer.addEventListener("click", (e) => {

            const card = e.target.closest(".match-card");

            if (!card) return;

            // Future: pass match ID via URL
            console.log("Match clicked → navigate to match page");

        });
    }

});
