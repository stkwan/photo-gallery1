// Requirements
// 1. Use placeholder images to make four large images for the slides in
//    the slideshow
// 2. Only one image in the slideshow will be visible at a time.
//    The other images are hidden to start.
// 3. Make four smaller "thumbnail" images to be used as our slideshow navigation
// 4. When we click on a thumbnail set class to active and create border.
//    When we click away from the thumbnail, remove that active class and add it
//    to the one that was clicked. (i.e. toggle active class)
// 5. Based on which thumbnail was clicked, stop showing the one that was showing,
//    and start showing the one that was clicked.
// 6. Use fade animations to fade out the current photo and fade in the incoming photo

// Vanilla JS
document.addEventListener('DOMContentLoaded', () => {
  const slideShow = {
    init() {
      this.thumbnails = document.querySelectorAll('li > img');
      this.header = document.querySelector('h1');
      this.imgLinks = [];
      this.allFiguresHTML = '';

      this.createLinks();
      this.createFigures();
      this.renderPhotos();

      this.currentPhoto = document.querySelector('#figures').firstElementChild;
      this.nextPhoto = null;
      this.bind();
    },

    bind() {
      const ul = document.querySelector('ul');
      ul.addEventListener('click', this.thumbnailEvent.bind(this));
    },

    thumbnailEvent(e) {
      e.preventDefault();
      this.thumbnails.forEach((img) => {
        img.classList.remove('active');
      });
      const target = e.target;
      if (target.tagName === 'IMG') {
        target.classList.add('active');
        const index = Array.from(this.thumbnails).indexOf(target);
        this.nextPhoto = Array.from(document.querySelector('#figures').children)[index];
        this.fadeOut(this.currentPhoto);
        this.fadeIn(this.nextPhoto);
        this.currentPhoto = this.nextPhoto;
      }
    },

    fadeOut(photo) {
      photo.classList.remove('show');
      photo.classList.add('hide');
    },

    fadeIn(photo) {
      photo.classList.remove('hide');
      photo.classList.add('show');
    },

    createLinks() {
      this.thumbnails.forEach((thumbnail) => {
        const link = {};
        link.source = thumbnail.getAttribute('src');
        this.imgLinks.push(link);
      });
    },

    createFigures() {
      const figureTemplate = document.querySelector('#imgtemplate').innerHTML;
      const getFigureHTML = Handlebars.compile(figureTemplate);
      this.allFiguresHTML = getFigureHTML({ sources: this.imgLinks });
    },

    renderPhotos() {
      document.querySelector('figure').remove();
      const div = document.createElement('div');
      div.innerHTML = this.allFiguresHTML;
      this.header.after(div);
      div.id = 'figures';
    },
  };

  slideShow.init();
});
