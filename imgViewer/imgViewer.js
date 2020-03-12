function setImg(e) {
  const selectedImg = document.getElementById('selected_img');
  selectedImg.children[0].src = e.target.dataset.imgsrc;
  selectedImg.children[0].alt = e.target.dataset.imgtitle;
}

function _createImgViewer(opt) {
  const { imgs } = opt;
  const block = document.createElement('div');
  block.classList.add('imgViewer');
  block.insertAdjacentHTML(
    'afterbegin',
    `
      <div id="selected_img">
        <img src="${(imgs && imgs[0].src) || ''}" alt='${imgs[0].title}'/>
      </div>
      <div class="carousel">
      <button class="arrow prev">⇦</button>
      <div class="gallery">
        <ul class="images">
        ${opt.imgs.map(
          img =>
            `<li><img onclick="setImg(event)" data-imgsrc="${img.src}" data-imgtitle="${img.title}" src="${img.src}" alt='${img.title}'></li>`
        )}
        </ul>
      </div>
      <button class="arrow next">⇨</button>
      </div>
    `
  );

  opt.render.appendChild(block);
  return block;
}

function ImgViewer(opt) {
  const $imgViewer = _createImgViewer(opt);
  return {};
}
