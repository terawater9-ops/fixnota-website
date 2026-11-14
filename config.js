// Site settings.
window.FIXNOTA = {
  // Web3Forms access key for the Fixnota inbox. Leave empty until the key is created.
  formKey: "19f57efa-70c0-4eb7-a7b9-093a33bea857",
  thanksUrl: "https://fixnota.com/thanks.html"
};

(function () {
  var trades = ["Plumbing", "HVAC / heating and cooling", "Electrical", "General contracting", "Other trade"];

  function options() {
    return '<option value="">Your trade</option>' + trades.map(function (t) {
      return "<option>" + t + "</option>";
    }).join("");
  }

  function hidden(s, source) {
    return '<input type="hidden" name="access_key" value="' + s.formKey + '">' +
      '<input type="hidden" name="subject" value="New Fixnota waitlist signup">' +
      '<input type="hidden" name="from_name" value="fixnota.com">' +
      '<input type="hidden" name="source" value="' + source + '">' +
      '<input type="hidden" name="redirect" value="' + s.thanksUrl + '">' +
      '<input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">';
  }

  function heroForm(s) {
    return '<form class="wl wl-hero" action="https://api.web3forms.com/submit" method="POST">' + hidden(s, "hero") +
      '<label class="sr" for="wl-email-h">Work email</label>' +
      '<input id="wl-email-h" type="email" name="email" required autocomplete="email" placeholder="Your email">' +
      '<label class="sr" for="wl-trade-h">Your trade</label>' +
      '<select id="wl-trade-h" name="trade" required>' + options() + "</select>" +
      '<button type="submit">Join the waitlist</button>' +
      '<p class="form-msg" role="status"></p></form>';
  }

  var features = [
    ["quote", "Quote written from what I say on site"],
    ["followup", "Automatic follow-up on quotes"],
    ["parts", "Parts list for the supply house"],
    ["language", "Talk in my own language"],
    ["calls", "Linked to my phone calls and bookings"],
    ["workorder", "Work order for my techs"]
  ];

  function fullForm(s) {
    return '<form class="wl wl-full" action="https://api.web3forms.com/submit" method="POST">' + hidden(s, "survey") +
      '<div class="row">' +
        '<label>Name<input name="name" required autocomplete="name"></label>' +
        '<label>Business name<input name="business" autocomplete="organization"></label>' +
      "</div>" +
      '<div class="row">' +
        '<label>Email<input type="email" name="email" required autocomplete="email"></label>' +
        '<label>Trade<select name="trade" required>' + options() + "</select></label>" +
      "</div>" +
      '<div class="row">' +
        '<label>City<input name="city" placeholder="e.g. Brampton"></label>' +
        '<label>People in the field<select name="team_size"><option value="">Choose</option><option>Just me</option><option>2 to 5</option><option>6 to 15</option><option>More than 15</option></select></label>' +
      "</div>" +
      '<fieldset><legend>Pick up to three things you\'d use most</legend>' +
        features.map(function (f) {
          return '<label class="check"><input type="checkbox" name="wants[]" value="' + f[1] + '"> ' + f[1] + "</label>";
        }).join("") +
      "</fieldset>" +
      '<label class="tester"><input type="checkbox" name="tester" value="yes"> I\'d like to test Fixnota on my jobs before launch</label>' +
      '<button type="submit">Join the waitlist</button>' +
      '<p class="fine">We\'ll only email you about Fixnota. Unsubscribe any time. See our <a href="privacy.html">privacy policy</a>.</p>' +
      '<p class="form-msg" role="status"></p></form>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var s = window.FIXNOTA || {};
    document.querySelectorAll("[data-waitlist]").forEach(function (el) {
      el.innerHTML = el.getAttribute("data-waitlist") === "full" ? fullForm(s) : heroForm(s);
    });

    // Limit the feature picks to three.
    document.addEventListener("change", function (e) {
      if (!e.target.matches('input[name="wants[]"]')) return;
      var boxes = e.target.form.querySelectorAll('input[name="wants[]"]');
      var picked = Array.prototype.filter.call(boxes, function (b) { return b.checked; }).length;
      boxes.forEach(function (b) { b.disabled = !b.checked && picked >= 3; });
    });

    document.addEventListener("submit", function (e) {
      if (s.formKey) return;
      e.preventDefault();
      var msg = e.target.querySelector(".form-msg");
      if (msg) msg.textContent = "The waitlist opens in a few days. Please check back soon.";
    });
  });
})();
