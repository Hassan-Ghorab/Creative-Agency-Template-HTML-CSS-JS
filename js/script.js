const settingBox = document.getElementById("setting-box");
const toggleSettingBoxIcon = document.getElementById("toggle-setting-box-icon");
const btnMobileNav = document.querySelector(".btn-mobile-nav");
const allLinks = document.querySelectorAll(".nav-links a");
const header = document.querySelector(".header");
const landingPage = document.getElementById("landing-page");
const introImage = document.getElementById("intro-img");
const galleryImages = document.querySelectorAll(".gallery-images img");
const popupContainer = document.querySelector(".popup-Container");
const servicesImages = document.querySelectorAll(".service-img");
const colorsOptions = document.querySelectorAll(".colors-list li");
const dayMoodToggler = document.getElementById("day-mood-toggler");
const darkMood = document.getElementById("dark-mood");
const lightMood = document.getElementById("light-mood");
const progressBar = document.querySelectorAll(".skill-box");
const sectionsEl = document.querySelectorAll(".section");
const currentYear = document.querySelector(".current-year");
const upArrow = document.querySelector(".icon-up");
const showBullets = document.querySelector(".show-bullets");
const hideBullets = document.querySelector(".hide-bullets");
const navBullets = document.querySelector(".nav-bullets");
const showScrollProgress = document.querySelector(".show-progress-bar");
const hideScrollProgress = document.querySelector(".hide-progress-bar");
const scrollProgress = document.querySelector(".scroll-progress");
const showStickyNavigation = document.querySelector(".show-sticky-navigation");
const hideStickyNavigation = document.querySelector(".hide-sticky-navigation");
const home = document.getElementById("home");

// Scroll Progress
function fillScrollProgress() {
  scrollProgress.style.width = `${
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  }%`;
  requestAnimationFrame(fillScrollProgress);
}
fillScrollProgress();

// Toggle nav menu
btnMobileNav.addEventListener("click", (e) => {
  header.classList.toggle("open-nav");
});

// Close menu after clicking a link
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    header.classList.toggle("open-nav");
  });
});

// Sticky Navigation
// const obs = new IntersectionObserver(
//   function (entries) {
//     const ent = entries[0];
//     if (ent.isIntersecting === false) {
//       document.body.classList.add("sticky");
//     }

//     if (ent.isIntersecting === true) {
//       document.body.classList.remove("sticky");
//     }
//   },
//   {
//     // In the viewport
//     root: null,
//     threshold: 0,
//     rootMargin: "-80px",
//   }
// );
// obs.observe(landingPage);

// Toggle SettingBox
toggleSettingBoxIcon.addEventListener("click", (e) => {
  settingBox.classList.toggle("toggle-setting-box");
  e.target.classList.toggle("setting-icon-rotation");
});

// Close menu or setting box if scrolling
window.onload = function () {
  window.addEventListener("scroll", function (e) {
    if (parseInt(document.body.getBoundingClientRect().top) * -1 > 1000) {
      header.classList.remove("open-nav");
      settingBox.classList.remove("toggle-setting-box");
      toggleSettingBoxIcon.classList.remove("setting-icon-rotation");
    }
  });
};

// Switch Colors & Switch photos
function handleActiveColor(color) {
  document.documentElement.style.setProperty("--main-color", color);
}

function handleActiveClass() {
  colorsOptions.forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.color === localStorage.mainColor) {
      e.classList.add("active");
    }
  });
}

// Change gallery photos colors and make popup
function handleActiveGalleryImage(imgNumber, alt) {
  for (let i = 0; i < galleryImages.length; i++) {
    galleryImages[i].src = `images/gallery/${i + 1}-gallery-${imgNumber}.svg`;
    galleryImages[i].addEventListener("click", (e) => {
      popup = `
      <div class="overlay close-model"></div>
      <div class="popup">
      <div class="popup-head ds-flex">
      <h3 class="popup-title">${galleryImages[i].alt}</h3>
      <i class="icon-cancel close-model"></i>
      </div>
      <img src="${e.target.src}" alt="${alt}"/>
      </div>
      `;
      popupContainer.innerHTML = popup;
      popupContainer.classList.remove("ds-none");
    });
  }
}

function closeModel() {
  popupContainer.classList.toggle("ds-none");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-model")) {
    closeModel();
  }
});

function handleActiveServicesImage(imgNumber) {
  servicesImages.forEach(
    (img, i) =>
      (img.src = `images//services/${i + 1}-services-${imgNumber}.svg`)
  );
}

// Change intro and gallery and services photos to the active color
function handleActiveImage(color) {
  if (color === "#a18436") {
    introImage.src = "images/Intro/1-intro-gold.svg";
    handleActiveGalleryImage(1, "Design");
    handleActiveServicesImage(1);
  } else if (color === "#00818f") {
    introImage.src = "images/Intro/2-intro-dark-cyan.svg";
    handleActiveGalleryImage(2, "Develope");
    handleActiveServicesImage(2);
  } else if (color === "#EA1C29") {
    introImage.src = "images/Intro/3-intro-red.svg";
    handleActiveGalleryImage(3, "Secure");
    handleActiveServicesImage(3);
  } else if (color === "#2BA79B") {
    introImage.src = "images/Intro/4-intro-green.svg";
    handleActiveGalleryImage(4, "Analysis");
    handleActiveServicesImage(4);
  } else if (color === "#FF8300") {
    introImage.src = "images/Intro/5-intro-orange.svg";
    handleActiveGalleryImage(5, "Market");
    handleActiveServicesImage(5);
  }
}

// Make the active class work all the time
if (localStorage.mainColor != null) {
  handleActiveColor(localStorage.mainColor);
  handleActiveClass();
  handleActiveImage(localStorage.mainColor);
}

colorsOptions.forEach((color) => {
  color.addEventListener("click", (e) => {
    localStorage.setItem("mainColor", e.target.dataset.color);

    handleActiveColor(e.target.dataset.color);
    handleActiveClass();
    handleActiveImage(e.target.dataset.color);
  });
});

// Dark & Light Theme
dayMoodToggler.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-sun-filled")) {
    lightTheme(e);
  } else {
    darkTheme(e);
  }
});

function lightTheme(e) {
  localStorage.setItem("theme", "light");
  document.body.classList.add("light-theme");
  lightMood.classList.add("active");
  darkMood.classList.remove("active");
}

function darkTheme(e) {
  localStorage.setItem("theme", null);
  document.body.classList.remove("light-theme");
  darkMood.classList.add("active");
  lightMood.classList.remove("active");
}

if (localStorage.getItem("theme") === "light") {
  lightTheme();
} else {
  darkTheme();
}

// Fill the skill progress bar
function fillProgressBar() {
  progressBar.forEach(
    (bar) =>
      (bar.style.background = `conic-gradient(var(--main-color) ${
        bar.dataset.progress * 3.6
      }deg, transparent ${bar.dataset.progress * 3.6}deg)`)
  );
}
fillProgressBar();

// Get section and active link for the section
const allBullets = document.querySelectorAll(".nav-bullet");
function goToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

goToSection(allBullets);
// goToSection(allLinks);
function handleActiveLink() {
  allLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.href.includes(localStorage.getItem("active-section"))) {
      link.classList.add("active");
    }
  });
}

if (localStorage.getItem("active-section") != null) {
  handleActiveLink();
}

let currentSection = "home";
window.addEventListener("scroll", (e) => {
  sectionsEl.forEach((section) => {
    if (window.scrollY >= section.offsetTop) {
      currentSection = section.id;
      localStorage.setItem("active-section", section.id);
    }
    handleActiveLink();
  });
});

// Show & Hide Options
function showHideActiveClass(btn, targetAction) {
  btn.classList.remove("active");
  targetAction.classList.add("active");
}

function showHideElements(showBtn, hideBtn, showStorage, element) {
  showBtn.addEventListener("click", (e) => {
    localStorage.setItem(`${showStorage}`, "show");
    showHideActiveClass(hideBtn, e.target);
    element.classList.remove(`${"ds-none"}`);
  });

  hideBtn.addEventListener("click", (e) => {
    localStorage.setItem(showStorage, "hide");
    showHideActiveClass(showBtn, e.target);
    element.classList.add(`${"ds-none"}`);
  });

  if (localStorage.getItem(showStorage) == "show") {
    showHideActiveClass(hideBtn, showBtn);
    element.classList.remove(`${"ds-none"}`);
  } else if (localStorage.getItem(showStorage) == "hide") {
    showHideActiveClass(showBtn, hideBtn);
    element.classList.add(`${"ds-none"}`);
  } else if (!localStorage.getItem("navigation")) {
    showHideActiveClass(hideBtn, showBtn);
  }
}
showHideElements(showBullets, hideBullets, "bullets", navBullets);
showHideElements(
  showScrollProgress,
  hideScrollProgress,
  "scroll-progress-bar",
  scrollProgress
);

// Show hide Navigation
function showHideStickyNavigation() {
  showStickyNavigation.addEventListener("click", (e) => {
    localStorage.setItem("navigation", "show");
    home.classList.add("sticky");
    showHideActiveClass(hideStickyNavigation, e.target);
  });

  hideStickyNavigation.addEventListener("click", (e) => {
    localStorage.setItem("navigation", "hide");
    home.classList.remove("sticky");
    showHideActiveClass(showStickyNavigation, e.target);
  });

  if (localStorage.getItem("navigation") == "show") {
    home.classList.add("sticky");
    showHideActiveClass(hideStickyNavigation, showStickyNavigation);
  } else if (localStorage.getItem("navigation") == "hide") {
    home.classList.remove("sticky");
    showHideActiveClass(showStickyNavigation, hideStickyNavigation);
  } else if (!localStorage.getItem("navigation")) {
    showHideActiveClass(hideStickyNavigation, showStickyNavigation);
  }
}
showHideStickyNavigation();

// Assign the current year to the footer
const date = new Date();
const year = date.getFullYear();
currentYear.innerHTML = year;

// Go to top arrow
window.onscroll = () => {
  if (window.scrollY >= 1000) {
    upArrow.classList.remove("ds-none");
  } else {
    upArrow.classList.add("ds-none");
  }

  upArrow.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
};

// Clear LocalStorage
const activeColor = document.querySelector(".colors-list .active");

const resetOptions = document.querySelector(".reset-options");
resetOptions.addEventListener("click", (e) => {
  localStorage.clear();
  location.reload();
  activeColor.click();
});
