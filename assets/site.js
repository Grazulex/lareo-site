// Sélecteur de région du haut de page : chaque page fournit ses textes dans
// <script type="application/json" id="rules">, la logique est la même pour toutes les langues.
(function () {
  var data = document.getElementById("rules");
  if (!data) return;
  var page = JSON.parse(data.textContent);
  var buttons = document.querySelectorAll(".regions button");
  var interval = document.getElementById("interval");
  var note = document.getElementById("note");
  var source = document.getElementById("source");

  function show(region) {
    var rule = page.regions[region];
    interval.textContent = rule.interval;
    note.textContent = rule.note;
    source.textContent = "";
    source.append(page.sourceLabel + " ");
    var link = document.createElement("a");
    link.href = rule.url;
    link.textContent = rule.source;
    source.append(link, page.verified);
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === button)); });
      interval.classList.add("swap");
      setTimeout(function () {
        show(button.dataset.region);
        interval.classList.remove("swap");
      }, 150);
    });
  });
})();
