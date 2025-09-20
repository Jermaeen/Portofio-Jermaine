// -- FILE: script.js -->
// Small script for interactivity: mobile nav, lightbox, current year
document.addEventListener('DOMContentLoaded',function(){
  // year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click',()=>{
      mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // gallery lightbox
  // const lightbox = document.getElementById('lightbox');
  // const lightboxImg = document.getElementById('lightboxImg');
  // const lightboxClose = document.getElementById('lightboxClose');
  // document.querySelectorAll('.gallery-img').forEach(img => {
  //   img.addEventListener('click', e => {
  //     const src = e.currentTarget.dataset.full || e.currentTarget.src;
  //     lightboxImg.src = src;
  //     lightbox.style.display = 'flex';
  //     lightbox.setAttribute('aria-hidden','false');
  //   });
  // });
  // if(lightboxClose){
  //   lightboxClose.addEventListener('click', ()=>{ lightbox.style.display='none'; lightbox.setAttribute('aria-hidden','true'); });
  // }
  // if(lightbox){
  //   lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) { lightbox.style.display='none'; lightbox.setAttribute('aria-hidden','true'); } });
  // }
const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));
let currentIndex = 0;

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
  <span class="close">&times;</span>
  <span class="prev">&#10094;</span>
  <img src="" alt="">
  <span class="next">&#10095;</span>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

function showImage(index) {
  currentIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
  lightbox.style.display = 'flex';
}

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    showImage(index);
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
  showImage(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  showImage(currentIndex + 1);
});

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    } else if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    }
  }
});

  // Hide mobile nav on link click (small devices)
  document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', ()=>{
    if(window.innerWidth <= 700 && mainNav) mainNav.style.display = 'none';
  }));

});