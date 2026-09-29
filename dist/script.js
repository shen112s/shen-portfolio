const siteHeader = document.querySelector('.site-header');
const syncHeaderHeight = () => document.documentElement.style.setProperty('--site-header-height', `${siteHeader.getBoundingClientRect().height}px`);
syncHeaderHeight();
new ResizeObserver(syncHeaderHeight).observe(siteHeader);

const projects = {
  schools: {
    kicker: 'Data journalism work · 2026',
    title: 'Schools Disappearing from the Map: Farewells and Migration amid Rural Primary School Closures',
    image: './assets/rural-schools.png',
    alt: 'Illustrated cover of the rural primary school closures project',
    meta: [['Role','Team leader · Editor · Writer · Graphic designer'],['Recognition','Excellence Award, Shanghai Division, 11th China Data Journalism Competition'],['Format','Interactive data journalism']],
    description: 'Drawing on more than two decades of changes in the number of rural primary schools in China, this data journalism project combines policy documents, public datasets, reported cases, and interview material. It examines how school closures and consolidations affect commuting, transport safety, families relocating to accompany their children, and the reuse of vacant school buildings. Interactive charts present the wider trend while acknowledging inconsistent statistical definitions, regional differences, and missing data.',
    justifyDescription: true,
    website: 'https://shendigitalnews.framer.website',
    actions: [['Open interactive story ↗','https://shendigitalnews.framer.website']]
  },
  wanping: {
    kicker: 'In-depth reporting · 2025',
    title: 'No. 600, Wanping South Road: Estrangements and Struggles behind the “Wall”',
    image: './assets/wanping.png', alt: 'Cover of the Wanping South Road report',
    meta: [['Role','Team leader · Editor · Reporter'],['Reporting','One patient living with mental illness and one social worker'],['Recognition','Award in Public-Interest Communication, Fifth College Campus Media Competition (non-ranked category)']],
    description: 'The report begins with “No. 600 Wanping South Road”, an address often used jokingly in Shanghai as shorthand for mental illness. Through conversations with one person living with mental illness and one frontline social worker, it examines employment, family relationships, community life, and social acceptance after a patient’s condition has stabilised.',
    justifyDescription: true,
    article: './assets/wanping-article.jpg',
    articleSize: [1279,41340],
    actions: []
  },
  accessibility: {
    kicker: 'In-depth reporting · 2026',
    title: 'When “Accessibility” Goes Beyond Tactile Paving: How Can We See Each Other Eye to Eye?',
    image: './assets/accessibility-cover.png', alt: 'Cover of the accessibility report',
    meta: [['Role','Reporter · Editor · Writer'],['Format','In-depth reporting']],
    description: 'Using the disability-inclusive dance initiative Embodied Moment (此时舞身) as its entry point, the report observes how disabled and non-disabled participants share a dance class. It then asks whether the venue, access to information, and opportunities for expression are genuinely accessible. Revealing the distance that can remain between being present in the same room and participating on equal terms.',
    justifyDescription: true,
    article: './assets/accessibility-article.png',
    articleSize: [1290,35146],
    actions: []
  },
  doxxing: {
    kicker: 'Convergence journalism · 2025',
    title: 'Who Doxxed Me?',
    image: './assets/doxxing-cover.png', alt: 'Who Doxxed Me? cover',
    meta: [['Role','Team leader · Editor · Writer'],['Format','Interactive web page and WeChat version']],
    description: 'The project examines “kaihe”—the Chinese online term for doxxing—alongside personal-data leaks and online abuse. It uses publicly reported cases, a map of the illicit information chain, official notices, published expert commentary, a risk profile, and an interactive quiz to explain how personal information is collected, traded, and circulated. Its interactive webpage and WeChat versions place readers in recognisable situations, helping them identify risks and find practical guidance.',
    justifyDescription: true,
    article: './assets/doxxing-article.png',
    articleSize: [1290,21783],
    actions: []
  },
  parking: {
    kicker: 'Television news program · 2025',
    title: 'Working Together to Address Disorderly Campus Parking',
    image: './assets/parking-cover.png', alt: 'Campus parking report cover',
    meta: [['Role','Reporter · Video editor']],
    description: 'Haphazard parking of bicycles and e-bikes has long been among the top concerns of students and faculty at the East China University of Political Science and Law (ECUPL). The reporter interviewed campus security and logistics staff alongside cycling students and faculty, and checked parking rules and departmental responsibilities across locations and time slots. One month after those interviews, follow-up reporting found the university had in fact rolled out new management measures.',
    justifyDescription: true,
    video: {player:'./media/parking/index.html'},
    actions: [['Open video ↗','./media/parking/index.html']]
  },
  dwell: {
    kicker: 'Documentary · 2026',
    title: 'Dwell',
    image: './assets/dwell-poster.png', alt: 'Dwell documentary poster', poster: true,
    meta: [['Role','Director · Producer · Cinematographer · Editor'],['Format','Documentary']],
    description: 'This Chinese micro-documentary focuses on the Dweller co-living community in Shanghai, employing a blend of observational and participatory filmmaking. The film follows three young people at different stages of life—Zhou Shuai, Fufu, and Dagou—as it documents their urban lives and work, their interpersonal bonds and solitude, their construction of belonging, and their journey of self-discovery and spiritual anchoring amidst the noise of the city.',
    video: {player:'./media/dwell/index.html'},
    actions: [['Open film ↗','./media/dwell/index.html']]
  },
  choice: {
    kicker: 'Narrative fiction microfilm · 2024',
    title: 'A Moment’s Choice',
    image: './assets/moments-choice.jpeg', alt: 'A Moment’s Choice film poster', poster: true,
    meta: [['Role','Director · Producer · Cinematographer · Editor'],['Recognition','First Prize in the Video Category, Second Qinglan Cup Campus Media Legal Works Competition; Selected for ECUPL’s Feiniao Exhibition.']],
    description: "Adapted from a real scam endured by one of the team members, the film traces a university student's slow entanglement with a stranger. They bond over photography; what starts as innocent conversation quietly evolves into an elaborate trap. The film looks unflinchingly at how trust operates—and how effortlessly it can be turned against us.",
    video: {player:'./media/choice/index.html'},
    actions: [['Open film ↗','./media/choice/index.html']]
  },
  pause: {
    kicker: 'Micro-film advertisement · 2025',
    title: 'Hey, Press Pause',
    image: './assets/press-pause-remaster-20260929.jpg', alt: 'Hey, Press Pause cover',
    meta: [['Role','Director · Cinematographer · Editor'],['Format','Micro-film advertisement']],
    description: 'This short film is written for Nyota, an IP under Pop Mart. Three narrative threads mirror the weight of academia, career, and family. A childhood photograph, a cat, a celebrity, and a parallel universe—these delicate yet profound images together render Nyota an emotional pause. They allow the fragments of life long obscured by constant pressure to resurface, and gently remind us that amid the relentless torrent of daily existence, we all need to stop and rediscover ourselves.',
    video: {player:'./media/pause/index.html?v=20260929-1'},
    actions: [['Open film ↗','./media/pause/index.html?v=20260929-1']]
  },
  shanghai: {
    kicker: 'AI short film · 2026',
    title: 'Shanghai, Inherited and Reimagined',
    image: './assets/shanghai-ai.png', alt: 'Shanghai, Inherited and Reimagined poster', poster: true,
    meta: [['Role','Author']],
    description: "This 65-second vertical animation follows a young man named Leo as he travels through Shanghai's Yuyuan Garden, Shikumen neighborhoods, Saint John's University, the Bund, and Lujiazui. As scenes shift, architecture becomes the backbone of the narrative—linking the city's Jiangnan cultural roots, its modern history of cross-cultural encounter, and the creative energy of its contemporary urban landscape. Against the reductive international portrayal of Shanghai as merely a financial hub with a futuristic skyline, I choose architecture as the visual entry point for cultural expression, letting the spaces speak for themselves, free from extra layers of cultural translation.",
    video: {player:'./media/shanghai/index.html',portrait:true},
    actions: [['Open film ↗','./media/shanghai/index.html']]
  }
};

const projectDialog = document.querySelector('#project-dialog');
const projectHero = document.querySelector('#dialog-hero');
const projectMeta = document.querySelector('#dialog-meta');
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
  addProjectFact('Project description', project.description, `dialog-fact-description${project.justifyDescription ? ' is-justified' : ''}`);
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
  const previewHeading = document.querySelector('#dialog-preview-title');
  previewHeading.textContent = project.website ? '' : previewTitle;
  previewHeading.hidden = !!project.website;
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}

document.querySelectorAll('.project-trigger').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
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
  internship: internshipPrograms.map(([number,title,href],i) => ({src:`./assets/gallery/internship-${String(number).padStart(2,'0')}.jpg`, title, href, alt:title, caption:`Internship programs · ${String(i+1).padStart(2,'0')}/08`})),
  photo: photographyOrder.map((number,i) => ({...photography[number-1], caption:`Recent photography · ${String(i+1).padStart(2,'0')}/${photography.length}`}))
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
  image.alt = item.alt || item.caption;
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
    image.src = item.src;
    image.alt = item.alt || item.caption;
    image.loading = 'lazy';
    image.decoding = 'async';
    if (item.width && item.height) {
      image.width = item.width;
      image.height = item.height;
      if (kind === 'photo') tile.style.setProperty('--photo-ratio', item.width / item.height);
    }
    tile.append(image);
    container.append(tile);
  });
}

// Justified rows preserve the left-to-right sequence and every image's full frame.
const photoGrid = document.querySelector('#photo-grid');
const photoTiles = [...photoGrid.children];
let photoLayoutWidth = 0;
let photoLayoutGap = -1;
function layoutPhotography() {
  const width = photoGrid.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(photoGrid).rowGap) || 0;
  if (!width || (Math.abs(width - photoLayoutWidth) < .5 && gap === photoLayoutGap)) return;
  photoLayoutWidth = width;
  photoLayoutGap = gap;
  const targetHeight = width <= 450 ? 220 : width <= 850 ? 300 : 340;
  const rows = [];
  let index = 0;
  while (index < photoTiles.length) {
    const start = index;
    let ratio = 0;
    while (index < photoTiles.length) {
      const item = gallery.photo[index];
      const nextRatio = ratio + item.width / item.height;
      const rowCount = index - start;
      const nextHeight = (width - gap * rowCount) / nextRatio;
      const currentHeight = (width - gap * Math.max(0, rowCount - 1)) / ratio;
      if (ratio && nextHeight <= targetHeight && Math.abs(currentHeight - targetHeight) < Math.abs(nextHeight - targetHeight)) break;
      ratio = nextRatio;
      index++;
      if (nextHeight <= targetHeight) break;
    }
    const row = document.createElement('div');
    row.className = 'photo-row';
    row.style.height = `${(width - gap * (index - start - 1)) / ratio}px`;
    row.append(...photoTiles.slice(start, index));
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
