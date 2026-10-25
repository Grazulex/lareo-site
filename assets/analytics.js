// Google Analytics 4 avec le mode de consentement v2 : refusé par défaut dans l'EEE, au Royaume-Uni et
// en Suisse (bandeau pour accepter), accordé ailleurs (bandeau pour refuser). Publicité toujours refusée.
// Mesure le site lareo.immo seulement : l'application n'en contient aucune.
(function () {
  var ID = 'G-LAREO_TODO';
  var KEY = 'cookie_consent';
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'] });
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  if (read() === 'accepted') gtag('consent', 'update', { analytics_storage: 'granted' });
  else if (read() === 'declined') gtag('consent', 'update', { analytics_storage: 'denied' });

  gtag('js', new Date());
  gtag('config', ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);

  var TEXTS = {
    fr: ['Ce site utilise Google Analytics pour mesurer son audience. Dans l\'UE, au Royaume-Uni et en Suisse, uniquement avec votre accord ; ailleurs, vous pouvez le refuser ici.', 'En savoir plus', 'Refuser', 'Accepter'],
    nl: ['Deze site gebruikt Google Analytics om het bezoek te meten. In de EU, het VK en Zwitserland alleen met je toestemming; elders kun je het hier weigeren.', 'Meer weten', 'Weigeren', 'Aanvaarden'],
    en: ['This site uses Google Analytics to measure its audience. In the EU, UK and Switzerland it only runs if you accept; elsewhere you can refuse it here.', 'Learn more', 'Decline', 'Accept'],
    de: ['Diese Website nutzt Google Analytics, um die Besuche zu messen. In der EU, im Vereinigten Königreich und in der Schweiz nur mit Ihrer Zustimmung; anderswo können Sie es hier ablehnen.', 'Mehr erfahren', 'Ablehnen', 'Akzeptieren'],
    es: ['Este sitio usa Google Analytics para medir sus visitas. En la UE, el Reino Unido y Suiza solo con tu consentimiento; en otros lugares puedes rechazarlo aquí.', 'Más información', 'Rechazar', 'Aceptar'],
    it: ['Questo sito usa Google Analytics per misurare le visite. Nell\'UE, nel Regno Unito e in Svizzera solo con il tuo consenso; altrove puoi rifiutarlo qui.', 'Scopri di più', 'Rifiuta', 'Accetta']
  };

  function banner() {
    if (read()) return;
    var lang = (document.documentElement.lang || 'en').slice(0, 2);
    var t = TEXTS[lang] || TEXTS.en;
    var css = document.createElement('style');
    css.textContent = '#cc-banner{position:fixed;left:0;right:0;bottom:0;z-index:2000;padding:1rem;font-family:Figtree,-apple-system,"Segoe UI",Roboto,sans-serif}' +
      '#cc-banner .cc-box{max-width:44rem;margin:0 auto;background:#fff;color:#1B1F1A;border:2px solid #1B1F1A;border-radius:14px;padding:1rem 1.25rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem;align-items:center;box-shadow:0 10px 30px rgba(27,31,26,.18)}' +
      '#cc-banner p{flex:1 1 18rem;margin:0;font-size:.9rem;line-height:1.45}' +
      '#cc-banner a{color:inherit}' +
      '#cc-banner button{cursor:pointer;border-radius:999px;padding:.55rem 1.2rem;font:600 .9rem/1 inherit;border:2px solid #1B1F1A}' +
      '#cc-banner .cc-no{background:transparent;color:#1B1F1A}' +
      '#cc-banner .cc-yes{background:#FFD84D;color:#1B1F1A}';
    document.head.appendChild(css);
    var el = document.createElement('div');
    el.id = 'cc-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookies');
    var box = document.createElement('div');
    box.className = 'cc-box';
    var p = document.createElement('p');
    var more = document.createElement('a');
    var l = TEXTS[lang] ? lang : 'en';
    more.href = '/privacy/?lang=' + l + '#site-' + l;
    more.textContent = t[1];
    p.append(t[0] + ' ', more);
    var no = document.createElement('button');
    no.type = 'button'; no.className = 'cc-no'; no.textContent = t[2];
    var yes = document.createElement('button');
    yes.type = 'button'; yes.className = 'cc-yes'; yes.textContent = t[3];
    box.append(p, no, yes);
    el.append(box);
    yes.addEventListener('click', function () {
      write('accepted');
      gtag('consent', 'update', { analytics_storage: 'granted' });
      el.remove();
    });
    no.addEventListener('click', function () {
      write('declined');
      gtag('consent', 'update', { analytics_storage: 'denied' });
      el.remove();
    });
    document.body.appendChild(el);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
  else banner();
})();
