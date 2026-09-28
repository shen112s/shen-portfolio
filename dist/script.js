const siteHeader = document.querySelector('.site-header');
const syncHeaderHeight = () => document.documentElement.style.setProperty('--site-header-height', `${siteHeader.getBoundingClientRect().height}px`);
syncHeaderHeight();
new ResizeObserver(syncHeaderHeight).observe(siteHeader);

const projects = {
  schools: {
    kicker: 'Data journalism work · 2026',
    title: 'Schools Disappearing from the Map: Farewells and Migration amid Rural Primary School Closures',
    deck: 'What changes when a village school disappears from the map?',
    image: './assets/rural-schools.png',
    alt: 'Illustrated cover of the rural primary school closures project',
    meta: [['Role','Team leader · Editor · Writer · Graphic designer'],['Recognition','Excellence Award, Shanghai Division, 11th China Data Journalism Competition'],['Format','Interactive data journalism']],
    story: [['The work','The project follows more than two decades of changes to rural primary schools. It brings together policy documents, public datasets, reported cases and interview materials to examine commuting, safety, relocation and vacant school buildings.'],['The data','Interactive charts make the changes visible while retaining important limits: inconsistent definitions across years and regions, as well as missing data.']],
    website: 'https://shendigitalnews.framer.website',
    actions: [['Open interactive story ↗','https://shendigitalnews.framer.website'],['View original portfolio page ↗','https://shensportfolio.framer.website/journalism-projects/project-1']]
  },
  wanping: {
    kicker: 'In-depth reporting · 2025',
    title: 'No. 600, Wanping South Road: Estrangements and Struggles behind the “Wall”',
    deck: 'An address often used as a joke becomes a starting point for reporting on mental illness and social acceptance.',
    image: './assets/wanping.png', alt: 'Cover of the Wanping South Road report',
    meta: [['Role','Team leader · Editor · Reporter'],['Reporting','One patient living with mental illness and one social worker'],['Recognition','Award in Public-Interest Communication, Fifth College Campus Media Competition (non-ranked category)']],
    story: [['The work','The report looks at employment, family relationships and community life through the experiences of one patient and one social worker. Their accounts complicate the shorthand often attached to the hospital address.']],
    article: './assets/wanping-article.jpg',
    actions: [['View original portfolio page ↗','https://shensportfolio.framer.website/journalism-projects/project-2']]
  },
  accessibility: {
    kicker: 'In-depth reporting · 2026',
    title: 'When “Accessibility” Goes Beyond Tactile Paving: How Can We See Each Other Eye to Eye?',
    deck: 'A report on participation, expression and access through disabled and non-disabled dance.',
    image: './assets/accessibility-cover.png', alt: 'Cover of the accessibility report',
    meta: [['Role','Reporter · Editor · Writer'],['Subject','Embodied Moment (此时舞身)'],['Format','In-depth reporting']],
    story: [['The work','The report follows Embodied Moment, a dance practice involving disabled and non-disabled people. It considers access to venues and information alongside the less visible question of who has room to express themselves.'],['The question','Sharing a room does not automatically mean participating on equal terms. The story stays with that gap.']],
    article: './assets/accessibility-article.png',
    actions: [['View original portfolio page ↗','https://shensportfolio.framer.website/journalism-projects/project-3']]
  },
  doxxing: {
    kicker: 'Convergence journalism · 2025',
    title: 'Who Doxxed Me?',
    deck: 'An interactive look at doxxing, personal-data leaks and online abuse in China.',
    image: './assets/doxxing-cover.png', alt: 'Who Doxxed Me? cover',
    meta: [['Role','Team leader · Editor · Writer'],['Format','Interactive web page and WeChat version'],['Subject','“Kaihe” doxxing and personal-data risks']],
    story: [['The work','The team combined public cases, official notices and expert commentary to trace how personal information moves through an illicit chain and becomes a tool of harassment.'],['The experience','An information-chain map, risk profile and interactive quiz turn the reporting into a navigable experience.']],
    article: './assets/doxxing-article.png',
    actions: [['View original portfolio page ↗','https://shensportfolio.framer.website/journalism-projects/project-4']]
  },
  parking: {
    kicker: 'Television news program · 2025',
    title: 'Working Together to Address Disorderly Campus Parking',
    deck: 'A campus news report following the everyday effects of disorderly bicycle parking.',
    image: './assets/parking-cover.png', alt: 'Campus parking report cover',
    meta: [['Role','Reporter · Video editor'],['Reporting','Campus security and logistics staff, cycling students and faculty'],['Format','Television news']],
    story: [['The work','The report checks existing parking rules and responsibilities against what students, faculty and campus staff experience on the ground.'],['Follow-up','A return visit one month later found new measures in place.']],
    video: {player:'./media/parking/index.html'},
    actions: [['Open video ↗','./media/parking/index.html'],['View original portfolio page ↗','https://shensportfolio.framer.website/journalism-projects/project-5']]
  },
  dwell: {
    kicker: 'Documentary · 2026',
    title: 'Dwell',
    deck: 'Three people, one Shanghai co-living community, and different ways of living with the city.',
    image: './assets/dwell-poster.png', alt: 'Dwell documentary poster', poster: true,
    meta: [['Role','Director · Producer · Cinematographer · Editor'],['Subjects','Zhou Shuai · Fufu · Dagou'],['Format','Documentary']],
    story: [['The work','This Chinese micro-documentary follows three people in a Shanghai shared-living community. Observational and participatory filming brings their work, relationships and everyday routines into the frame.'],['The question','What does it mean to find a place to live—and a sense of belonging—while the city keeps changing around you?']],
    video: {player:'./media/dwell/index.html'},
    actions: [['Open film ↗','./media/dwell/index.html'],['View original portfolio page ↗','https://shensportfolio.framer.website/creative-media-projects/project-6']]
  },
  choice: {
    kicker: 'Narrative fiction microfilm · 2024',
    title: 'A Moment’s Choice',
    deck: 'A fiction short based on a team member’s experience of a scam.',
    image: './assets/moments-choice.jpeg', alt: 'A Moment’s Choice film poster', poster: true,
    meta: [['Role','Director · Producer · Cinematographer · Editor'],['Recognition','First Prize, video category, Second Qinglan Cup Campus Media Legal Works Competition'],['Selection','ECUPL Feiniao Exhibition']],
    story: [['The work','A university student meets someone through a shared interest in photography. The story follows how connection and trust can be manipulated.'],['The approach','The film adapts a real experience from the team into narrative fiction rather than presenting it as a direct record.']],
    video: {player:'./media/choice/index.html'},
    actions: [['Open film ↗','./media/choice/index.html'],['View original portfolio page ↗','https://shensportfolio.framer.website/creative-media-projects/project-7']]
  },
  pause: {
    kicker: 'Micro-film advertisement · 2025',
    title: 'Hey, Press Pause',
    deck: 'A short film for Nyota under Pop Mart, built around moments of pressure and pause.',
    image: './assets/press-pause.jpg', alt: 'Hey, Press Pause film still',
    meta: [['Role','Director · Cinematographer · Editor'],['Brand','Nyota under Pop Mart'],['Format','Micro-film advertisement']],
    story: [['The work','Three stories touch on academia, career and family. A childhood photograph, a cat, a celebrity and a parallel universe become small interruptions to everyday pressure.']],
    still: './assets/press-pause.jpg',
    actions: [['View original portfolio page ↗','https://shensportfolio.framer.website/creative-media-projects/project-8']]
  },
  shanghai: {
    kicker: 'AI short film · 2026',
    title: 'Shanghai, Inherited and Reimagined',
    deck: 'A 65-second vertical animation linking Shanghai’s architectural past and present.',
    image: './assets/shanghai-ai.png', alt: 'Shanghai, Inherited and Reimagined poster', poster: true,
    meta: [['Role','Author'],['Format','65-second vertical animation'],['Places','Yuyuan · Shikumen · St John’s University · the Bund · Lujiazui']],
    story: [['The work','Leo travels through five places in Shanghai. Architecture connects Jiangnan roots, cross-cultural modern history and the contemporary city.']],
    video: {player:'./media/shanghai/index.html',portrait:true},
    actions: [['Open film ↗','./media/shanghai/index.html'],['View original portfolio page ↗','https://shensportfolio.framer.website/creative-media-projects/project-9']]
  }
};

const projectDialog = document.querySelector('#project-dialog');
const projectHero = document.querySelector('#dialog-hero');
const projectMeta = document.querySelector('#dialog-meta');
const projectStory = document.querySelector('#dialog-story');
const projectActions = document.querySelector('#dialog-actions');
const projectWork = document.querySelector('#dialog-work');

function addProjectFact(label, value, className = '') {
  const row = document.createElement('div');
  row.className = `dialog-fact ${className}`.trim();
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
  stopProjectMedia();
  projectHero.classList.toggle('poster', !!project.poster);
  projectHero.replaceChildren();
  const heroImage = document.createElement('img');
  heroImage.src = project.image;
  heroImage.alt = project.alt;
  projectHero.append(heroImage);
  document.querySelector('#dialog-kicker').textContent = `${String(Object.keys(projects).indexOf(key) + 1).padStart(2, '0')} / SELECTED WORK`;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-deck').textContent = project.deck;
  projectMeta.replaceChildren();
  const [workType, year = ''] = project.kicker.split('·').map(part => part.trim());
  const role = project.meta.find(([label]) => label === 'Role')?.[1];
  addProjectFact('Date', year);
  addProjectFact('Work type', workType);
  if (role) addProjectFact('My role', role);
  for (const [label, value] of project.meta) {
    if (label !== 'Role' && !(label === 'Format' && value.toLowerCase() === workType.toLowerCase())) addProjectFact(label, value);
  }
  addProjectFact('Project description', project.story[0]?.[1] || project.deck, 'dialog-fact-description');
  projectStory.replaceChildren();
  for (const [heading, copy] of project.story.slice(1)) {
    const section = document.createElement('section');
    const h = document.createElement('h3');
    const p = document.createElement('p');
    h.textContent = heading;
    p.textContent = copy;
    section.append(h, p);
    projectStory.append(section);
  }
  projectActions.replaceChildren();
  for (const [label, href] of project.actions) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    projectActions.append(a);
  }
  projectWork.classList.toggle('is-portrait', !!project.video?.portrait);
  projectWork.classList.toggle('is-video', !!project.video);
  let previewTitle = 'Selected still';
  if (project.article) {
    previewTitle = 'Read the full report';
    const image = document.createElement('img');
    image.src = project.article;
    image.alt = `Full-length article image for ${project.title}`;
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
    const frame = document.createElement('iframe');
    frame.src = project.video.player;
    frame.title = `${project.title} video player`;
    frame.loading = 'lazy';
    frame.allow = 'fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    projectWork.append(frame);
  } else if (project.still) {
    const image = document.createElement('img');
    image.src = project.still;
    image.alt = `${project.title} film still`;
    image.className = 'dialog-film-still';
    projectWork.append(image);
  }
  document.querySelector('#dialog-preview-title').textContent = previewTitle;
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}

document.querySelectorAll('.project-trigger').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => { if (event.target === projectDialog) projectDialog.close(); });
projectDialog.addEventListener('close', stopProjectMedia);

const gallery = {
  internship: [2,3,4,5,6,7,8,1].map((n,i) => ({src:`./assets/gallery/internship-${String(n).padStart(2,'0')}.jpg`, caption:`Internship programs · ${String(i+1).padStart(2,'0')}/08`})),
  photo: Array.from({length:24}, (_,i) => ({src:`./assets/gallery/photo-${String(i+1).padStart(2,'0')}.jpg`, caption:`Recent photography · ${String(i+1).padStart(2,'0')}/24`}))
};
const galleryDialog = document.querySelector('#gallery-dialog');
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
  galleryZoom.setAttribute('aria-pressed', String(zoomed));
  galleryZoom.setAttribute('aria-label', zoomed ? 'Fit image to viewer' : 'Zoom image to actual size');
  galleryDialog.scrollTop = 0;
  galleryDialog.scrollLeft = 0;
}
function showGalleryImage() {
  const item = gallery[galleryKind][galleryIndex];
  const image = document.querySelector('#gallery-image');
  image.src = item.src;
  image.alt = item.caption;
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
    const button = document.createElement('button');
    button.className = 'gallery-tile';
    button.type = 'button';
    button.setAttribute('aria-label', `View ${item.caption}`);
    if (kind === 'internship' && item.src.endsWith('internship-04.jpg')) button.classList.add('landscape');
    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.caption;
    image.loading = 'lazy';
    button.append(image);
    button.addEventListener('click', () => openGallery(kind, index));
    container.append(button);
  });
}

const internshipRail = document.querySelector('#internship-grid');
const internshipCards = [...internshipRail.children];
internshipCards.forEach((card, index) => {
  const copy = card.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  copy.tabIndex = -1;
  copy.addEventListener('click', () => openGallery('internship', index));
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
