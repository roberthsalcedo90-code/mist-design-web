# MIST DESIGN — Auditoría Web, Arquitectura & Catálogo Consolidado

**Razón Social:** Look and Feel Interior Design S.A.S. · **NIT:** `901.474.603-3`  
**Showroom (Cita previa):** Carrera 23 #72A-61, Bogotá, Colombia · **Horario:** Lunes a sábados 8:00 am – 6:00 pm  
**Sitio actual analizado:** `https://www.mistdesignco.com/` (Hostinger Website Builder / Zyro)  
**Contacto:** `paolozano@lookandfeelinterior.com` · WhatsApp `+57 311 444 5233` · Instagram `@mist.design.co`

---

## 1. Diagnóstico de la Web Actual (`mistdesignco.com`) y Mejoras en el Nuevo Diseño

| Aspecto | Hallazgo en la Web Actual (`mistdesignco.com`) | Solución Implementada en el Nuevo Diseño |
|---|---|---|
| **Sistema Visual & Tipografía** | Plantilla genérica de Hostinger Builder usando únicamente `Montserrat` para todo y fondos blancos planos con botones estándar. | **Rediseño Editorial Fiel a la Estructura Original**: Tipografía 100% **`Montserrat`** (pesos 300–800), preservando bloque a bloque el orden y contenido original de `mistdesignco.com` con jerarquía visual limpia, fondo `#FFFFFF` / `#FAF8F5` / `#E7DFD4` y verde institucional `#04241F` / `#1C422D`. |
| **Bug Crítico SEO (JSON-LD)** | En `<head>` global se inyectó un `<script type="application/ld+json">` placeholder de plantilla con `"name": "Nombre del Producto (ej. Poltrona Concha)"` y `"price": "1200000"` en **todas** las 117 URLs. | Eliminación del JSON-LD placeholder y arquitectura limpia orientada a metadatos reales por página. |
| **Errores e Inconsistencias de Catálogo** | 1) `comedor-litmus-table-and-sillas-cantilever1` ($12.000.000) tenía título duplicado cuando su descripción real es **Comedor Tulip Table & Sillas Cane**. 2) Colección `Lamparás` duplicada dos veces con tilde errada. 3) `Personalizar producto` ($0 COP) aparecía mezclado como producto comprable. | Título corregido a **Comedor Tulip Table & Sillas Cane**, colecciones de iluminación unificadas en **Iluminación**, y el servicio de personalización trasladado a su sección dedicada (`manifiesto.html#personalizar`). |
| **Navegación & Descubrimiento** | Menú superior saturado con más de 15 ítems, obligando a navegar entre múltiples páginas aisladas sin filtros combinados. | Menú editorial de 6 accesos + **Catálogo unificado (`catalogo.html`)** con filtros en vivo por **Ambiente**, **Tipo de Pieza**, **Tendencia/Curaduría**, **Buscador instantáneo** y **Ordenación por precio**. |
| **Experiencia de Compra** | Flujo rígido de builder sin vista rápida ni descuento de comunidad integrado en bolsa. | **Quick-View modal** con selector de variantes (`Telas` vs `Cuero`, colores, medidas), cambio de foto en *hover* y **Bolsa lateral (`Cart Drawer`)** con cupón `MIST10` (10% OFF) y cierre directo por WhatsApp. |

---

## 2. Estructura del Nuevo Sitio (`/mist-web/`)

- **`index.html`**: Portada editorial con Hero dual (video + tendencias Cromo y Mascotas), las 5 curadurías emocionales (`01–05`), exploración por 8 ambientes, 8 piezas protagonistas, tendencia Cromo + paleta de temporada, bloque Pet-Friendly, pilares de origen colombiano, Diario MIST y suscripción `10% OFF`.

- **`catalogo.html`**: Las **75 piezas activas** filtrables en vivo por Ambiente, Tipo de Pieza, Curadurías (`Cromos`, `EL TOQUE MIST`, `Alianza Muna`, `01–05`), búsqueda instantánea y ordenación.

- **`producto.html`**: Ficha técnica completa por `slug` con galería, selector interactivo de variantes/acabados y precio dinámico, tabla de especificaciones, acordeones de tiempos artesanales (`20 días hábiles + 5–10 días envío`) y piezas relacionadas.

- **`manifiesto.html`**: Manifiesto Bauhaus, 4 pilares de materialidad (*Flor Morado*, *Telas Inteligentes & Cuero*, *Espumas Alta Densidad*, *Hierro & Cromo*), servicio **Personalizar a Medida (40 min gratis)**, programa **Alianzas Mist Trade** con formulario a WhatsApp y datos del Showroom Bogotá.

- **`diario.html`**: Lector editorial integrado con los **13 artículos y proyectos** (*Colores en Tendencia*, *Tendencia Cromo*, *Telas Inteligentes*, *Medical Works*, *Mist x gef*, *Feria del Hogar 2026*, *Vassar*, etc.).

- **`politicas.html`**: Términos y condiciones, envíos, cambios, derecho de retracto (Ley 1480 de 2011) y privacidad (Ley 1581 de 2012).

---

## 3. Resumen por Ambientes & Curadurías

| Ambiente / Categoría | Piezas |
|---|---:|
| Sala | 53 |
| Comedor | 19 |
| Habitación | 17 |
| Estudio | 1 |
| Verano Atemporal | 7 |
| Iluminación | 7 |
| Decoración y Styling | 4 |
| Mascotas | 6 |
| Sofás | 13 |
| Poltronas | 10 |
| Sillas | 5 |
| Mesas | 22 |
| Espejos | 1 |
| Cojines | 3 |
| Cromos | 6 |
| EL TOQUE MIST | 15 |
| Alianza Muna | 8 |

---

## 4. Inventario Completo de Piezas (75 Productos)

| # | Pieza | Precio Base (COP) | Variantes | Categorías |
|---:|---|---:|---:|---|
| 1 | Comedor Tulip Table & Sillas Cane (`comedor-litmus-table-and-sillas-cantilever1`) | $12,000,000 | 1 | Mesas, Sala, Comedor, ✨ Los que merecen algo extraordinario. |
| 2 | Comedor Litmus Table & Sillas Cantilever (`comedor-litmus-table-and-sillas-cantilever`) | $7,400,000 | 1 | Mesas, Sala, Comedor, ✨ Los que merecen algo extraordinario. |
| 3 | Bellini Sofa 2 módulos (`bellini-sofa-2-modulos-`) | $4,340,000 | 2 | Sofás, Sala, ✨ Los que merecen algo extraordinario. |
| 4 | Tótem Table (`totem-table-`) | $980,000 | 5 | ✨ Los aman quedarse en casa, Mesas, Sala, EL TOQUE MIST |
| 5 | Sputnik Lamp (`sputnik-lamp`) | $1,510,000 | 1 | EL TOQUE MIST, Habitación, Iluminación |
| 6 | Lindby  Lamp (`lindby-lamp`) | $2,720,000 | 5 | EL TOQUE MIST, Habitación, Iluminación |
| 7 | Cane Chair (`silla-cane`) | $1,840,000 | 1 | Comedor, Sillas |
| 8 | Tulip Table (`tulip-table`) | $5,976,000 | 1 | Mesas, Sala, Comedor |
| 9 | Wassily Chair (`wassily-chair`) | $3,500,000 | 1 | ✨ Los que reconocen una buena pieza a primera vista., Alianza Muna, Comedor, Sillas |
| 10 | Sofá 2 Puestos Lounge (`sofa-2-puestos-lounge`) | $3,140,000 | 1 | Sala, Comedor, Verano Atemporal |
| 11 | Cantilever Chair (`cantilever-chair1`) | $1,346,000 | 1 | Comedor, Sillas, Cromos |
| 12 | Ochre Table (`tienda-sala-ochre-table`) | $620,000 | 5 | Sala, Habitación, EL TOQUE MIST, Mesas |
| 13 | Book Holder (`tienda-decoracion-sujetalibros`) | $380,000 | 5 | ✨ Los que aman los detalles, Habitación, Decoración y Styling, Cojines |
| 14 | Helo Table (`tienda-mesas-helo-table`) | $1,380,000 | 1 | Mesas, Sala, EL TOQUE MIST |
| 15 | Solo Table (`solo-table`) | $355,000 | 20 | ✨ Los que aman los detalles, EL TOQUE MIST, Mesas, Sala |
| 16 | Studio 54 Table (`studio-54-table-glamour-anos-60`) | $1,076,000 | 2 | ✨ Los aman quedarse en casa, EL TOQUE MIST, Mesas, Sala |
| 17 | Oak wood (`oak-wood`) | $1,020,000 | 1 | Mesas, Sala |
| 18 | Oak Marmol (`oak-marmol-madera-maciza`) | $1,817,000 | 1 | Mesas, Sala |
| 19 | Retro Table (`retro-table-diseno-industrial`) | $1,130,000 | 2 | Mesas, Sala, Cromos |
| 20 | Pine Wood Table (`mesa-de-centro-conica`) | $1,120,000 | 1 | Mesas, Sala |
| 21 | Walnut Table (`mesas-de-madera-unicas`) | $1,120,000 | 1 | ✨ Los que siempre tienen la casa abierta., Mesas, Sala, Alianza Muna |
| 22 | Float Table (`float-table-mesa-de-vidrio`) | $1,120,000 | 1 | Sala, Mesas |
| 23 | Revee Table (`sala-de-estar-revee-table`) | $1,155,000 | 1 | Mesas, Sala |
| 24 | Retro Waves Table (`retro-waves-table`) | $1,155,000 | 7 | ✨ Los que reconocen una buena pieza a primera vista., Mesas, Sala, Alianza Muna |
| 25 | Runa Table (`mesa-auxiliar-conica`) | $1,690,000 | 1 | Mesas, Sala |
| 26 | Solo Mármol (`mesa-de-marmol`) | $560,000 | 1 | ✨ Los que siempre tienen la casa abierta., Sala, Habitación, Mesas |
| 27 | Pedestable (`mueble-decorativo-pedestable`) | $820,000 | 1 | Sala, Mesas |
| 28 | Muse Sofa (`muebles-minimalistas-muse-sofa`) | $4,554,000 | 12 | Sala, Sofás |
| 29 | Modular Chaise (`chaise-modular`) | $3,680,000 | 14 | Alianza Muna, Sala, Sofás |
| 30 | WildChair (`wildchair-sillon-moderno`) | $2,100,000 | 1 | Poltronas, Sala |
| 31 | Bellini Sofa (`bellini-sofa-modular`) | $8,680,000 | 8 | Sala, Sofás |
| 32 | Chaise Lounge (`sillas-modernas-chaise-lounge`) | $3,520,000 | 12 | Sofás, Sala |
| 33 | Conquer Sofa (`sofa-contemporaneo-oconquer-sofa`) | $4,032,000 | 13 | Sala, Sofás |
| 34 | Lily Sofa (`lily-sofa-de-diseno`) | $3,940,000 | 8 | Sala, Sofás |
| 35 | Pit Sofa (`pit-sofa-modular`) | $5,510,000 | 13 | Sofás, Sala |
| 36 | Sectional Sofa (`sectional-sofa-modular`) | $5,170,000 | 10 | Sofás, Sala |
| 37 | Curvy Sofa (`curvy-sofa`) | $3,520,000 | 11 | Sofás, Sala |
| 38 | Lounge Waves (`lounge-waves-sofa-modular`) | $3,660,000 | 8 | Sofás, Sala |
| 39 | Chaise curvy Sofa (`sofa-comodo-chaise-curvy-sofa`) | $3,290,000 | 12 | Sofás, Sala |
| 40 | Pillow Party (`pillow-party`) | $420,000 | 1 | EL TOQUE MIST, Habitación, Decoración y Styling, Cojines |
| 41 | Pillow Hug (`pillow-hug`) | $210,000 | 4 | EL TOQUE MIST, Habitación, Decoración y Styling, Cojines |
| 42 | June Lamp (`june-lamp`) | $1,580,000 | 1 | Alianza Muna, Habitación, Iluminación |
| 43 | Ecrú Lamp (`ecru-lamp`) | $460,000 | 6 | ✨ Los que aman los detalles, EL TOQUE MIST, Habitación, Iluminación |
| 44 | Retro Mirror (`espejo-de-gran-formato`) | $1,072,000 | 11 | ✨ Los que aman los detalles, EL TOQUE MIST, Espejos, Decoración y Styling |
| 45 | Bulbs Lamp (`bulbs-lamp-`) | $2,010,000 | 1 | Habitación, Iluminación |
| 46 | Disco Lamp (`disco-lamp-`) | $1,128,000 | 1 | ✨ Los que reconocen una buena pieza a primera vista., EL TOQUE MIST, Habitación, Iluminación |
| 47 | Deco Lamp (`deco-lamp`) | $1,235,000 | 5 | ✨ Los aman quedarse en casa, EL TOQUE MIST, Habitación, Iluminación |
| 48 | Casina Chair (`casina-chair`) | $1,815,000 | 2 | Sala, Comedor, Sillas |
| 49 | Cantilever Chair (`cantilever-chair`) | $1,090,000 | 2 | Comedor, Sillas |
| 50 | Timeless Table (`timeless-table`) | $2,673,000 | 1 | Mesas, Sala, Comedor |
| 51 | Comedor Lounge Mist (`comedor-lounge-mist-`) | $8,560,000 | 1 | Sala, Comedor, Verano Atemporal |
| 52 | Midie Table (`mesas-de-comedor-midie-table`) | $2,860,000 | 1 | Mesas, Sala, Comedor |
| 53 | Rainbow Table (`rainbow-table`) | $3,680,000 | 1 | Comedor |
| 54 | Litmus Table (`litmus-table`) | $3,820,000 | 1 | Mesas, Sala, Comedor |
| 55 | Astro Chair (`pieza-disruptiva-astro-chair`) | $1,498,000 | 11 | ✨ Los que reconocen una buena pieza a primera vista., Poltronas, Sala, Habitación |
| 56 | Concha Chair (`concha-chair`) | $3,680,000 | 1 | Poltronas, Sala, Habitación |
| 57 | Arm Chair (`poltrona-armchair`) | $1,912,000 | 12 | ✨ Los aman quedarse en casa, Poltronas, Sala |
| 58 | Loungy Chair (`diseno-de-mediados-de-siglo-loungy-chair`) | $1,245,000 | 7 | Sala, Poltronas |
| 59 | Retro Chair (`retro-chair`) | $2,080,000 | 9 | ✨ Los que siempre tienen la casa abierta., Alianza Muna, Poltronas, Sala |
| 60 | Edgy Chair (`edgy-chair-madera`) | $2,120,000 | 9 | Poltronas, Sala |
| 61 | Belli Chair (`poltrona-robusta-belli-chair`) | $3,555,000 | 9 | Poltronas, Sala |
| 62 | Bubble Chair (`poltrona-bubble-chair`) | $3,555,000 | 9 | Poltronas, Sala, Habitación |
| 63 | Floyd chair (`poltrona-cilindrica-floyd-chair`) | $2,065,000 | 8 | Poltronas, Sala, Habitación |
| 64 | Totem Balance (`estacion-de-alimentacion-elevada-totem-balance`) | $1,703,000 | 3 | Mascotas |
| 65 | Cama Nido (`cama-circular`) | $960,000 | 3 | Mascotas |
| 66 | Cama Nido Orbit (`modelo-nido-tradicional`) | $1,322,000 | 2 | Mascotas |
| 67 | Cama Nube (`cama-tipo-nube`) | $996,000 | 3 | Mascotas |
| 68 | Mesa Refugio Mist (`mesa-auxiliar-mascotas`) | $1,160,000 | 3 | Mascotas |
| 69 | Modular Mini (`sistema-de-descanso-para-gatos-modular-mini`) | $1,812,000 | 3 | Mascotas |
| 70 | Poltrona lounge (`poltrona-lounge-para-ambientes-exteriores`) | $1,710,000 | 1 | Sala, Comedor, Verano Atemporal |
| 71 | Mesa auxiliar con Ruedas (`tienda-comedor-mesa-auxiliar`) | $1,100,000 | 1 | Sala, Comedor, Verano Atemporal |
| 72 | Comedor de Exterior Lounge (`comedor-de-exterior-lounge`) | $6,020,000 | 1 | Sala, Comedor, Verano Atemporal |
| 73 | Comedor Redondo Lounge (`comedor-redondo-lounge-`) | $6,020,000 | 1 | Sala, Comedor, Verano Atemporal |
| 74 | Sala Lounge  Mist (`sala-lounge`) | $8,010,000 | 1 | Sala, Comedor, Verano Atemporal |
| 75 | Peace Sofa (`peace-sofa-cama`) | $3,980,000 | 1 | Sofás, Sala, Estudio |
