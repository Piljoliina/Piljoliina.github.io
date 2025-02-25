const weekday = ["Tänään On Sunnuntai"," Tänään On Maanantai","Tänään On Tiistai","Tänään On Keskiviikko","Tänään On Torstai","Tänään On Perjantai","Tänään On Lauantai"];

const d = new Date();
let day = weekday[d.getUTCDay()];
document.getElementById("viikonpaiva").innerHTML = day;