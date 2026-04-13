document.addEventListener("DOMContentLoaded", function() {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("cookieAccept");
  const rejectBtn = document.getElementById("cookieReject");

  if (!cookieBanner) return;

  // Check if consent has already been given or rejected
  const consentStatus = localStorage.getItem("cookie_consent");

  if (!consentStatus) {
    // Wait a bit before showing to allow other entry animations to play
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 1000);
  } else if (consentStatus === "granted") {
    // If previously granted, update gtag
    updateGtagConsent('granted');
  }

  acceptBtn.addEventListener("click", function() {
    localStorage.setItem("cookie_consent", "granted");
    updateGtagConsent('granted');
    hideBanner();
  });

  rejectBtn.addEventListener("click", function() {
    localStorage.setItem("cookie_consent", "denied");
    // Default is denied, so it's already set in the head script
    hideBanner();
  });

  function hideBanner() {
    cookieBanner.classList.remove("show");
  }

  function updateGtagConsent(status) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'ad_storage': status,
        'analytics_storage': status,
        'ad_user_data': status,
        'ad_personalization': status
      });
    }
  }
});
