'use strict';
// Lišta sa po posunutí z fotky zmení na sklo; fotka sa hýbe pomalšie ako obsah (paralaxa)
const siteTop = document.getElementById('top');
const bg = document.querySelector('.hero-bg');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let raf = 0;
const onScroll = () => {
  raf = 0;
  siteTop.classList.toggle('solid', scrollY > innerHeight * 0.6);
  if (!reduce && bg && scrollY < innerHeight * 1.2) bg.style.setProperty('--py', `${Math.round(scrollY * 0.3)}px`);
};
addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(onScroll); }, { passive: true });
onScroll();
// Sekcie sa jemne vysunú, keď sa k nim posunieš
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver((list) => {
    let n = 0;
    list.forEach((e) => { if (!e.isIntersecting) return; e.target.style.setProperty('--d', `${Math.min(n++, 5) * 80}ms`); e.target.classList.add('in'); io.unobserve(e.target); });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv').forEach((el) => io.observe(el));
} else document.querySelectorAll('.rv').forEach((el) => el.classList.add('in'));
document.getElementById('year').textContent = new Date().getFullYear();

// Prepínač jazyka si zapamätá voľbu (namiesto inline onclick, ktorý by CSP zablokovala)
document.querySelectorAll('a[data-lang]').forEach((a) => a.addEventListener('click', () => {
  try { localStorage.setItem('lt-lang', a.dataset.lang); } catch (e) { /* bez úložiska nič */ }
}));
