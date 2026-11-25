# Cómo conectar el botón "Preview" con Music Banner Preview Studio

El preview muestra cómo se ve un banner dentro de cada plataforma (Spotify, TIDAL, YouTube, Deezer, Amazon Music), con los recortes y los elementos que cada una pone encima.

## Integración lista para usar (recomendada)

Al hacer clic en **Preview**, se abre una ventana **encima de la página**, sin salir del sistema.

1. Incluir el script una vez en la página:

```html
<script src="https://records-design.github.io/preview--banners/integracion/preview-modal.js"></script>
```

2. En el botón Preview de cada entregable:

```js
abrirPreviewBanner(nombreDelEntregable, urlPublicaDelArchivoSubido);
// ej.: abrirPreviewBanner('Spotify Header / Banner', archivo.url);
```

3. Opcional: mostrar el botón solo donde hay preview.

```js
if (tienePreviewBanner(nombreDelEntregable)) { /* mostrar botón Preview */ }
```

La ventana se cierra con la ✕, con un clic afuera o con Esc. Hay una demo funcionando en `integracion/demo.html`.

La URL del archivo subido tiene que poder abrirse desde un navegador sin login (o con un link firmado temporal).

---

## Detalle técnico: el link que usa la ventana

La ventana carga este link en un `<iframe>`. También se puede usar directo:

```
https://records-design.github.io/preview--banners/?plataforma=<PLATAFORMA>&imagen=<URL_DE_LA_IMAGEN>
```

- `plataforma`: el id o el nombre del entregable tal como figura en el sistema. Mayúsculas, tildes y símbolos no importan.
- `imagen`: la URL pública del archivo subido, **codificada** con `encodeURIComponent`. Tiene que poder abrirse desde un navegador sin login (o con un link firmado temporal).

Con esos parámetros, la página muestra solo esa plataforma, con el mockup ya activado.

## Plataformas disponibles

| `plataforma` (id) | Nombre que también acepta | Medida |
|---|---|---|
| `spotify` | Spotify Header / Banner | 2660 × 1140 |
| `tidal` | TIDAL Banner | 2400 × 1600 |
| `youtube-banner` | YouTube Channel Banner | 2560 × 1440 |
| `youtube-thumbnail` | YouTube Thumbnail | 1280 × 720 |
| `deezer` | Deezer Banner | 2400 × 940 |
| `amazon` | Amazon Music Banner | 2560 × 1440 |

Si llega una plataforma que no existe (por ejemplo, Spotify Canvas, que es un video), la página muestra un aviso con la lista de las disponibles. Lo recomendable es mostrar el botón Preview solo en los entregables de la tabla.

## Ejemplo (JavaScript)

```js
const PREVIEW_BASE = 'https://records-design.github.io/preview--banners/';

function previewUrl(nombreEntregable, urlImagen) {
  return PREVIEW_BASE +
    '?plataforma=' + encodeURIComponent(nombreEntregable) +
    '&imagen=' + encodeURIComponent(urlImagen);
}

// En el botón Preview:
window.open(previewUrl('Spotify Header / Banner', archivo.urlPublica), '_blank');
```

Dentro de la página, en vez de una pestaña nueva:

```html
<iframe src="(resultado de previewUrl)" width="100%" height="700" style="border:0"></iframe>
```

## Agregar una plataforma nueva

Se agrega un objeto al array `PLATFORMS` al principio de `script.js` (id, nombre, medidas, guías y tipo de mockup). El sistema no necesita ningún cambio: alcanza con usar el nuevo id en `plataforma`.

Repositorio: https://github.com/records-design/preview--banners
