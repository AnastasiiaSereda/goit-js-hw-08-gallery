import images from "./gallery-items.js";
import refs from "./refs.js";


images.forEach( element => {
  const imageMarkup  = `<li class="gallery__item">
  <a class="gallery__link">
      <img class="gallery__image" src="${element.preview}"
          data-source="${element.original}" alt="${element.description}" />
      <span class="gallery__icon">
          <i class="material-icons">zoom_out_map</i>
      </span>
  </a>
</li>`;

  refs.gallery.insertAdjacentHTML("beforeend", imageMarkup);
});

const displayPreview = function(event) {
  if (event.target.nodeName === "IMG") {
    const originalImagePath = event.target.dataset.source;
    refs.imageContainer.classList.add("is-open");
    refs.image.setAttribute("src", originalImagePath);
  }
};

const varyImage = function(key) {
  const currentImgPath = refs.image.getAttribute("src");
  let index = images.findIndex(elem => {
    return currentImgPath === elem.original;
  });
  if (key === "ArrowRight") {
    index += 1;
    if (index === images.length) {
      index = 0;
    }
  }
  if (key === "ArrowLeft") {
    index -= 1;
    if (index === -1) {
      index = images.length - 1;
    }
  }
  refs.image.setAttribute("src", images[index].original);
}

const handleKeyPress = function(event) {
  if (event.key === "Escape") {
    concealPreview();
  }
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    varyImage(event.key);
  }
}

const concealPreview = function() {
  refs.imageContainer.classList.remove("is-open");
  
};


const handleBackdropClick = function (event) {
  if (event.target.nodeName === "IMG") {
    return;
  }
  concealPreview();
}

refs.gallery.addEventListener("click", displayPreview);
refs.closeBtn.addEventListener("click", concealPreview);
window.addEventListener("click", handleBackdropClick);
document.addEventListener("keydown", handleKeyPress);
