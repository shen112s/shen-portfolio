const siteHeader = document.querySelector('.site-header');
const syncHeaderHeight = () => document.documentElement.style.setProperty('--site-header-height', `${siteHeader.getBoundingClientRect().height}px`);
syncHeaderHeight();
new ResizeObserver(syncHeaderHeight).observe(siteHeader);

// Each chapter has its own address while retaining the simple static-site setup.
const chapters = ['home', 'about', 'journalism', 'creative', 'photography', 'internship'];
const portfolioAssetBase = new URL('./assets/', document.baseURI).href;

function recoverPortfolioImage(image) {
  const source = image.getAttribute('src');
  if (!source) return false;
  const url = new URL(source, document.baseURI);
  if (!url.href.startsWith(portfolioAssetBase)) return false;

  if (url.pathname.endsWith('.webp')) {
    const extension = /\/(?:gallery\/previews|tv-posters)\//.test(url.pathname) ? '.jpg' : '.png';
    url.pathname = url.pathname.replace(/\.webp$/, extension);
  } else {
    if (url.searchParams.has('retry') || url.protocol === 'file:') return false;
    url.searchParams.set('retry', '1');
  }
  image.src = url.href;
  return true;
}
document.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement) recoverPortfolioImage(event.target);
}, true);
for (const image of document.images) {
  if (image.complete && image.currentSrc && !image.naturalWidth) recoverPortfolioImage(image);
}

function revealChapterImage(image) {
  if (!image.dataset.chapterSrc) return;
  image.loading = 'eager';
  image.src = image.dataset.chapterSrc;
  delete image.dataset.chapterSrc;
}
const chapterImageObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const { target, isIntersecting } of entries) {
    if (!isIntersecting) continue;
    chapterImageObserver.unobserve(target);
    revealChapterImage(target);
  }
}, { rootMargin: '400px 240px' }) : null;

function loadChapterImages(chapter) {
  for (const image of chapter.querySelectorAll('img[data-chapter-src]')) {
    if (image.loading === 'lazy' && chapterImageObserver) chapterImageObserver.observe(image);
    else revealChapterImage(image);
  }
}
function showChapter() {
  const name = location.hash === '#others' ? 'internship' : location.hash.slice(1);
  const active = chapters.includes(name) ? name : 'home';
  chapters.forEach(id => { document.getElementById(id).hidden = id !== active; });
  loadChapterImages(document.getElementById(active));
  document.querySelectorAll('.site-nav a').forEach(link => {
    if (link.getAttribute('href') === `#${active}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo({top: 0, behavior: 'instant'});
}
window.addEventListener('hashchange', showChapter);
showChapter();

document.querySelectorAll('.about-experience-actions button').forEach(button => {
  const dialog = document.getElementById(button.getAttribute('aria-controls'));
  button.addEventListener('click', () => dialog.showModal());
  window.addEventListener('hashchange', () => { if (dialog.open) dialog.close(); });
});

document.querySelectorAll('.work-filters').forEach(filters => {
  const cards = filters.parentElement.querySelectorAll('.work-card');
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const keys = button.dataset.filter.split(' ');
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && !keys.includes(card.dataset.project); });
  });
});

const projects = {
  schools: {
    kicker: 'Data journalism work · 2026',
    title: 'Schools Disappearing from the Map: Farewells and Migration amid Rural Primary School Closures',
    summary: 'An interactive report on rural school closures, the journeys children make to class, and the families who move to stay close.',
    image: './assets/rural-schools.png',
    alt: 'Illustrated cover of the rural primary school closures project',
    meta: [['Role','Team leader · Editor · Writer · Graphic designer'],['Recognition','Excellence Award, Shanghai Regional Round, the 11th China Data Journalism Competition'],['Format','Interactive data journalism']],
    description: 'Drawing on more than two decades of changes in the number of rural primary schools in China, this data journalism project combines policy documents, public datasets, reported cases, and interview material. It examines how school closures and consolidations affect commuting, transport safety, families relocating to accompany their children, and the reuse of vacant school buildings. Interactive charts present the wider trend while acknowledging inconsistent statistical definitions, regional differences, and missing data.',
    website: 'https://shendigitalnews.framer.website',
    actions: [['Open interactive story ↗','https://shendigitalnews.framer.website']]
  },
  wanping: {
    kicker: 'In-depth reporting · 2025',
    title: 'No. 600, Wanping South Road: Estrangements and Struggles behind the “Wall”',
    summary: 'A patient and a frontline social worker discuss employment, family relationships and social acceptance after a patient’s condition stabilises.',
    image: './assets/wanping.png', alt: 'Cover of the Wanping South Road report',
    meta: [['Role','Team leader · Editor · Reporter'],['Reporting','One patient living with mental illness and one social worker'],['Recognition','Award in Public-Interest Communication, The 5th Campus News Reporting Prizes (non-ranked category)']],
    description: 'The report begins with “No. 600 Wanping South Road”, an address often used jokingly in Shanghai as shorthand for mental illness. Through conversations with one person living with mental illness and one frontline social worker, it examines employment, family relationships, community life, and social acceptance after a patient’s condition has stabilised.',
    article: './assets/wanping-article.jpg',
    articleSize: [1279,41340],
    actions: []
  },
  accessibility: {
    kicker: 'In-depth reporting · 2026',
    title: 'When “Accessibility” Goes Beyond Tactile Paving: How Can We See Each Other Eye to Eye?',
    summary: 'An inclusive dance class offers a closer look at what it takes for disabled and non-disabled participants to dance on equal terms.',
    image: './assets/accessibility-cover.png', alt: 'Cover of the accessibility report',
    meta: [['Role','Reporter · Editor · Writer'],['Format','In-depth reporting']],
    description: 'Using the disability-inclusive dance initiative Embodied Moment (此时舞身) as its entry point, the report observes how disabled and non-disabled participants share a dance class. It then asks whether the venue, access to information, and opportunities for expression are genuinely accessible. The report shows the distance that can remain between being present in the same room and participating on equal terms.',
    article: './assets/accessibility-article.png',
    articleSize: [1290,35146],
    actions: []
  },
  doxxing: {
    kicker: 'Convergence journalism · 2025',
    title: 'Who Doxxed Me?',
    summary: 'An interactive report traces how personal data is collected, traded and circulated online.',
    image: './assets/doxxing-cover.png', alt: 'Who Doxxed Me? cover',
    meta: [['Role','Team leader · Editor · Writer'],['Format','Interactive web page and WeChat version']],
    description: 'The project examines “kaihe”—the Chinese online term for doxxing—alongside personal-data leaks and online abuse. It uses publicly reported cases, a map of the illicit information chain, official notices, published expert commentary, a risk profile, and an interactive quiz to explain how personal information is collected, traded, and circulated. Its interactive webpage and WeChat versions place readers in recognisable situations, helping them identify risks and find practical guidance.',
    article: './assets/doxxing-article.png',
    articleSize: [1290,21783],
    actions: []
  },
  parking: {
    kicker: 'Television news program · 2025',
    title: 'Working Together to Address Disorderly Campus Parking',
    summary: 'A campus news report on disorderly bicycle and e-bike parking, with follow-up coverage of the university’s new management measures.',
    image: './assets/parking-cover.png', alt: 'Campus parking report cover',
    meta: [['Role','Reporter · Video editor']],
    description: 'Haphazard parking of bicycles and e-bikes has long been among the top concerns of students and faculty at the East China University of Political Science and Law (ECUPL). The reporter interviewed campus security and logistics staff alongside cycling students and faculty, and checked parking rules and departmental responsibilities across locations and time slots. One month after those interviews, follow-up reporting found the university had in fact rolled out new management measures.',
    video: {player:'./media/parking/index.html'},
    actions: [['Open video ↗','./media/parking/index.html']]
  },
  dwell: {
    kicker: 'Documentary · 2026',
    title: 'Dwell',
    summary: 'A short documentary follows three residents of a Shanghai co-living community through work, solitude and the routines they share.',
    image: './assets/dwell-poster.png', alt: 'Dwell documentary poster', poster: true,
    meta: [['Role','Director · Producer · Cinematographer · Editor'],['Format','Documentary']],
    description: 'This Chinese micro-documentary focuses on the Dweller co-living community in Shanghai, employing a blend of observational and participatory filmmaking. The film follows three young people at different stages of life—Zhou Shuai, Fufu, and Dagou—as it documents their urban lives and work, their interpersonal bonds and solitude, their construction of belonging, and their journey of self-discovery and spiritual anchoring amidst the noise of the city.',
    video: {player:'https://www.youtube.com/embed/BCmiaGLpcCg?playsinline=1', requiresSiteReferrer: true},
    actions: [['Watch on YouTube ↗','https://youtu.be/BCmiaGLpcCg']]
  },
  choice: {
    kicker: 'Narrative fiction microfilm · 2024',
    title: 'A Moment’s Choice',
    summary: 'A student bonds with a stranger over photography. The short film follows how that connection turns into a scam.',
    image: './assets/moments-choice.jpeg', alt: 'A Moment’s Choice film poster', poster: true,
    meta: [['Role','Director · Producer · Cinematographer · Editor'],['Recognition','First Prize in the Video Category, The 2nd Qinglan Cup Campus New Media Competition on the Rule of Law; Selected for ECUPL’s Feiniao Exhibition.']],
    description: "Adapted from a real scam endured by one of the team members, the film traces a university student's slow entanglement with a stranger. They bond over photography; what starts as innocent conversation quietly evolves into an elaborate trap. The film looks unflinchingly at how trust operates—and how effortlessly it can be turned against us.",
    video: {player:'./media/choice/index.html'},
    actions: [['Open film ↗','./media/choice/index.html']]
  },
  pause: {
    kicker: 'Micro-film advertisement · 2025',
    title: 'Hey, Press Pause',
    summary: 'A short film for POP MART’s Nyota, told through three stories about finding a moment to pause under everyday pressure.',
    image: './assets/press-pause-remaster-20260929.jpg', alt: 'Hey, Press Pause cover',
    meta: [['Role','Director · Cinematographer · Editor'],['Format','Micro-film advertisement']],
    description: 'This short film is written for Nyota, an IP under Pop Mart. Three narrative threads mirror the weight of academia, career, and family. A childhood photograph, a cat, a celebrity, and a parallel universe—these delicate yet profound images together render Nyota an emotional pause. They allow the fragments of life long obscured by constant pressure to resurface, and gently remind us that amid the relentless torrent of daily existence, we all need to stop and rediscover ourselves.',
    video: {player:'./media/pause/index.html?v=20260929-2'},
    actions: [['Open film ↗','./media/pause/index.html?v=20260929-2']]
  },
  shanghai: {
    kicker: 'AI short film · 2026',
    title: 'Shanghai, Inherited and Reimagined',
    summary: 'A 65-second animation traces Shanghai’s history through the buildings Leo encounters on a journey across the city.',
    image: './assets/shanghai-ai.png', alt: 'Shanghai, Inherited and Reimagined poster', poster: true,
    meta: [['Role','Author']],
    description: "This 65-second vertical animation follows a young man named Leo as he travels through Shanghai's Yuyuan Garden, Shikumen neighborhoods, Saint John's University, the Bund, and Lujiazui. As scenes shift, architecture becomes the backbone of the narrative—linking the city's Jiangnan cultural roots, its modern history of cross-cultural encounter, and the creative energy of its contemporary urban landscape. Against the reductive international portrayal of Shanghai as merely a financial hub with a futuristic skyline, I choose architecture as the visual entry point for cultural expression, letting the spaces speak for themselves, free from extra layers of cultural translation.",
    video: {player:'./media/shanghai/index.html',portrait:true},
    actions: [['Open film ↗','./media/shanghai/index.html']]
  }
};

const projectDialog = document.querySelector('#project-dialog');
const projectOverview = projectDialog.querySelector('.dialog-overview');
const projectHero = document.querySelector('#dialog-hero');
const projectMeta = document.querySelector('#dialog-meta');
const projectDescription = projectOverview.querySelector('.dialog-description');
const projectProse = projectDescription.querySelector('.dialog-prose');
const projectActions = document.querySelector('#dialog-actions');
const projectWork = document.querySelector('#dialog-work');
const projectKeys = Object.keys(projects);
let activeProjectKey = projectKeys[0];

function layoutProjectDescription() {
  if (!projectDialog.open) return;
  const cover = projectHero.getBoundingClientRect();
  const facts = projectMeta.getBoundingClientRect();
  const besideCover = 'description-beside-cover';
  if (facts.left <= cover.right || facts.height >= cover.height) {
    projectOverview.classList.remove(besideCover);
    return;
  }

  // Measure the full text at its sidebar width, including its heading and spacing.
  projectOverview.classList.add(besideCover);
  projectOverview.classList.toggle(besideCover, projectDescription.getBoundingClientRect().bottom <= cover.bottom + 1);
}

const projectLayoutObserver = new ResizeObserver(layoutProjectDescription);
for (const element of [projectDialog, projectHero, projectMeta]) projectLayoutObserver.observe(element);
document.fonts.ready.then(layoutProjectDescription);

document.querySelectorAll('.work-card').forEach(card => {
  const { project: key } = card.dataset;
  const project = projects[key];
  const info = card.querySelector('.work-info');
  const title = info.querySelector('strong');
  title.id = `work-title-${key}`;
  card.setAttribute('aria-labelledby', title.id);
  card.setAttribute('aria-haspopup', 'dialog');

  const role = document.createElement('span');
  role.className = 'work-role';
  role.textContent = project.meta.find(([label]) => label === 'Role')[1];
  const summary = document.createElement('span');
  summary.className = 'work-summary';
  summary.textContent = project.summary;
  info.append(role, summary);
});

function addProjectFact(label, value) {
  const row = document.createElement('div');
  row.className = 'dialog-fact';
  const dt = document.createElement('dt');
  const dd = document.createElement('dd');
  dt.textContent = label;
  dd.textContent = value;
  row.append(dt, dd);
  projectMeta.append(row);
}

function stopProjectMedia() {
  projectWork.replaceChildren();
}

function openProject(key) {
  const project = projects[key];
  if (!project) return;
  activeProjectKey = key;
  document.querySelector('#project-counter').textContent = `${String(projectKeys.indexOf(key) + 1).padStart(2, '0')} / ${String(projectKeys.length).padStart(2, '0')}`;
  stopProjectMedia();
  projectHero.classList.toggle('poster', !!project.poster);
  projectHero.replaceChildren();
  const heroImage = document.createElement('img');
  heroImage.src = project.image;
  heroImage.alt = project.alt;
  projectHero.append(heroImage);
  document.querySelector('#dialog-title').textContent = project.title;
  projectMeta.replaceChildren();
  const [workType, year = ''] = project.kicker.split('·').map(part => part.trim());
  const role = project.meta.find(([label]) => label === 'Role')?.[1];
  addProjectFact('Date', year);
  addProjectFact('Work type', workType);
  if (role) addProjectFact('My role', role);
  for (const [label, value] of project.meta) {
    if (label !== 'Role' && !(label === 'Format' && value.toLowerCase() === workType.toLowerCase())) addProjectFact(label, value);
  }
  projectProse.textContent = project.description;
  projectActions.replaceChildren();
  for (const [label, href] of project.actions) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    projectActions.append(a);
  }
  projectActions.hidden = project.actions.length === 0;
  projectWork.classList.toggle('is-portrait', !!project.video?.portrait);
  projectWork.classList.toggle('is-video', !!project.video);
  let previewTitle = 'Selected still';
  if (project.article) {
    previewTitle = 'Read the full report';
    const image = document.createElement('img');
    image.src = project.article;
    image.alt = `Full-length article image for ${project.title}`;
    // Reserve the full article height so lazy loading never changes the scroll range.
    [image.width, image.height] = project.articleSize;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.className = 'dialog-long-image';
    projectWork.append(image);
  } else if (project.website) {
    previewTitle = 'Explore the interactive story';
    const frame = document.createElement('iframe');
    frame.src = project.website;
    frame.title = `${project.title} interactive story`;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    projectWork.append(frame);
  } else if (project.video) {
    previewTitle = 'Watch the film';
    // A local file cannot send the site referrer required by the YouTube embed.
    if (!project.video.requiresSiteReferrer || location.protocol !== 'file:') {
      const frame = document.createElement('iframe');
      frame.src = project.video.player;
      frame.title = `${project.title} video player`;
      frame.loading = 'lazy';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allow = 'encrypted-media; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      projectWork.append(frame);
    }
  } else if (project.still) {
    const image = document.createElement('img');
    image.src = project.still;
    image.alt = `${project.title} film still`;
    image.className = 'dialog-film-still';
    projectWork.append(image);
  }
  const previewHeading = document.querySelector('#dialog-preview-title');
  previewHeading.textContent = project.website ? '' : previewTitle;
  previewHeading.hidden = !!project.website;
  if (!projectDialog.open) projectDialog.showModal();
  layoutProjectDescription();
  projectDialog.scrollTop = 0;
}

const reelTrack = document.querySelector('.reel-track');
const reelToggle = document.querySelector('.reel-toggle');
const reelScreen = document.querySelector('.opening-reel');
const reelStatic = reelScreen.querySelector('.reel-static');
const reelStaticContext = reelStatic.getContext('2d');
const reelNoise = reelStaticContext?.createImageData(reelStatic.width, reelStatic.height);
const reelSlides = [...reelTrack.children];
const homeChapter = document.getElementById('home');
const reelReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let queuedReelIndex = 0;
let reelTransitionFrame;
let reelImagePending;
let reelPaused = reelReducedMotion.matches;
function syncReelToggle() {
  const label = reelPaused ? 'Resume preview' : 'Pause preview';
  reelToggle.setAttribute('aria-pressed', String(reelPaused));
  reelToggle.setAttribute('aria-label', label);
  reelToggle.title = label;
}
function renderReelSlide(index) {
  window.cancelAnimationFrame(reelTransitionFrame);
  reelSlides.forEach((slide, i) => { slide.hidden = i !== index; });
  const current = projects[reelSlides[index].dataset.project];
  document.querySelector('#channel-number').textContent = `CH ${String(index + 1).padStart(2, '0')} / ${String(reelSlides.length).padStart(2, '0')}`;
  document.querySelector('#channel-title').textContent = current.title;
  reelScreen.classList.remove('is-changing');
}
function paintReelStatic(progress) {
  const { width, height, data } = reelNoise;
  // The interference band rolls through the visible area of the CRT.
  const bandCenter = height * (.12 + .76 * progress);
  let offset = 0;
  for (let row = 0; row < height; row++) {
    const band = Math.max(0, 1 - Math.abs(row - bandCenter) / 12);
    const base = 104 + (Math.random() - .5) * 28 + band * 38;
    const spread = 126 + band * 28;
    for (let column = 0; column < width; column++) {
      const shade = base + (Math.random() - .5) * spread;
      data[offset++] = shade;
      data[offset++] = shade;
      data[offset++] = shade;
      data[offset++] = 255;
    }
  }
  reelStaticContext.putImageData(reelNoise, 0, 0);
}
async function decodePortfolioImage(image) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const source = image.src;
    try {
      await image.decode();
      return true;
    } catch {
      if (image.src === source && !recoverPortfolioImage(image)) return false;
    }
  }
  return false;
}
function requestReelImage(index, priority) {
  const image = reelSlides[index].querySelector('img');
  image.fetchPriority = priority;
  if (image.dataset.src) {
    image.src = image.dataset.src;
    delete image.dataset.src;
  }
  return image;
}
function preloadNextReelSlide(index) {
  if (!reelPaused && !homeChapter.hidden && !document.hidden) {
    requestReelImage((index + 1) % reelSlides.length, 'low');
  }
}
async function showReelSlide(index) {
  const target = (index + reelSlides.length) % reelSlides.length;
  queuedReelIndex = target;
  window.cancelAnimationFrame(reelTransitionFrame);
  reelScreen.classList.remove('is-changing');
  const pending = decodePortfolioImage(requestReelImage(target, 'auto'));
  reelImagePending = pending;
  const ready = await pending;
  if (reelImagePending !== pending) return;
  reelImagePending = null;
  if (!ready || homeChapter.hidden) return;

  function finishSwitch() {
    renderReelSlide(target);
    preloadNextReelSlide(target);
  }
  if (reelReducedMotion.matches || !reelNoise) {
    finishSwitch();
    return;
  }

  const duration = 240;
  const framePeriod = 1000 / 24;
  const start = performance.now();
  let lastPaint = start;
  function animateStatic(now) {
    const elapsed = now - start;
    if (elapsed >= duration) {
      finishSwitch();
      return;
    }
    if (now - lastPaint >= framePeriod) {
      paintReelStatic(elapsed / duration);
      lastPaint = now - (now - lastPaint) % framePeriod;
    }
    reelTransitionFrame = window.requestAnimationFrame(animateStatic);
  }

  paintReelStatic(0);
  reelScreen.classList.add('is-changing');
  reelTransitionFrame = window.requestAnimationFrame(animateStatic);
}
renderReelSlide(0);
syncReelToggle();
reelToggle.addEventListener('click', () => {
  reelPaused = !reelPaused;
  syncReelToggle();
  preloadNextReelSlide(queuedReelIndex);
});
reelReducedMotion.addEventListener('change', ({ matches }) => {
  if (!matches) return;
  reelPaused = true;
  syncReelToggle();
  if (!reelImagePending && reelScreen.classList.contains('is-changing')) renderReelSlide(queuedReelIndex);
});
document.querySelector('.reel-prev').addEventListener('click', () => showReelSlide(queuedReelIndex - 1));
document.querySelector('.reel-next').addEventListener('click', () => showReelSlide(queuedReelIndex + 1));

async function playTvIntro() {
  const intro = document.querySelector('#site-intro');
  const destination = reelScreen.closest('.tv-visual');
  if (reelReducedMotion.matches || homeChapter.hidden || document.hidden || !intro.showModal || !destination.animate) return;

  const introTv = intro.querySelector('.intro-tv');
  const introBody = introTv.querySelector('.tv-body');
  const cover = reelSlides[0].querySelector('img').cloneNode();
  cover.loading = 'eager';
  introBody.src = destination.querySelector('.tv-body').src;
  intro.querySelector('.intro-cover').append(cover);
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  const close = () => { if (intro.open) intro.close(); };
  const delay = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));
  let movement;

  intro.showModal();
  try {
    window.addEventListener('hashchange', close, options);
    window.addEventListener('pagehide', close, options);
    reelReducedMotion.addEventListener('change', close, options);
    window.addEventListener('resize', () => { if (movement) close(); }, options);
    const closed = new Promise(resolve => intro.addEventListener('close', resolve, options));
    const loaded = Promise.race([
      Promise.allSettled([decodePortfolioImage(introBody), decodePortfolioImage(cover), delay(1050)]),
      delay(1850)
    ]);
    const settled = loaded.then(async () => {
      if (!intro.open) return;
      const start = introTv.getBoundingClientRect();
      const end = destination.getBoundingClientRect();
      if (!end.width || !start.width) return;

      if (cover.naturalWidth) intro.classList.add('is-tuned');
      intro.classList.add('is-settling');
      movement = introTv.animate([
        { transform: 'none' },
        { transform: `translate(${end.left - start.left}px, ${end.top - start.top}px) scale(${end.width / start.width})` }
      ], { duration: 820, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
      await movement.finished;
    });
    await Promise.race([closed, settled]);
  } finally {
    close();
    movement?.cancel();
    listeners.abort();
  }
}

function startReelTimer() {
  preloadNextReelSlide(queuedReelIndex);
  window.setInterval(() => {
    if (!reelImagePending && !reelPaused && !document.hidden && !homeChapter.hidden && !projectDialog.open && !reelScreen.matches(':hover') && !reelScreen.matches(':focus-within')) showReelSlide(queuedReelIndex + 1);
  }, 2800);
}
playTvIntro().then(startReelTimer, startReelTimer);

document.querySelectorAll('.project-trigger').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
document.querySelector('#project-prev').addEventListener('click', () => openProject(projectKeys[(projectKeys.indexOf(activeProjectKey) + projectKeys.length - 1) % projectKeys.length]));
document.querySelector('#project-next').addEventListener('click', () => openProject(projectKeys[(projectKeys.indexOf(activeProjectKey) + 1) % projectKeys.length]));
projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
function isProjectBackdropPoint(event) {
  if (event.target !== projectDialog) return false;
  const bounds = projectDialog.getBoundingClientRect();
  return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
}
let projectBackdropPress = false;
projectDialog.addEventListener('pointerdown', event => { projectBackdropPress = isProjectBackdropPoint(event); });
projectDialog.addEventListener('click', event => {
  if (projectBackdropPress && isProjectBackdropPoint(event)) projectDialog.close();
  projectBackdropPress = false;
});
projectDialog.addEventListener('pointercancel', () => { projectBackdropPress = false; });
projectDialog.addEventListener('close', stopProjectMedia);

const photography = [
  ...[
    [1024,683], [1024,683], [683,1024], [1024,683],
    [1024,683], [683,1024], [1024,683], [683,1024],
    [683,1024], [1024,684], [684,1024], [684,1024],
    [768,1024], [576,1024], [683,1024], [576,1024],
    [768,1024], [1024,683], [682,1024], [1024,682],
    [683,1024], [1024,439], [683,1024], [683,1024]
  ].map(([width,height],i) => ({src:`./assets/gallery/photo-${String(i+1).padStart(2,'0')}.jpg`,width,height})),
  ...[
    [25,4672,7008,'Close-up of a bearded stone sculpture against a dark background'],
    [26,4672,7008,'Stone torso sculpture against a deep red wall'],
    [27,4568,6852,'Harbour buildings and boats framed by a window and a passenger silhouette'],
    [28,5781,3854,'Illuminated city buildings and a busy street at night'],
    [29,4032,6048,'Two people standing together at a fence beneath a wide blue sky'],
    [30,6206,4137,'Visitors silhouetted against a large aquarium tank'],
    [31,7008,4672,'Palm tree beside a bright yellow storefront in warm sunlight'],
    [32,4339,6509,'Two people walking towards a pavilion on a grassy hillside'],
    [33,4067,6101,'Orange and white building facade lit by warm afternoon light'],
    [34,3740,5610,'Red taxi passing a white building with repeating windows and arches'],
    [35,4443,6664,'A tabby cat walking beside a shop sign'],
    [36,4096,1754,'Pale spring blossoms framed by a dark window and patterned railing']
  ].map(([number,width,height,alt]) => ({src:`./assets/gallery/photo-${number}.jpg`,width,height,alt}))
];
// Warm street colour gives way to shadow, cool daylight, then pale blossoms.
// Keep source filenames stable; this one sequence drives both tiles and viewer.
const photographyOrder = [
  34, 31, 33, 6, 2, 13, 5, 23, 25, 26, 11, 10,
  12, 27, 8, 3, 28, 30, 18, 9, 15, 29, 32, 4,
  1, 24, 35, 7, 14, 17, 16, 19, 20, 21, 22, 36
];
// News interviews first, the reported feature next, then the two TVCs.
const internshipPrograms = [
  [3, '欧阳奋强', 'https://www.thepaper.cn/newsDetail_forward_32788899'],
  [5, '柳大华', 'https://www.thepaper.cn/newsDetail_forward_33036593'],
  [7, '丁俊辉', 'https://www.thepaper.cn/newsDetail_forward_33335354'],
  [8, '许纪霖', 'https://m.thepaper.cn/newsDetail_forward_33044587'],
  [1, '邓亚萍', 'https://www.thepaper.cn/newsDetail_forward_33107850'],
  [6, '孤独堡垒', 'https://m.thepaper.cn/newsDetail_forward_33205440'],
  [2, '麻得很', 'https://weixin.qq.com/sph/ACVLSvtLeK'],
  [4, '天弘基金走进产业', 'https://weixin.qq.com/sph/AHfnU8sLHZ']
];
const gallery = {
  internship: internshipPrograms.map(([number,title,href],i) => ({src:`./assets/gallery/internship-${String(number).padStart(2,'0')}.jpg`, title, href, alt:title, caption:`Internship Project · ${String(i+1).padStart(2,'0')}/08`})),
  photo: photographyOrder.map((number,i) => ({
    ...photography[number-1],
    preview:`./assets/gallery/previews/photo-${String(number).padStart(2,'0')}.webp`,
    caption:`Photographic Works · ${String(i+1).padStart(2,'0')}/${photography.length}`
  }))
};
const galleryDialog = document.querySelector('#gallery-dialog');
const galleryImage = document.querySelector('#gallery-image');
const galleryZoom = galleryDialog.querySelector('.gallery-zoom');
let galleryKind = 'photo';
let galleryIndex = 0;
function resetGalleryZoom() {
  galleryDialog.classList.remove('is-zoomed');
  galleryZoom.setAttribute('aria-pressed', 'false');
  galleryZoom.setAttribute('aria-label', 'Zoom image to actual size');
  galleryDialog.scrollTop = 0;
  galleryDialog.scrollLeft = 0;
}
function toggleGalleryZoom() {
  const zoomed = galleryDialog.classList.toggle('is-zoomed');
  const item = gallery[galleryKind][galleryIndex];
  galleryImage.src = zoomed ? item.src : item.preview || item.src;
  galleryZoom.setAttribute('aria-pressed', String(zoomed));
  galleryZoom.setAttribute('aria-label', zoomed ? 'Fit image to viewer' : 'Zoom image to actual size');
  galleryDialog.scrollTop = 0;
  galleryDialog.scrollLeft = 0;
}
function showGalleryImage() {
  const item = gallery[galleryKind][galleryIndex];
  galleryImage.src = item.preview || item.src;
  galleryImage.alt = item.alt || item.caption;
  document.querySelector('#gallery-caption').textContent = item.caption;
}
function openGallery(kind, index) {
  galleryKind = kind;
  galleryIndex = index;
  resetGalleryZoom();
  showGalleryImage();
  galleryDialog.showModal();
}
function moveGallery(delta) {
  galleryIndex = (galleryIndex + delta + gallery[galleryKind].length) % gallery[galleryKind].length;
  resetGalleryZoom();
  showGalleryImage();
}
for (const [kind, containerId] of [['internship','internship-grid'],['photo','photo-grid']]) {
  const container = document.getElementById(containerId);
  gallery[kind].forEach((item, index) => {
    const tile = document.createElement(item.href ? 'a' : 'button');
    tile.className = 'gallery-tile';
    if (item.href) {
      tile.href = item.href;
      tile.target = '_blank';
      tile.rel = 'noopener noreferrer';
      tile.setAttribute('aria-label', `View ${item.title} (opens in a new tab)`);
    } else {
      tile.type = 'button';
      tile.setAttribute('aria-label', `View ${item.caption}`);
      tile.addEventListener('click', () => openGallery(kind, index));
    }
    if (kind === 'internship' && item.src.endsWith('internship-04.jpg')) tile.classList.add('landscape');
    const image = document.createElement('img');
    image.alt = item.alt || item.caption;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.dataset.chapterSrc = item.preview || item.src;
    if (item.width && item.height) {
      image.width = item.width;
      image.height = item.height;
    }
    tile.append(image);
    container.append(tile);
  });
  const chapter = container.closest('section');
  if (!chapter.hidden) loadChapterImages(chapter);
}

// Justified rows preserve the left-to-right sequence and every image's full frame.
const photoGrid = document.querySelector('#photo-grid');
const photoTiles = [...photoGrid.children];
const photoRatios = gallery.photo.map(({ width, height }) => width / height);
let photoLayoutWidth = 0;
let photoLayoutGap = -1;
function layoutPhotography() {
  const width = photoGrid.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(photoGrid).rowGap) || 0;
  if (!width || (Math.abs(width - photoLayoutWidth) < .5 && gap === photoLayoutGap)) return;
  photoLayoutWidth = width;
  photoLayoutGap = gap;
  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = getComputedStyle(photoTiles[0]);
  const frameWidth = parseFloat(paddingLeft) + parseFloat(paddingRight);
  const frameHeight = parseFloat(paddingTop) + parseFloat(paddingBottom);
  const targetImageHeight = (width <= 450 ? 220 : width <= 850 ? 300 : 340) - frameHeight;
  const rows = [];
  const fitHeight = (count, ratio) => (width - gap * (count - 1) - frameWidth * count) / ratio;
  let index = 0;
  while (index < photoTiles.length) {
    const start = index;
    let ratio = 0;
    while (index < photoTiles.length) {
      const nextRatio = ratio + photoRatios[index];
      const rowCount = index - start;
      const nextHeight = fitHeight(rowCount + 1, nextRatio);
      if (rowCount && nextHeight <= targetImageHeight) {
        const currentHeight = fitHeight(rowCount, ratio);
        if (Math.abs(currentHeight - targetImageHeight) < Math.abs(nextHeight - targetImageHeight)) break;
      }
      ratio = nextRatio;
      index++;
      if (nextHeight <= targetImageHeight) break;
    }
    const row = document.createElement('div');
    row.className = 'photo-row';
    const imageHeight = fitHeight(index - start, ratio);
    row.style.height = `${imageHeight + frameHeight}px`;
    for (let i = start; i < index; i++) {
      photoTiles[i].style.flexBasis = `${imageHeight * photoRatios[i] + frameWidth}px`;
      row.append(photoTiles[i]);
    }
    rows.push(row);
  }
  photoGrid.replaceChildren(...rows);
}
layoutPhotography();
new ResizeObserver(() => requestAnimationFrame(layoutPhotography)).observe(photoGrid);

const internshipRail = document.querySelector('#internship-grid');
const internshipCards = [...internshipRail.children];
internshipCards.forEach(card => {
  const copy = card.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  copy.tabIndex = -1;
  internshipRail.append(copy);
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let internshipVisible = false;
let internshipFrame = 0;
let internshipLastFrame = 0;
let internshipTouching = false;
let internshipTouchTimer = 0;

function internshipShouldMove() {
  return internshipVisible && !document.hidden && !reducedMotion.matches && !galleryDialog.open &&
    !internshipTouching && !internshipRail.matches(':hover') &&
    !internshipRail.contains(document.activeElement);
}
function stopInternshipReel() {
  if (internshipFrame) cancelAnimationFrame(internshipFrame);
  internshipFrame = 0;
  internshipLastFrame = 0;
}
function moveInternshipReel(time) {
  internshipFrame = 0;
  if (!internshipShouldMove()) return;
  if (internshipLastFrame) internshipRail.scrollLeft += Math.min(time - internshipLastFrame, 50) * .035;
  internshipLastFrame = time;
  const repeatStart = internshipRail.children[internshipCards.length].offsetLeft - internshipCards[0].offsetLeft;
  if (repeatStart > 0 && internshipRail.scrollLeft >= repeatStart) internshipRail.scrollLeft -= repeatStart;
  internshipFrame = requestAnimationFrame(moveInternshipReel);
}
function startInternshipReel() {
  if (!internshipFrame && internshipShouldMove()) internshipFrame = requestAnimationFrame(moveInternshipReel);
}
new IntersectionObserver(entries => {
  internshipVisible = entries[0].isIntersecting;
  if (internshipVisible) startInternshipReel();
  else stopInternshipReel();
}, {threshold:.1}).observe(internshipRail);
internshipRail.addEventListener('pointerenter', stopInternshipReel);
internshipRail.addEventListener('pointerleave', startInternshipReel);
internshipRail.addEventListener('focusin', stopInternshipReel);
internshipRail.addEventListener('focusout', () => setTimeout(startInternshipReel, 0));
internshipRail.addEventListener('touchstart', () => {
  internshipTouching = true;
  clearTimeout(internshipTouchTimer);
  stopInternshipReel();
}, {passive:true});
internshipRail.addEventListener('touchend', () => {
  internshipTouchTimer = setTimeout(() => { internshipTouching = false; startInternshipReel(); }, 3000);
}, {passive:true});
document.addEventListener('visibilitychange', () => document.hidden ? stopInternshipReel() : startInternshipReel());
reducedMotion.addEventListener('change', () => reducedMotion.matches ? stopInternshipReel() : startInternshipReel());
galleryDialog.addEventListener('close', startInternshipReel);
galleryZoom.addEventListener('click', toggleGalleryZoom);
document.querySelector('#gallery-image').addEventListener('click', toggleGalleryZoom);
galleryDialog.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
galleryDialog.querySelector('.gallery-prev').addEventListener('click', () => moveGallery(-1));
galleryDialog.querySelector('.gallery-next').addEventListener('click', () => moveGallery(1));
galleryDialog.addEventListener('click', event => { if (event.target === galleryDialog) galleryDialog.close(); });
document.addEventListener('keydown', event => {
  if (!galleryDialog.open) return;
  if (event.key === 'ArrowLeft') moveGallery(-1);
  if (event.key === 'ArrowRight') moveGallery(1);
});
