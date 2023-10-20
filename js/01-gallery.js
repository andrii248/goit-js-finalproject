import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector("ul.gallery");
gallery.addEventListener("click", handleClick);

const instance = basicLightbox.create(
  `
    <img class="modal" src='' width="800" height="600">
`,
  {
    onShow: () => {
      window.addEventListener("keydown", handleEscapeKey);
    },

    onClose: () => {
      window.removeEventListener("keydown", handleEscapeKey);
    },
  }
);

gallery.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
        <a class="gallery__link" href=${original}>
        <img
        class="gallery__image"
        src=${preview}
        data-source=${original}
        alt=${description}
        />
        </a>
        </li>`
    )
    .join("");
}

function handleClick(evt) {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) {
    return;
  }

  const imageOriginal = evt.target.dataset.source;
  const image = galleryItems.find(({ original }) => original === imageOriginal);

  createModal(image);
}

function createModal({ original }) {
  instance.element().querySelector(".modal").src = original;
  instance.show();
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    instance.close();
  }
}
