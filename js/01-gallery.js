import { galleryItems } from "./gallery-items.js";
// Change code below this line

const listGallery = document.querySelector(".gallery");

const list = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
    <a class="gallery__link"  href="${original}">
    <img class="gallery__image" src="${preview}", data-source="${original}", alt="${description}"/>
    </a>
    </div>`
  )
  .join("");

// listGallery.innerHTML = list;
listGallery.insertAdjacentHTML("beforeend", list);

listGallery.addEventListener("click", onTargetImgClick);

function onTargetImgClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const srcBigImg = event.target.dataset.source;

  const instance = basicLightbox.create(
    `
       <img src="${srcBigImg}" width="800" height="600" />
     `
  );

  // ---------- Варіант з кнопкою "Close" ----------

  //   const instance = basicLightbox.create(
  //     `
  //        <div class="modal">
  //        <img class="modal-img" src="${srcBigImg}" width="70%" height="50%" />
  //        <button type="button" class="modal-button"><b>X</b></button>
  //        </div>
  //      `,
  //     {
  //       onShow: (instance) => {
  //         instance.element().querySelector(".modal").onclick = instance.close;
  //       },
  //     }
  //   );

  instance.show();

  if (instance.visible()) {
    window.addEventListener("keydown", onPressKeyEsc);
  }

  function onPressKeyEsc(event) {
    if (event.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", onPressKeyEsc);
    }
  }
}

console.log(galleryItems);
