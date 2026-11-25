# Cómo conectar el botón "Preview" con Music Banner Preview Studio

El preview muestra cómo se ve un banner dentro de cada plataforma (Spotify, TIDAL, YouTube, Deezer, Amazon Music), con los recortes y los elementos que cada una pone encima.

Para usarlo desde el sistema de aprobación, el botón **Preview** solo tiene que abrir este link (en una pestaña nueva o dentro de un `<iframe>`):

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
| `amazon` | Amazon Music Artist Banner | 1920 × 1440 |

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
