/** ONDÊ v3 — demonstração sem backend e sem envio de dados. */
export const WHATSAPP_NUMBER = ''; // Formato internacional sem +, ex.: 5573999999999. Não inventar número.

export const experiences = [
  {id:'vale',name:'Vale dos Búfalos',category:'Natureza',tag:'CAMPO · PÔR DO SOL',image:'assets/vale.webp',alt:'Pôr do sol dourado visto de um mirante',description:'Um lugar para desacelerar, conhecer histórias e apreciar a paisagem rural da região. Gastronomia local e pôr do sol são destaques da curadoria piloto.'},
  {id:'roca',name:'Ali na Roça',category:'Gastronomia',tag:'COMIDA · ENCONTROS',image:'assets/roca.webp',alt:'Restaurante artesanal com estrutura em madeira entre árvores',description:'Sabores artesanais e um ambiente intimista em contato com a natureza. O guia-piloto destaca pizzas, hambúrgueres e preparações feitas na própria casa.'},
  {id:'bena',name:'Aconchego da Bena',category:'Gastronomia',tag:'SABORES · CULTURA LOCAL',image:'assets/bena.webp',alt:'Buffet de comida caseira em um ambiente rústico',description:'Cozinha local e hospitalidade fazem parte da experiência. Consulte previamente horários, endereço e cardápio.'},
  {id:'nova',name:'A Nova Floresta',category:'Natureza',tag:'AGROFLORESTA · FUTURO',image:'assets/nova_floresta.webp',alt:'Horta em agrofloresta cercada pela mata',description:'Uma iniciativa de Trancoso ligada à agrofloresta, permacultura e bioconstrução. Visitas exigem agendamento e autorização da equipe.'},
  {id:'pau',name:'Parque Nacional do Pau Brasil',category:'Natureza',tag:'MATA ATLÂNTICA · CONSERVAÇÃO',image:'assets/pau_brasil.webp',alt:'Passarela em área de floresta sobre riacho',description:'A biodiversidade da Mata Atlântica em destaque. Consulte os canais oficiais do ICMBio sobre visitação, acesso e acompanhamento.'},
  {id:'ile',name:'Ilê Airá Modé',category:'Cultura',tag:'ARTE · ANCESTRALIDADE',image:'assets/ile.webp',alt:'Esculturas e arquitetura de um terreiro cercado por vegetação',description:'Um espaço de cultura afro-brasileira, arte e ancestralidade. Qualquer visita depende de autorização expressa da comunidade e respeito aos fundamentos da casa.'},
  {id:'itapororoca',name:'Praia de Itapororoca',category:'Praias',tag:'MAR · SILÊNCIO',image:'assets/itapororoca.webp',alt:'Vista aérea de faixa de areia e mar turquesa',description:'Um convite a caminhar, observar o litoral e aproveitar o ritmo tranquilo da paisagem, respeitando acessos e condições da maré.'},
  {id:'rio',name:'Rio da Barra',category:'Praias',tag:'RIO · MAR',image:'assets/rio_barra.webp',alt:'Encontro de rio com mar entre dunas e vegetação',description:'O encontro da água doce com o oceano revela uma paisagem especial. Planeje o deslocamento e confirme as condições de acesso e de maré.'}
];

export function filterExperiences(category) { return category === 'Todas' ? experiences : experiences.filter(e => e.category === category); }
export function formatQuote({interest,when,people,notes}) {
  if (!interest || !String(interest).trim()) throw new Error('Selecione um interesse.');
  const fields = ['Olá, ONDÊ! ☀️','Quero conversar sobre uma experiência em Trancoso.','','Interesse: '+String(interest).trim()];
  if (when && String(when).trim()) fields.push('Quando: '+String(when).trim());
  if (people && String(people).trim()) fields.push('Pessoas: '+String(people).trim());
  if (notes && String(notes).trim()) fields.push('Observações: '+String(notes).trim());
  fields.push('','Podem me ajudar com um orçamento ou indicação?');
  return fields.join('\n');
}
export function getWhatsAppUrl(number, message) {
  const value = String(number || '').replace(/\D/g, '');
  return /^\d{10,15}$/.test(value) ? `https://wa.me/${value}?text=${encodeURIComponent(message)}` : null;
}
function qs(s){ return document.querySelector(s); }
function escapeHtml(t) { return String(t).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function experienceCard(item, number) {return `<article class="experience-card" data-category="${escapeHtml(item.category)}"><button class="experience-open" type="button" data-experience="${escapeHtml(item.id)}" aria-label="Ver detalhes de ${escapeHtml(item.name)}"><div class="experience-image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" loading="lazy"/><span class="experience-number">${String(number).padStart(2,'0')}</span><span class="experience-corner" aria-hidden="true">↗</span></div><div class="experience-info"><p>${escapeHtml(item.tag)}</p><h3>${escapeHtml(item.name)}</h3><span class="experience-category">${escapeHtml(item.category.toUpperCase())} <span aria-hidden="true">→</span></span></div></button></article>`;}

function setInterest(value){const dropdown=qs('#interest');if([...dropdown.options].some(o=>o.value===value)) dropdown.value=value; else dropdown.value='Ainda não sei, quero ideias';qs('#quote-form').hidden=false;qs('#message-result').hidden=true;qs('#form-error').hidden=true;document.getElementById('orcamento').scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>dropdown.focus({preventScroll:true}),260);}

function bootstrap(){
  const nav=qs('#main-nav'), toggle=qs('#menu-toggle');
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');nav.classList.toggle('open',!open);document.body.classList.toggle('nav-open',!open);});
  nav.addEventListener('click',(e)=>{if(e.target.closest('a')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');document.body.classList.remove('nav-open');}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('nav-open');toggle.focus();}});

  const grid=qs('#guide-grid'), buttons=qs('#filter-buttons');
  function render(category){const list=filterExperiences(category);grid.innerHTML=list.map((e,i)=>experienceCard(e, i+1)).join('');qs('#guide-count').textContent=`${String(list.length).padStart(2,'0')} ${list.length===1?'DESCOBERTA':'DESCOBERTAS'}`;buttons.querySelectorAll('button').forEach(b=>{const active=b.dataset.filter===category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});}
  buttons.addEventListener('click',e=>{const button=e.target.closest('button[data-filter]');if(button) render(button.dataset.filter);});render('Todas');

  const dialog=qs('#experience-dialog');let currentExperience=null;
  grid.addEventListener('click',e=>{const button=e.target.closest('[data-experience]');if(!button)return;currentExperience=experiences.find(x=>x.id===button.dataset.experience);if(!currentExperience)return;qs('#dialog-image').src=currentExperience.image;qs('#dialog-image').alt=currentExperience.alt;qs('#dialog-category').textContent=currentExperience.tag;qs('#dialog-title').textContent=currentExperience.name;qs('#dialog-description').textContent=currentExperience.description;if(typeof dialog.showModal==='function')dialog.showModal();});
  qs('#dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  qs('#dialog-quote').addEventListener('click',()=>{if(currentExperience) {dialog.close();setInterest('Recomendações do guia');qs('#notes').value=`Gostaria de saber mais sobre ${currentExperience.name}.`;}});
  document.querySelectorAll('[data-interest]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();setInterest(el.dataset.interest);}));

  const form=qs('#quote-form');form.addEventListener('submit',e=>{
    e.preventDefault();const interest=qs('#interest').value;
    if(!interest){qs('#form-error').hidden=false;qs('#interest').focus();return;}
    qs('#form-error').hidden=true;
    const message=formatQuote({interest,when:qs('#when').value,people:qs('#people').value,notes:qs('#notes').value});
    qs('#message-preview').textContent=message;
    const link=getWhatsAppUrl(WHATSAPP_NUMBER,message);
    qs('#whatsapp-link').hidden=!link;if(link)qs('#whatsapp-link').href=link;
    qs('#contact-config-message').hidden=Boolean(link);
    form.hidden=true;qs('#message-result').hidden=false;qs('#message-result').scrollIntoView({behavior:'smooth',block:'nearest'});
  });
  qs('#edit-message').addEventListener('click',()=>{form.hidden=false;qs('#message-result').hidden=true;qs('#interest').focus();});
  qs('#copy-message').addEventListener('click',async()=>{
    const text=qs('#message-preview').textContent, output=qs('#copy-feedback');
    try{await navigator.clipboard.writeText(text);output.textContent='Mensagem copiada!';}
    catch{output.textContent='Selecione e copie a mensagem acima.';const range=document.createRange();range.selectNodeContents(qs('#message-preview'));window.getSelection().removeAllRanges();window.getSelection().addRange(range);}
  });
}
if (typeof document !== 'undefined') { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',bootstrap); else bootstrap(); }
