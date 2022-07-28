let hourSpot = document.querySelector("#openingHoursForToday");
let day = new Date().getDay();

if (day == 0 || day == 1 || day == 2 || day == 3 || day == 4) {
  hourSpot.innerHTML = "Dnes 11:00 - 20:00";
} else {
  hourSpot.innerHTML = "Dnes 11:00 - 22:00";
}
