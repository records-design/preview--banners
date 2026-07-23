/* ============================================
   Music Banner Preview Studio — lógica
   Para agregar una nueva plataforma, añadir un
   nuevo objeto al array PLATFORMS.
   ============================================ */

const PLATFORMS = [
  {
    id: 'spotify',
    name: 'Spotify Artist Header',
    resolution: '2660 × 1140 px',
    ratio: '7:3',
    width: 2660,
    height: 1140,
    image: 'assets/spotify.jpg',
    guides: {
      x: [150, 300, 1330, 2360, 2510],
      y: [80, 160, 570, 980, 1060]
    },
    mockupType: 'artist-header',
    accent: '#1ED760',
    platformLabel: 'Spotify'
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
 * Construye el mockup de "página de artista" (Spotify, Deezer, Amazon Music):
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

const MOCKUP_BUILDERS = {
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
  meta.textContent = platform.resolution + ' · Relación ' + platform.ratio;

  header.appendChild(title);
  header.appendChild(meta);
  card.appendChild(header);

  // Área de imagen
  const frame = document.createElement('div');
  frame.className = 'image-frame';
  frame.style.aspectRatio = platform.width + ' / ' + platform.height;

  const inner = document.createElement('div');
  inner.className = 'image-frame-inner';

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
  }

  showImage(platform.image);

  const guideOverlay = buildGuideOverlay(platform);

  const mockupBuilder = MOCKUP_BUILDERS[platform.mockupType];
  const mockup = mockupBuilder ? mockupBuilder(platform) : { overlay: null, below: null };

  inner.appendChild(img);
  inner.appendChild(placeholder);
  if (mockup.overlay) {
    inner.appendChild(mockup.overlay);
  }
  inner.appendChild(guideOverlay);
  frame.appendChild(inner);
  card.appendChild(frame);

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

  if (mockup.overlay || mockup.below) {
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
      mockupBtn.classList.toggle('active', willActivate);
      mockupBtn.textContent = willActivate ? 'Ocultar mockup' : 'Ver mockup de plataforma';
    });
    controls.appendChild(mockupBtn);
  }

  controls.appendChild(fileInput);
  card.appendChild(controls);

  return card;
}

function renderPlatforms() {
  const list = document.getElementById('platform-list');
  PLATFORMS.forEach((platform) => {
    list.appendChild(buildPlatformCard(platform));
  });
}

document.addEventListener('DOMContentLoaded', renderPlatforms);
