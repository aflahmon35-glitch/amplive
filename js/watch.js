
/* =========================================================
   AMP LIVE - WATCH JS (Part 1)
   Stream Loader Core
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       GET STREAM ID FROM URL
    ------------------------- */

    const urlParams = new URLSearchParams(window.location.search);
    const streamId = urlParams.get("stream") || "1";

    console.log("Loaded Stream ID:", streamId);

    /* -------------------------
       PLAYER ELEMENT
    ------------------------- */

    const player = document.getElementById("livePlayer");

    /* -------------------------
       SAMPLE STREAM MAP (PLACEHOLDER)
       Later replaced by Firebase
    ------------------------- */

    const streamLinks = {
        "1": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "2": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "3": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "4": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "5": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    };

    /* -------------------------
       LOAD STREAM
    ------------------------- */

    function loadStream(id) {

        if (!player) return;

        const src = streamLinks[id] || streamLinks["1"];

        player.src = src;

    }

    loadStream(streamId);

});


/* =========================================================
   AMP LIVE - WATCH JS (Part 2)
   Refresh Control + Future Stream Hooks
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       ELEMENTS
    ------------------------- */

    const player = document.getElementById("livePlayer");
    const refreshBtn = document.getElementById("refreshStream");

    /* -------------------------
       REFRESH STREAM
    ------------------------- */

    if (refreshBtn && player) {
        refreshBtn.addEventListener("click", () => {

            const currentSrc = player.src;

            // force reload
            player.src = "";
            setTimeout(() => {
                player.src = currentSrc;
            }, 300);

        });
    }

    /* -------------------------
       FUTURE STREAM API HOOK
    ------------------------- */

    window.AMP_STREAM = {
        setStream: (url) => {
            if (player) {
                player.src = url;
            }
        },

        reload: () => {
            if (player) {
                const src = player.src;
                player.src = "";
                setTimeout(() => player.src = src, 300);
            }
        }
    };

});