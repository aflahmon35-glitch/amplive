/* ======================================================
   AMP LIVE
   Country Flag Map
   ====================================================== */

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
    "Turkey": "tr.png",
    "USA": "us.png",
    "United States": "us.png",
    "Uruguay": "uy.png",
    "Uzbekistan": "uz.png",
   "Ivory Coast": "ci.png"

};

/* ======================================================
   Get Flag Path
   ====================================================== */

function getFlag(teamName) {

    const file = FLAG_MAP[teamName];

    if (!file) {
        return "images/flags/default.png";
    }

    return `images/flags/${file}`;

}
