// ---------- 1. Live clock (only on pages that have id="clock") ----------
const clock = document.getElementById("clock");
function showTime() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
if (clock) {
  showTime(); // show the time straight away
  setInterval(showTime, 1000); // then update it every 1000 ms (1 second)
}

// ---------- 2. Form notification (only on the contact page) ----------
const form = document.getElementById("suggestion-form");
const notice = document.getElementById("notice");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading
    notice.classList.remove("hidden"); // show the green message
    form.reset(); // clear the form
  });
}

// ---------- 3. Change background colour (only on the Home page) ----------
const colorBtn = document.getElementById("color-btn");
const colors = ["#f6f4ee", "#e4efec", "#fdf1dc", "#e8eef7", "#f7e8ec"];
let current = 0;
if (colorBtn) {
  colorBtn.addEventListener("click", function () {
    current = current + 1; // move to the next colour
    if (current === colors.length) {
      // past the last one?
      current = 0; // start again from the first
    }
    document.body.style.backgroundColor = colors[current];
  });
}
