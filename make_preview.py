"""Cria HTML com CSS, JS e imagens embutidos para prévia offline."""
from pathlib import Path
import base64, mimetypes
ROOT=Path(__file__).resolve().parent
html=(ROOT/'index.html').read_text()
css=(ROOT/'styles.css').read_text()
js=(ROOT/'app.js').read_text()
html=html.replace('<link rel="stylesheet" href="styles.css" />',f'<style>\n{css}\n</style>')
html=html.replace('<script type="module" src="app.js"></script>',f'<script type="module">\n{js}\n</script>')
for item in (ROOT/'assets').glob('*'):
    name='assets/'+item.name
    mime=mimetypes.guess_type(item.name)[0] or 'application/octet-stream'
    uri=f'data:{mime};base64,'+base64.b64encode(item.read_bytes()).decode('ascii')
    html=html.replace(name,uri)
out=ROOT.parent/'ONDE_Prototipo_v3_Interativo.html'
out.write_text(html)
print(out, out.stat().st_size)
