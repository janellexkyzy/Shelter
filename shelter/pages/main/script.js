let currentIndex = 0;
const slides = document.querySelectorAll(".our-friends-slide");
const leftButton = document.querySelector(".our-friends-arrow_prev");
const rightButton = document.querySelector(".our-friends-arrow_next");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    if (i >= currentIndex && i < currentIndex + 3) {
      slides[i].style.display = "block";
    } else {
      slides[i].style.display = "none";
    }
  }
}

function showNext() {
  if (currentIndex + 3 < slides.length) {
    currentIndex = currentIndex + 1;
  } else {
    currentIndex = 0;
  }
  showSlides();
}

function showPrevious() {
  if (currentIndex >= 0) {
    currentIndex = currentIndex - 1;
  } else {
    currentIndex = slides.length - 3;
  }
  showSlides();
}

leftButton.addEventListener("click", showPrevious);
rightButton.addEventListener("click", showNext);

showSlides();


/*---------------------------------------slider end */

//import json from './pets.json' assert {type: 'json'};

document.addEventListener("DOMContentLoaded", function () {
  const learnMoreButtons = document.querySelectorAll(".our-friends-slide-btn");
  const popup = document.querySelector(".our-friends-modal-window");

  function loadJSON(callback) {
    fetch("./pets.json")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        callback(data);
      });
  }

  function updatePopupContent(pet) {
    const popupImage = popup.querySelector(".modal-img");
    const popupText = popup.querySelector(".our-friends-modal-content");
    popupImage.src = pet.img;
    popupText.innerHTML = `
      <h3 class="our-friends-modal-header">${pet.name}</h3>
      <h4 class="our-friends-modal-subheader">${pet.type} - ${pet.breed}</h4>
      <p class="our-friends-modal-descr">${pet.description}</p>
      <ul class="our-friends-modal-list">
        <li><span class="popup__span-bold">Age:</span> <span class="popup__pet-age char">${pet.age}</span></li>
        <li><span class="popup__span-bold">Inoculations:</span> <span class="popup__pet-inoculations char">${pet.inoculations.join(", ")}</span></li>
        <li><span class="popup__span-bold">Diseases:</span> <span class="popup__pet-diseases char">${pet.diseases.join(", ")}</span></li>
        <li><span class="popup__span-bold">Parasites:</span> <span class="popup__pet-parasites char">${pet.parasites.join(", ")}</span></li>
      </ul>
    `;
  }

  function processData(data) {
    let pets = data;
    for (let i = 0; i < learnMoreButtons.length; i++) {
      (function (index) {
        learnMoreButtons[index].addEventListener("click", function () {
          popup.style.display = "block";
          updatePopupContent(pets[index]);
        });
      })(i);
    }

    const closeButtons = document.querySelectorAll(".our-friends-modal-close-button");
    for (let j = 0; j < closeButtons.length; j++) {
      closeButtons[j].addEventListener("click", function () {
        popup.style.display = "none";
      });
    }
  }

  loadJSON(processData);
});
