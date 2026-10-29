"""Testes visuais e interações do protótipo com Playwright.
Rodar com: python -m pytest tests/test_browser.py
Requer: pip install pytest playwright; python -m playwright install chromium
"""
import os
import http.server
import threading
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).parents[1]

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *_args): pass


def test_full_flow():
    from functools import partial
    srv=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=srv.serve_forever,daemon=True).start()
    url=f'http://127.0.0.1:{srv.server_port}'
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch(headless=True,**({'executable_path':os.environ['CHROME_BIN']} if os.getenv('CHROME_BIN') else {}))
            for name,width,height in [('desktop',1440,900),('mobile',390,844)]:
                page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
                errors=[]
                page.on('pageerror',lambda e: errors.append(str(e)))
                page.goto(url,wait_until='networkidle')
                assert page.locator('h1').count()==1
                assert page.locator('h1').inner_text().find('TRANCOSO')!=-1
                assert page.locator('.experience-card').count()==8
                assert page.locator('.gateway').count()==2
                assert page.locator('#roteiros').count()==1
                assert page.locator('#servicos').count()==1
                assert page.locator('body').evaluate('(e)=>e.scrollWidth <= innerWidth+2'), 'horizontal overflow'
                if name=='mobile':
                    page.locator('#menu-toggle').click()
                    assert page.locator('#menu-toggle').get_attribute('aria-expanded')=='true'
                    page.locator('#main-nav a[href="#guia"]').click()
                    assert page.locator('#menu-toggle').get_attribute('aria-expanded')=='false'
                page.locator('[data-filter="Gastronomia"]').click()
                assert page.locator('.experience-card').count()==2
                page.locator('.experience-open').first.click()
                assert page.locator('#experience-dialog').evaluate('(e)=>e.open')
                page.locator('#dialog-close').click()
                assert not page.locator('#experience-dialog').evaluate('(e)=>e.open')
                page.locator('#quote-form button[type=submit]').click()
                assert page.locator('#form-error').is_visible()
                page.locator('#interest').select_option(label='Concierge local')
                page.locator('#people').select_option(label='2 pessoas')
                page.locator('#quote-form button[type=submit]').click()
                assert page.locator('#message-result').is_visible()
                assert 'Concierge local' in page.locator('#message-preview').inner_text()
                assert not errors,errors
                if name=='desktop':
                    page.goto(url,wait_until='networkidle')
                    page.screenshot(path=str(ROOT/'screenshots'/'home_desktop.png'),full_page=False)
                    page.locator('#escolhas').scroll_into_view_if_needed()
                    page.screenshot(path=str(ROOT/'screenshots'/'roteiros_servicos_desktop.png'),full_page=False)
                    page.screenshot(path=str(ROOT/'screenshots'/'pagina_completa_desktop.png'),full_page=True)
                else:
                    page.goto(url,wait_until='networkidle')
                    page.screenshot(path=str(ROOT/'screenshots'/'home_mobile.png'),full_page=False)
                    page.screenshot(path=str(ROOT/'screenshots'/'pagina_completa_mobile.png'),full_page=True)
                page.close()
            browser.close()
    finally:srv.shutdown()
