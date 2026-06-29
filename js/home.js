
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
   TEAM FLAG MAP
------------------------- */

const FLAG_MAP = {

    "Algeria": "dz.png",
    "Argentina": "ar.png",
    "Australia": "au.png",
    "Austria": "at.png",
    "Belgium": "be.png",
    "Bosnia and Herzegovina": "ba.png",
    "Brazil": "br.png",
    "Cabo Verde": "cv.png",
    "Canada": "ca.png",
    "Colombia": "co.png",
    "Croatia": "hr.png",
    "Curaçao": "cw.png",
    "Czechia": "cz.png",
    "DR Congo": "cd.png",
    "Ecuador": "ec.png",
    "Egypt": "eg.png",
    "England": "gb.png",
    "France": "fr.png",
    "Germany": "de.png",
    "Ghana": "gh.png",
    "Haiti": "ht.png",
    "Iran": "ir.png",
    "Iraq": "iq.png",
    "Japan": "jp.png",
    "Jordan": "jo.png",
    "Mexico": "mx.png",
    "Morocco": "ma.png",
    "Netherlands": "nl.png",
    "New Zealand": "nz.png",
    "Norway": "no.png",
    "Panama": "pa.png",
    "Paraguay": "py.png",
    "Portugal": "pt.png",
    "Qatar": "qa.png",
    "Saudi Arabia": "sa.png",
    "Scotland": "gb-sct.png",
    "Senegal": "sn.png",
    "South Africa": "za.png",
    "South Korea": "kr.png",
    "Spain": "es.png",
    "Sweden": "se.png",
    "Switzerland": "ch.png",
    "Tunisia": "tn.png",
    "Türkiye": "tr.png",
    "USA": "us.png",
    "United States": "us.png",
    "Uruguay": "uy.png",
    "Uzbekistan": "uz.png"

};


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

            card.innerHTML = `
                <div class="match-content">

                    <div class="team">
                        <img src="images/logos/team.png">
                        <span>${match.teamA}</span>
                    </div>

                    <div class="center">
                        <div class="time">${match.time}</div>
                        <div class="status">${match.status}</div>
                    </div>

                    <div class="team">
                        <img src="images/logos/team.png">
                        <span>${match.teamB}</span>
                    </div>

                </div>

                <div class="footer">
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
