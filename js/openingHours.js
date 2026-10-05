const hourSpotDesktop = document.querySelector("#openingHoursForToday");

// PO: 11-14, ÚT-ČT: 11-15, PÁ+NE: 11-19, SO: 11-20
function getCloseMinutes(day) {
  if (day === 1) return 14 * 60;
  if (day >= 2 && day <= 4) return 15 * 60;
  if (day === 6) return 20 * 60;
  return 19 * 60;
}

function isOpen() {
  const now = new Date();
  const day = now.getDay(); // 0 = neděle, 1 = pondělí, ..., 6 = sobota
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const openMinutes = 11 * 60;
  const closeMinutes = getCloseMinutes(day);

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

function getMinutesUntilOpening() {
  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = 11 * 60;

  const closeMinutes = getCloseMinutes(day);

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
