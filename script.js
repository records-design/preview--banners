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
    }
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
    }
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
    }
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
    }
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
    }
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

  inner.appendChild(img);
  inner.appendChild(placeholder);
  inner.appendChild(guideOverlay);
  frame.appendChild(inner);
  card.appendChild(frame);

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
