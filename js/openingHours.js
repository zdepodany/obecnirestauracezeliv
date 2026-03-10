const hourSpotDesktop = document.querySelector("#openingHoursForToday");

function isOpen() {
  const now = new Date();
  const day = now.getDay(); // 0 = neděle, 1 = pondělí, ..., 6 = sobota
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  // Pátek a sobota: 11:00 - 22:00, ostatní dny: 11:00 - 20:00
  const openMinutes = 11 * 60; // 11:00
  const closeMinutes = (day === 5 || day === 6) ? 22 * 60 : 20 * 60; // 22:00 nebo 20:00

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

function getMinutesUntilOpening() {
  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = 11 * 60;

  const closeMinutes = (day === 5 || day === 6) ? 22 * 60 : 20 * 60;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return 0;
  }
  if (currentMinutes < openMinutes) {
    return openMinutes - currentMinutes;
  }
  const minutesUntilMidnight = 24 * 60 - currentMinutes;
  return minutesUntilMidnight + openMinutes;
}

function getClosedText(desktop) {
  const minutes = getMinutesUntilOpening();
  if (desktop && minutes > 0) {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      return "Otevíráme za " + hours + " hod";
    }
    return "Otevíráme za " + minutes + " min";
  }
  return "Zavřeno";
}

function updateStatus() {
  const open = isOpen();
  const closedTextDesktop = getClosedText(true);

  if (hourSpotDesktop) {
    hourSpotDesktop.innerHTML = open ? "Otevřeno" : closedTextDesktop;
    hourSpotDesktop.classList.remove("status-open", "status-closed");
    hourSpotDesktop.classList.add(open ? "status-open" : "status-closed");
  }
}

updateStatus();
setInterval(updateStatus, 60000); // aktualizace každou minutu (důležité pro countdown "za x min")

// Zvýraznění dnešního dne v otevírací době
document.querySelectorAll(".ohRow").forEach((row) => {
  if (parseInt(row.dataset.day, 10) === new Date().getDay()) {
    row.classList.add("today");
  }
});
