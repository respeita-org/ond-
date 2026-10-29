import test from 'node:test';
import assert from 'node:assert/strict';
import {experiences, filterExperiences, formatQuote, getWhatsAppUrl} from '../app.js';

test('catálogo lista 8 experiências únicas',()=>{assert.equal(experiences.length,8);assert.equal(new Set(experiences.map(e=>e.id)).size,8);});
test('filtros mostram apenas a categoria selecionada',()=>{assert.equal(filterExperiences('Todas').length,8);assert.equal(filterExperiences('Gastronomia').length,2);assert.ok(filterExperiences('Praias').every(e=>e.category==='Praias'));assert.equal(filterExperiences('Inexistente').length,0);});
test('mensagem exige interesse e preserva campos preenchidos',()=>{assert.throws(()=>formatQuote({interest:''}));const message=formatQuote({interest:'Concierge local',when:'novembro',people:'2 pessoas',notes:'Sem correria'});assert.match(message,/Concierge local/);assert.match(message,/novembro/);assert.match(message,/2 pessoas/);assert.match(message,/Sem correria/);});
test('não acrescenta campos opcionais vazios',()=>{const m=formatQuote({interest:'Roteiro personalizado',when:'',people:'',notes:''});assert.doesNotMatch(m,/Quando:|Pessoas:|Observações:/);});
test('só cria link WhatsApp com número configurado válido',()=>{assert.equal(getWhatsAppUrl('', 'Oi'),null);assert.equal(getWhatsAppUrl('123', 'Oi'),null);assert.match(getWhatsAppUrl('5573999999999','Olá ONDÊ'),/^https:\/\/wa\.me\/5573999999999\?text=/);});
