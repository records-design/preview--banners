/* ============================================================
   Music Banner Preview — ventana integrada para el botón "Preview"
   ------------------------------------------------------------
   Uso: incluir este archivo en la página y llamar

     abrirPreviewBanner('Spotify Header / Banner', urlPublicaDeLaImagen);

   Abre una ventana encima de la página (sin salir de la plataforma)
   con el mockup de esa plataforma y la imagen subida.
   Se cierra con la ✕, haciendo clic afuera o con la tecla Esc.
   ============================================================ */
(function () {
  var PREVIEW_BASE = 'https://records-design.github.io/preview--banners/';

  // Entregables que tienen preview (el resto no muestra el botón).
  var PLATAFORMAS = [
    'spotify', 'tidal', 'youtube-banner', 'youtube-thumbnail', 'deezer', 'amazon'
  ];

  function normalizar(texto) {
    return String(texto).toLowerCase().normalize('NFD')
      .replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  }

  function insertarEstilos() {
    if (document.getElementById('mbp-estilos')) return;
    var css =
      '.mbp-fondo{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);' +
      'display:flex;align-items:center;justify-content:center;padding:24px}' +
      '.mbp-ventana{position:relative;width:min(1200px,100%);height:min(820px,100%);' +
      'background:#f3f3f3;border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35)}' +
      '.mbp-ventana iframe{width:100%;height:100%;border:0;display:block}' +
      '.mbp-cerrar{position:absolute;top:10px;right:12px;z-index:1;width:36px;height:36px;' +
      'border:0;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.2);' +
      'font-size:18px;line-height:36px;cursor:pointer}';
    var style = document.createElement('style');
    style.id = 'mbp-estilos';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function cerrar() {
    var fondo = document.querySelector('.mbp-fondo');
    if (fondo) fondo.remove();
    document.removeEventListener('keydown', alTeclado);
  }

  function alTeclado(e) {
    if (e.key === 'Escape') cerrar();
  }

  window.tienePreviewBanner = function (nombreEntregable) {
    var q = normalizar(nombreEntregable);
    return PLATAFORMAS.some(function (id) {
      var n = normalizar(id);
      return q === n || q.indexOf(n) !== -1 ||
        (id === 'youtube-banner' && q.indexOf('youtubechannel') !== -1) ||
        (id === 'amazon' && q.indexOf('amazonmusic') !== -1);
    });
  };

  window.abrirPreviewBanner = function (nombreEntregable, urlImagen) {
    insertarEstilos();
    cerrar();

    var base = window.MBP_PREVIEW_BASE || PREVIEW_BASE;
    var src = base + '?plataforma=' + encodeURIComponent(nombreEntregable) +
      (urlImagen ? '&imagen=' + encodeURIComponent(urlImagen) : '');

    var fondo = document.createElement('div');
    fondo.className = 'mbp-fondo';
    fondo.addEventListener('click', function (e) {
      if (e.target === fondo) cerrar();
    });

    var ventana = document.createElement('div');
    ventana.className = 'mbp-ventana';

    var boton = document.createElement('button');
    boton.className = 'mbp-cerrar';
    boton.type = 'button';
    boton.setAttribute('aria-label', 'Cerrar preview');
    boton.textContent = '✕';
    boton.addEventListener('click', cerrar);

    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = 'Preview del banner';

    ventana.appendChild(boton);
    ventana.appendChild(iframe);
    fondo.appendChild(ventana);
    document.body.appendChild(fondo);
    document.addEventListener('keydown', alTeclado);
  };
})();
