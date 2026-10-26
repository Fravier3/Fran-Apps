# Fran Apps

Centro personal de aplicaciones de Fravier3. Publicado en https://fravier3.github.io/Fran-Apps/ mediante GitHub Pages, rama `main`, carpeta raíz.

## Catálogo · 26 octubre 2026

17 apps web: las 11 existentes y RadioFran, Coquídoku, Peseteando PR, Fran & Diana, Sonidos y UserPlex. IPTv-Fran, SuperNIntendo y FranMusicTv aparecen aparte como repositorios sin web publicada. No se han modificado los proyectos de destino.

Los 17 enlaces y los 13 iconos originales respondieron HTTP 200. Los iconos se enlazan directamente al recurso declarado por cada app. ConteoRegresivo, Puerto-Rico, DesarrollosFran y QA-Tester tienen iconos 3D creados exclusivamente para este catálogo, guardados en `icons/apps/`. Sus repositorios originales no se modifican. El icono principal de Fran Apps está en `icons/hub-v4-*.png`. Si un icono deja de estar disponible, también se muestran iniciales.

## Uso

Búsqueda por nombre o descripción (sin distinguir acentos), filtros por categoría y favoritos guardados localmente. Los enlaces abren las aplicaciones originales en otra pestaña. El catálogo permanece disponible sin JavaScript; búsqueda y favoritos requieren JavaScript.

En iPhone: Safari → Compartir → Añadir a pantalla de inicio. Las actualizaciones no requieren reinstalar. Se comprueban al cargar y al volver al primer plano. El service worker usa red primero y limita su caché a Fran Apps, sin interceptar otras apps. El catálogo puede abrirse sin conexión después de una visita; los iconos remotos y las apps de destino necesitan conexión.

## Mantenimiento

Las tarjetas estáticas están en `index.html`; `catalog.json` documenta los enlaces y las fuentes de iconos. Actualizar ambos al cambiar el catálogo. No se incluyen automáticamente nuevos repositorios. Incrementar la versión del caché y las URLs de CSS/JS al cambiar la interfaz.

## Validación

Sintaxis JavaScript y diff comprobados; búsqueda sin acentos y persistencia de favoritos verificadas en navegador. Diseño responsive con dos columnas en móvil y hasta cuatro en escritorio. No se ha probado en un iPhone físico.
