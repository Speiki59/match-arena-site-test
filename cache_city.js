const city = localStorage.getItem("_city");

if (city === null) {
  document.querySelector(".redir-prm").addEventListener("click", e => {
    localStorage.setItem("_city", "prm");
  });
  document.querySelector(".redir-ekb").addEventListener("click", e => {
    localStorage.setItem("_city", "ekb");
  });
}

if (city === "prm") {
  window.location.href = window.location.href + "prm.html";
}

if (city === "ekb") {
  window.location.href = window.location.href + "ekb.html";
}
