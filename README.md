# RM CAFE

Sitio web multipágina responsive para una cafetería ficticia, hecho con Flask, HTML, CSS y JavaScript. Incluye portada, carta interactiva, historia del café, información para visitarlo y un diario editorial; la navegación y el pie de página conectan todas las secciones.

## Ejecutar en local

1. Crea y activa un entorno virtual:

   ```powershell
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   ```

2. Instala las dependencias e inicia el servidor:

   ```powershell
   pip install -r requirements.txt
   python app.py
   ```

3. Abre `http://127.0.0.1:5000` en el navegador. Las páginas disponibles son:
   - `/` — Inicio
   - `/carta` — Carta con filtros y fichas de producto
   - `/nuestra-casa` — Historia e identidad
   - `/visitanos` — Dirección, horario y contacto
   - `/diario` — Artículos editoriales

Las fotografías y tipografías se cargan desde servicios externos, por lo que necesitas conexión a internet para ver la página completa. La dirección, el teléfono y los enlaces sociales son datos de demostración y deben actualizarse antes de publicar.
