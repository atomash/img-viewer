function _createImgViewer(opt) {
  const { imgs } = opt;
  const block = document.createElement('div');
  block.classList.add('imgViewer');
  block.insertAdjacentHTML(
    'afterbegin',
    `
      <div id="selected_img">
        <img src="${(imgs && imgs[0].src) || ''}" alt='${imgs[0].alt || ''}'/>
      </div>
      <div class="carousel">
      <button class="arrow prev">⇦</button>
      <div class="gallery">
        <ul class="images">
        ${opt.imgs.map(
          img =>
            `<li><img data-src="${img.src}" data-alt="${img.title}" src="${img.src}" alt='${img.alt}'></li>`
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
  this.imgs = opt.imgs || [];
  this.width = opt.width || 140;
  this.skip = opt.skip || 1;
  this.position = 0;
  const $imgViewer = _createImgViewer(opt);
  const carousel = $imgViewer.querySelector('.carousel');
  const list = carousel.querySelector('ul');

  carousel.querySelector('.images').addEventListener('click', e => {
    if (e.target.dataset.src) {
      const selectedImg = document.getElementById('selected_img');
      selectedImg.children[0].src = e.target.dataset.src;
      selectedImg.children[0].alt = e.target.dataset.alt || '';
    }
  });

  carousel.querySelector('.prev').onclick = () => {
    this.position += this.width * this.skip;
    this.position = Math.min(this.position, 0);
    list.style.marginLeft = this.position + 'px';
  };

  carousel.querySelector('.next').onclick = () => {
    this.position -= this.width * this.skip;
    this.position = Math.max(
      this.position,
      -this.width * (this.imgs.length - this.skip)
    );
    list.style.marginLeft = this.position + 'px';
  };
}
