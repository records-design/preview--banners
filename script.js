/* ============================================
   Music Banner Preview Studio — lógica
   Para agregar una nueva plataforma, añadir un
   nuevo objeto al array PLATFORMS.
   ============================================ */

const PLATFORMS = [
  {
    id: 'spotify',
    name: 'Spotify Header / Banner',
    resolution: '2660 × 1140 px',
    ratio: '7:3',
    formats: 'JPG, JPEG, PNG',
    width: 2660,
    height: 1140,
    image: 'assets/spotify.jpg',
    guides: {
      x: [150, 300, 1330, 2360, 2510],
      y: [80, 160, 570, 980, 1060]
    },
    mockupType: 'spotify-desktop'
  },
  {
    id: 'tidal',
    name: 'TIDAL Banner',
    resolution: '2400 × 1600 px',
    ratio: '3:2',
    formats: 'JPG, JPEG, PNG',
    width: 2400,
    height: 1600,
    image: 'assets/tidal.jpg',
    guides: {
      x: [240, 1200, 2160],
      y: [160, 800, 1440]
    },
    mockupType: 'tidal-desktop'
  },
  {
    id: 'youtube-banner',
    name: 'YouTube Channel Banner',
    resolution: '2560 × 1440 px',
    ratio: '16:9',
    width: 2560,
    height: 1440,
    image: 'assets/youtube-banner.jpg',
    guides: {
      x: [507, 1280, 2053],
      y: [509, 720, 932]
    },
    mockupType: 'youtube-channel'
  },
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail',
    resolution: '1280 × 720 px',
    ratio: '16:9',
    width: 1280,
    height: 720,
    image: 'assets/youtube-thumbnail.jpg',
    guides: {
      x: [160, 640, 1120],
      y: [100, 360, 620]
    },
    mockupType: 'youtube-thumbnail'
  },
  {
    id: 'deezer',
    name: 'Deezer Banner',
    resolution: '2400 × 940 px',
    ratio: '2.55:1',
    width: 2400,
    height: 940,
    image: 'assets/deezer.jpg',
    guides: {
      x: [300, 1200, 2100],
      y: [110, 470, 830]
    },
    mockupType: 'artist-header',
    accent: '#A238FF',
    platformLabel: 'Deezer'
  },
  {
    id: 'amazon',
    name: 'Amazon Music Artist Banner',
    resolution: '1920 × 1440 px',
    ratio: '4:3',
    width: 1920,
    height: 1440,
    image: 'assets/amazon.jpg',
    guides: {
      x: [200, 960, 1720],
      y: [120, 720, 1320]
    },
    mockupType: 'artist-header',
    accent: '#00A8E1',
    platformLabel: 'Amazon Music'
  }
];

/**
 * Crea la superposición de guías (líneas + etiquetas) para una plataforma.
 */
function buildGuideOverlay(platform) {
  const overlay = document.createElement('div');
  overlay.className = 'guide-overlay';

  const centerX = platform.width / 2;
  const centerY = platform.height / 2;

  platform.guides.x.forEach((x) => {
    overlay.appendChild(createGuideLine('v', x, platform.width, x === centerX));
    overlay.appendChild(createGuideLabel('v', x, platform.width));
  });

  platform.guides.y.forEach((y) => {
    overlay.appendChild(createGuideLine('h', y, platform.height, y === centerY));
    overlay.appendChild(createGuideLabel('h', y, platform.height));
  });

  // Línea central (eje X e Y), si no coincide ya con una guía existente.
  if (!platform.guides.x.includes(centerX)) {
    overlay.appendChild(createGuideLine('v', centerX, platform.width, true));
  }
  if (!platform.guides.y.includes(centerY)) {
    overlay.appendChild(createGuideLine('h', centerY, platform.height, true));
  }

  return overlay;
}

function createGuideLine(axis, position, total, isCenter) {
  const line = document.createElement('div');
  const percent = (position / total) * 100;

  if (axis === 'v') {
    line.className = 'guide-line-v' + (isCenter ? ' guide-line-center' : '');
    line.style.left = percent + '%';
  } else {
    line.className = 'guide-line-h' + (isCenter ? ' guide-line-center' : '');
    line.style.top = percent + '%';
  }

  return line;
}

function createGuideLabel(axis, position, total) {
  const label = document.createElement('span');
  const percent = (position / total) * 100;

  if (axis === 'v') {
    label.className = 'guide-label guide-label-v';
    label.style.left = percent + '%';
    label.textContent = 'X: ' + position;
  } else {
    label.className = 'guide-label guide-label-h';
    label.style.top = percent + '%';
    label.textContent = 'Y: ' + position;
  }

  return label;
}

/**
 * Construye el mockup de la página de artista de Spotify (app de escritorio):
 * banner recortado como lo recorta Spotify (más panorámico que el 7:3 del
 * archivo, centrado), nombre gigante y oyentes mensuales sobre la imagen, y
 * debajo la barra de reproducción (play, aleatorio, Seguir, ···) y "Populares".
 * Reemplaza al marco de imagen mientras está activo.
 */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function buildSpotifyDesktopMockup() {
  const page = el('div', 'mockup-page mockup-sp-page');

  const hero = el('div', 'mockup-sp-hero');
  const heroImg = el('img', 'mockup-sp-hero-img');
  heroImg.alt = '';
  hero.appendChild(heroImg);
  hero.appendChild(el('div', 'mockup-sp-hero-scrim'));

  const heroInfo = el('div', 'mockup-sp-hero-info');
  heroInfo.appendChild(el('h3', 'mockup-sp-name', 'Nombre del Artista'));
  heroInfo.appendChild(el('p', 'mockup-sp-listeners', '12,6 M oyentes mensuales'));
  hero.appendChild(heroInfo);
  page.appendChild(hero);

  const body = el('div', 'mockup-sp-body');

  const actions = el('div', 'mockup-sp-actions');
  actions.appendChild(el('span', 'mockup-sp-play'));
  actions.appendChild(el('span', 'mockup-sp-shuffle', '⤨'));
  actions.appendChild(el('span', 'mockup-sp-follow', 'Seguir'));
  actions.appendChild(el('span', 'mockup-sp-more', '•••'));
  body.appendChild(actions);

  body.appendChild(el('h4', 'mockup-sp-section', 'Populares'));

  const tracks = [
    ['Canción 1', 'Nombre del Artista', '179.094.619', '3:53', false],
    ['Canción 2', 'Nombre del Artista', '565.299.232', '2:25', true]
  ];
  tracks.forEach(([title, artist, plays, time, explicit], i) => {
    const row = el('div', 'mockup-sp-track');
    row.appendChild(el('span', 'mockup-sp-track-num', String(i + 1)));
    row.appendChild(el('span', 'mockup-sp-track-cover'));
    const info = el('div', 'mockup-sp-track-info');
    info.appendChild(el('span', 'mockup-sp-track-title', title));
    const sub = el('span', 'mockup-sp-track-artist');
    if (explicit) sub.appendChild(el('span', 'mockup-sp-explicit', 'E'));
    sub.appendChild(document.createTextNode(artist));
    info.appendChild(sub);
    row.appendChild(info);
    row.appendChild(el('span', 'mockup-sp-track-plays', plays));
    row.appendChild(el('span', 'mockup-sp-track-time', time));
    body.appendChild(row);
  });

  page.appendChild(body);

  return {
    overlay: null,
    below: null,
    page,
    setImage(src) {
      heroImg.src = src;
    }
  };
}

/**
 * Construye el mockup de "página de artista" (Deezer, Amazon Music):
 * degradado inferior + nombre, stats y botones superpuestos sobre la imagen.
 */
function buildArtistHeaderMockup(platform) {
  const overlay = document.createElement('div');
  overlay.className = 'mockup-overlay mockup-artist-header';
  overlay.style.setProperty('--accent', platform.accent);

  const scrim = document.createElement('div');
  scrim.className = 'mockup-scrim';
  overlay.appendChild(scrim);

  const platformTag = document.createElement('span');
  platformTag.className = 'mockup-platform-tag';
  platformTag.textContent = platform.platformLabel;
  overlay.appendChild(platformTag);

  const info = document.createElement('div');
  info.className = 'mockup-info';

  const badgeRow = document.createElement('div');
  badgeRow.className = 'mockup-badge-row';

  const badge = document.createElement('span');
  badge.className = 'mockup-verified-badge';
  badge.textContent = '✓';

  const verifiedText = document.createElement('span');
  verifiedText.className = 'mockup-verified-text';
  verifiedText.textContent = 'Artista verificado';

  badgeRow.appendChild(badge);
  badgeRow.appendChild(verifiedText);

  const name = document.createElement('p');
  name.className = 'mockup-artist-name';
  name.textContent = 'Nombre del Artista';

  const stats = document.createElement('p');
  stats.className = 'mockup-stats';
  stats.textContent = '1,234,567 oyentes mensuales';

  const buttons = document.createElement('div');
  buttons.className = 'mockup-buttons';

  const playBtn = document.createElement('span');
  playBtn.className = 'mockup-play-btn';

  const followBtn = document.createElement('span');
  followBtn.className = 'mockup-follow-btn';
  followBtn.textContent = 'Seguir';

  const moreBtn = document.createElement('span');
  moreBtn.className = 'mockup-more-btn';
  moreBtn.textContent = '···';

  buttons.appendChild(playBtn);
  buttons.appendChild(followBtn);
  buttons.appendChild(moreBtn);

  info.appendChild(badgeRow);
  info.appendChild(name);
  info.appendChild(stats);
  info.appendChild(buttons);
  overlay.appendChild(info);

  return { overlay, below: null };
}

/**
 * Construye el mockup de canal de YouTube: recorte de zona segura sobre
 * la imagen y la barra de avatar / nombre / suscribirse debajo, tal como
 * se ve en la página real del canal.
 */
function buildYoutubeChannelMockup(platform) {
  const overlay = document.createElement('div');
  overlay.className = 'mockup-overlay mockup-yt-dim';

  const safeGuide = platform.guides;
  const safeLeft = (safeGuide.x[0] / platform.width) * 100;
  const safeRight = 100 - (safeGuide.x[safeGuide.x.length - 1] / platform.width) * 100;
  const safeTop = (safeGuide.y[0] / platform.height) * 100;
  const safeBottom = 100 - (safeGuide.y[safeGuide.y.length - 1] / platform.height) * 100;

  const safeBox = document.createElement('div');
  safeBox.className = 'mockup-safe-dim';
  safeBox.style.left = safeLeft + '%';
  safeBox.style.right = safeRight + '%';
  safeBox.style.top = safeTop + '%';
  safeBox.style.bottom = safeBottom + '%';
  overlay.appendChild(safeBox);

  const safeLabel = document.createElement('span');
  safeLabel.className = 'mockup-safe-label';
  safeLabel.textContent = 'Zona segura (visible en todos los dispositivos)';
  overlay.appendChild(safeLabel);

  const below = document.createElement('div');
  below.className = 'mockup-below mockup-yt-below';

  const avatar = document.createElement('span');
  avatar.className = 'mockup-yt-avatar';

  const infoWrap = document.createElement('div');
  infoWrap.className = 'mockup-yt-info';

  const nameRow = document.createElement('div');
  nameRow.className = 'mockup-yt-name-row';

  const nameText = document.createElement('span');
  nameText.className = 'mockup-yt-name';
  nameText.textContent = 'Nombre del Canal';

  const check = document.createElement('span');
  check.className = 'mockup-yt-check';
  check.textContent = '✓';

  nameRow.appendChild(nameText);
  nameRow.appendChild(check);

  const subText = document.createElement('p');
  subText.className = 'mockup-yt-sub';
  subText.textContent = '@usuario · 128 K suscriptores · 42 videos';

  infoWrap.appendChild(nameRow);
  infoWrap.appendChild(subText);

  const subBtn = document.createElement('span');
  subBtn.className = 'mockup-yt-subscribe';
  subBtn.textContent = 'Suscribirse';

  below.appendChild(avatar);
  below.appendChild(infoWrap);
  below.appendChild(subBtn);

  return { overlay, below };
}

/**
 * Construye el mockup de miniatura de YouTube: badge de duración sobre la
 * imagen y la fila de título / canal / vistas debajo, como en el feed real.
 */
function buildYoutubeThumbnailMockup() {
  const overlay = document.createElement('div');
  overlay.className = 'mockup-overlay mockup-yt-thumb-overlay';

  const duration = document.createElement('span');
  duration.className = 'mockup-duration-badge';
  duration.textContent = '12:34';
  overlay.appendChild(duration);

  const below = document.createElement('div');
  below.className = 'mockup-below mockup-yt-video-below';

  const avatar = document.createElement('span');
  avatar.className = 'mockup-yt-avatar mockup-yt-avatar-small';

  const infoWrap = document.createElement('div');
  infoWrap.className = 'mockup-yt-video-info';

  const title = document.createElement('p');
  title.className = 'mockup-yt-video-title';
  title.textContent = 'Título del video que aparecería aquí, en hasta dos líneas';

  const meta = document.createElement('p');
  meta.className = 'mockup-yt-video-meta';
  meta.textContent = 'Nombre del Canal · 45 K vistas · hace 2 días';

  infoWrap.appendChild(title);
  infoWrap.appendChild(meta);

  below.appendChild(avatar);
  below.appendChild(infoWrap);

  return { overlay, below };
}

/**
 * Construye el mockup de la página de TIDAL (web): el banner ocupa todo el
 * fondo de la cabecera, oscurecido, con la barra superior (flechas, buscador,
 * botones), la portada cuadrada a la izquierda y título, artistas, cantidad de
 * canciones, año y etiqueta MAX a la derecha. Reemplaza al marco mientras está activo.
 */
function buildTidalDesktopMockup() {
  const page = el('div', 'mockup-page mockup-td-page');

  const bg = el('img', 'mockup-td-bg');
  bg.alt = '';
  page.appendChild(bg);
  page.appendChild(el('div', 'mockup-td-scrim'));

  const top = el('div', 'mockup-td-top');
  const nav = el('div', 'mockup-td-nav');
  nav.appendChild(el('span', 'mockup-td-arrow', '‹'));
  nav.appendChild(el('span', 'mockup-td-arrow mockup-td-arrow-off', '›'));
  top.appendChild(nav);
  const search = el('div', 'mockup-td-search');
  search.appendChild(el('span', 'mockup-td-search-icon', '⌕'));
  search.appendChild(el('span', 'mockup-td-search-text', 'Buscar'));
  top.appendChild(search);
  const right = el('div', 'mockup-td-top-right');
  right.appendChild(el('span', 'mockup-td-pill', 'Descarga TIDAL'));
  right.appendChild(el('span', 'mockup-td-pill', 'Iniciar sesión'));
  right.appendChild(el('span', 'mockup-td-pill mockup-td-pill-white', 'Crea una cuenta gratuita'));
  top.appendChild(right);
  page.appendChild(top);

  const content = el('div', 'mockup-td-content');
  content.appendChild(el('div', 'mockup-td-cover', 'Portada'));
  const info = el('div', 'mockup-td-info');
  info.appendChild(el('h3', 'mockup-td-title', 'Título del Lanzamiento'));
  const artists = el('div', 'mockup-td-artists');
  artists.appendChild(el('span', 'mockup-td-artists-icon', '👤'));
  artists.appendChild(el('span', '', 'Nombre del Artista'));
  info.appendChild(artists);
  info.appendChild(el('p', 'mockup-td-meta', '1 CANCIÓN  (1:35)'));
  const year = el('p', 'mockup-td-meta mockup-td-year', '2026');
  year.appendChild(el('span', 'mockup-td-max', 'MAX'));
  info.appendChild(year);
  content.appendChild(info);
  page.appendChild(content);

  return {
    overlay: null,
    below: null,
    page,
    setImage(src) {
      bg.src = src;
    }
  };
}

const MOCKUP_BUILDERS = {
  'tidal-desktop': buildTidalDesktopMockup,
  'spotify-desktop': buildSpotifyDesktopMockup,
  'artist-header': buildArtistHeaderMockup,
  'youtube-channel': buildYoutubeChannelMockup,
  'youtube-thumbnail': buildYoutubeThumbnailMockup
};

/**
 * Construye la tarjeta completa de una plataforma.
 */
function buildPlatformCard(platform) {
  const card = document.createElement('section');
  card.className = 'platform-card';

  // Encabezado
  const header = document.createElement('div');
  header.className = 'platform-card-header';

  const title = document.createElement('h2');
  title.className = 'platform-name';
  title.textContent = platform.name;

  const meta = document.createElement('p');
  meta.className = 'platform-meta';
  meta.textContent = platform.resolution + ' · ' +
    (platform.formats ? platform.formats : 'Relación ' + platform.ratio);

  header.appendChild(title);
  header.appendChild(meta);
  card.appendChild(header);

  // Área de imagen
  const frame = document.createElement('div');
  frame.className = 'image-frame';

  const inner = document.createElement('div');
  inner.className = 'image-frame-inner';
  // El aspect-ratio va en el elemento sin padding: si se pusiera en .image-frame,
  // el padding (con box-sizing: border-box) desplazaría la proporción real del
  // área de imagen respecto a la de la plataforma, generando barras negras
  // aunque el JPG tenga el tamaño exacto.
  inner.style.aspectRatio = platform.width + ' / ' + platform.height;

  const img = document.createElement('img');
  img.alt = platform.name;

  const placeholder = document.createElement('div');
  placeholder.className = 'image-placeholder';
  placeholder.textContent = 'Imagen no encontrada';

  img.addEventListener('error', () => {
    img.classList.add('hidden');
    placeholder.classList.add('visible');
  });

  // Referencia al objeto URL de una previsualización temporal (para poder liberarlo).
  let tempObjectUrl = null;

  function showImage(src) {
    placeholder.classList.remove('visible');
    img.classList.remove('hidden');
    img.src = src;
    if (mockup.setImage) {
      mockup.setImage(src);
    }
  }

  const guideOverlay = buildGuideOverlay(platform);

  const mockupBuilder = MOCKUP_BUILDERS[platform.mockupType];
  const mockup = mockupBuilder ? mockupBuilder(platform) : { overlay: null, below: null };

  showImage(platform.image);

  inner.appendChild(img);
  inner.appendChild(placeholder);
  if (mockup.overlay) {
    inner.appendChild(mockup.overlay);
  }
  inner.appendChild(guideOverlay);
  frame.appendChild(inner);
  card.appendChild(frame);

  if (mockup.page) {
    card.appendChild(mockup.page);
  }
  if (mockup.below) {
    card.appendChild(mockup.below);
  }

  // Controles
  const controls = document.createElement('div');
  controls.className = 'platform-controls';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.className = 'file-input-hidden';

  const selectBtn = document.createElement('button');
  selectBtn.className = 'btn';
  selectBtn.type = 'button';
  selectBtn.textContent = 'Seleccionar imagen';
  selectBtn.addEventListener('click', () => fileInput.click());

  const restoreBtn = document.createElement('button');
  restoreBtn.className = 'btn btn-restore';
  restoreBtn.type = 'button';
  restoreBtn.textContent = 'Restaurar original';
  restoreBtn.addEventListener('click', () => {
    if (tempObjectUrl) {
      URL.revokeObjectURL(tempObjectUrl);
      tempObjectUrl = null;
    }
    showImage(platform.image);
    restoreBtn.classList.remove('visible-inline');
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (tempObjectUrl) {
      URL.revokeObjectURL(tempObjectUrl);
    }
    tempObjectUrl = URL.createObjectURL(file);
    showImage(tempObjectUrl);
    restoreBtn.classList.add('visible-inline');
    fileInput.value = '';
  });

  const viewBtn = document.createElement('button');
  viewBtn.className = 'btn';
  viewBtn.type = 'button';
  viewBtn.textContent = 'Ver imagen completa';
  viewBtn.addEventListener('click', () => {
    window.open(img.src, '_blank');
  });

  const guidesBtn = document.createElement('button');
  guidesBtn.className = 'btn';
  guidesBtn.type = 'button';
  guidesBtn.textContent = 'Mostrar guías';
  guidesBtn.addEventListener('click', () => {
    const isActive = guideOverlay.classList.toggle('active');
    guidesBtn.classList.toggle('active', isActive);
    guidesBtn.textContent = isActive ? 'Ocultar guías' : 'Mostrar guías';
  });

  controls.appendChild(selectBtn);
  controls.appendChild(restoreBtn);
  controls.appendChild(viewBtn);
  controls.appendChild(guidesBtn);

  if (mockup.overlay || mockup.below || mockup.page) {
    const mockupBtn = document.createElement('button');
    mockupBtn.className = 'btn';
    mockupBtn.type = 'button';
    mockupBtn.textContent = 'Ver mockup de plataforma';
    mockupBtn.addEventListener('click', () => {
      const willActivate = !mockupBtn.classList.contains('active');
      if (mockup.overlay) {
        mockup.overlay.classList.toggle('active', willActivate);
      }
      if (mockup.below) {
        mockup.below.classList.toggle('active', willActivate);
      }
      if (mockup.page) {
        // La página completa reemplaza al marco mientras está activa.
        mockup.page.classList.toggle('active', willActivate);
        frame.classList.toggle('hidden', willActivate);
      }
      mockupBtn.classList.toggle('active', willActivate);
      mockupBtn.textContent = willActivate ? 'Ocultar mockup' : 'Ver mockup de plataforma';
    });
    controls.appendChild(mockupBtn);
  }

  controls.appendChild(fileInput);
  card.appendChild(controls);

  return card;
}

/**
 * Modo "abrir desde un link": permite que otro sistema muestre directamente
 * el mockup de una plataforma con una imagen propia.
 *
 *   ?plataforma=tidal&imagen=https://.../banner.jpg
 *
 * `plataforma` acepta el id (spotify, tidal, youtube-banner, youtube-thumbnail,
 * deezer, amazon) o el nombre ("Spotify Header / Banner"). `imagen` es
 * opcional: sin ella se usa la imagen del proyecto. También se aceptan
 * `platform` e `image`. Con `plataforma`, se muestra solo esa tarjeta con
 * el mockup ya activado.
 */
function normalizeKey(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function findPlatform(query) {
  const q = normalizeKey(query);
  if (!q) return null;
  return (
    PLATFORMS.find((p) => normalizeKey(p.id) === q || normalizeKey(p.name) === q) ||
    PLATFORMS.find((p) => normalizeKey(p.name).includes(q) || q.includes(normalizeKey(p.id)))
  ) || null;
}

function renderPlatforms() {
  const list = document.getElementById('platform-list');
  const params = new URLSearchParams(window.location.search);
  const platformParam = params.get('plataforma') || params.get('platform');
  const imageParam = params.get('imagen') || params.get('image');

  if (!platformParam) {
    PLATFORMS.forEach((platform) => {
      list.appendChild(buildPlatformCard(platform));
    });
    return;
  }

  document.body.classList.add('link-mode');
  const platform = findPlatform(platformParam);

  if (!platform) {
    const msg = document.createElement('p');
    msg.className = 'link-mode-error';
    msg.textContent = 'No hay vista previa para la plataforma "' + platformParam +
      '". Disponibles: ' + PLATFORMS.map((p) => p.id).join(', ') + '.';
    list.appendChild(msg);
    return;
  }

  const card = buildPlatformCard(imageParam ? { ...platform, image: imageParam } : platform);
  list.appendChild(card);

  const mockupBtn = [...card.querySelectorAll('button')]
    .find((b) => b.textContent === 'Ver mockup de plataforma');
  if (mockupBtn) mockupBtn.click();
}

document.addEventListener('DOMContentLoaded', renderPlatforms);
