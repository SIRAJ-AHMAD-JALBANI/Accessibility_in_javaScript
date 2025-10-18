// script.js (replace your current file with this)
const themes = [
  { name: "dark", message: "You switched to dark theme!" },
  { name: "light", message: "You switched to light theme!" }
];

const switchBtn = document.getElementById("theme-switcher-button");
const dropdown = document.getElementById("theme-dropdown");
const liveRegion = document.querySelector("[aria-live='polite']");
const body = document.body;

// Toggle dropdown visibility
switchBtn.addEventListener("click", () => {
  const isHidden = dropdown.hasAttribute("hidden");
  if (isHidden) {
    dropdown.removeAttribute("hidden");
    switchBtn.setAttribute("aria-expanded", "true");
  } else {
    dropdown.setAttribute("hidden", "");
    switchBtn.setAttribute("aria-expanded", "false");
  }
});

// Add click listeners to each li (more explicit & reliable)
const items = Array.from(dropdown.querySelectorAll('li[role="menuitem"]'));
items.forEach(li => {
  li.addEventListener("click", (e) => {
    // ensure we have an id like "theme-dark"
    const id = li.id || "";
    if (!id.startsWith("theme-")) return;

    const themeName = id.replace("theme-", "").toLowerCase();

    // remove only the known theme classes
    themes.forEach(t => body.classList.remove(`theme-${t.name}`));

    // add the new theme class to body (this satisfies Test 26)
    body.classList.add(`theme-${themeName}`);

    // find message from themes array and set aria-live (satisfies Test 27)
    const themeObj = themes.find(t => t.name === themeName);
    liveRegion.textContent = themeObj ? themeObj.message : "";

    // close dropdown & update aria-expanded
    dropdown.setAttribute("hidden", "");
    switchBtn.setAttribute("aria-expanded", "false");
  });
});

// close when clicking outside
document.addEventListener("click", (e) => {
  const inside = switchBtn.contains(e.target) || dropdown.contains(e.target);
  if (!inside && !dropdown.hasAttribute("hidden")) {
    dropdown.setAttribute("hidden", "");
    switchBtn.setAttribute("aria-expanded", "false");
  }
});
