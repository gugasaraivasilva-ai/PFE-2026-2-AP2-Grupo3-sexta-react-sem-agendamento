import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync,existsSync,readdirSync } from 'node:fs';
import { join,dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {prefixo,lerLista,salvarLista,salvarSessao,lerSessao,nomeDaMarca,whatsapp} from '../src/lib/dados.js';

function storage(){const m=new Map();return {getItem(k){return m.has(k)?m.get(k):null},setItem(k,v){m.set(k,String(v))},removeItem(k){m.delete(k)}};}
globalThis.localStorage=storage();globalThis.sessionStorage=storage();
const root=join(dirname(fileURLToPath(import.meta.url)),'..');

test('marcas e contato por WhatsApp do projeto',()=>{
  assert.equal(nomeDaMarca('pkz'),'PKZ');assert.equal(nomeDaMarca('oto'),'One to One');
  assert.equal(whatsapp.pkz,'https://wa.me/5521972657266');
  assert.equal(whatsapp.oto,'https://wa.me/5521971067347');
});
test('listas persistem no armazenamento local e formato inválido é rejeitado',()=>{
  salvarLista('contas',[{email:'aluno@demo.com'}]);
  assert.deepEqual(lerLista('contas'),[{email:'aluno@demo.com'}]);
  assert.equal(localStorage.getItem(prefixo+'contas').includes('aluno@demo.com'),true);
  localStorage.setItem(prefixo+'malformada','{}');
  assert.throws(()=>lerLista('malformada'),/Formato de dados inválido/);
});
test('sessão demonstrativa é separada e validada',()=>{
  assert.equal(lerSessao(),null);
  salvarSessao({nome:'Aluno',email:'aluno@demo.com',marca:'oto',demo:true});
  assert.equal(lerSessao().marca,'oto');
  sessionStorage.setItem(prefixo+'sessao',JSON.stringify({nome:'Aluno',email:'a',marca:'fisio'}));
  assert.equal(lerSessao(),null);
});
test('assets usados no JSX existem localmente e o site tem os seis componentes',()=>{
  const dir=join(root,'src','pages');
  const paths=['Hub','Pkz','OneToOne','Fisioterapia','Login','Painel'];
  assert.ok(!existsSync(join(dir,'Agenda.jsx')),'A página de agendamento deveria ter sido removida');
  for(const name of paths){assert.ok(existsSync(join(dir,name+'.jsx')),`Falta a página React ${name}`)}
  for(const folder of [dir,join(root,'src','components')])for(const f of readdirSync(folder).filter(f=>f.endsWith('.jsx'))){
    const contents=readFileSync(join(folder,f),'utf8');
    for(const match of contents.matchAll(/(?:src|href)="(\/assets\/[^"#?]+)"/g))assert.ok(existsSync(join(root,'public',match[1])),`Mídia ausente: ${match[1]} em ${f}`);
  }
});
