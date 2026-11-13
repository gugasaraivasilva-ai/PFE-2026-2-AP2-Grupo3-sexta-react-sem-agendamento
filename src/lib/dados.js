// Utilitários compartilhados da demonstração. Mesmo prefixo do projeto HTML original.
export const prefixo = 'grupo-pkz-oto-v1-';
export function lerLista(chave) {
  const texto=localStorage.getItem(prefixo+chave);
  if (!texto) return [];
  const lista=JSON.parse(texto);
  if (!Array.isArray(lista)) throw new Error('Formato de dados inválido.');
  return lista;
}
export function salvarLista(chave,lista) {localStorage.setItem(prefixo+chave,JSON.stringify(lista));}
// Único canal de contato do site (o agendamento online foi removido a pedido do cliente).
export const whatsapp={pkz:'https://wa.me/5521972657266',oto:'https://wa.me/5521971067347'};
export function nomeDaMarca(marca) {return marca==='oto'?'One to One':'PKZ';}
export function salvarSessao(perfil) {sessionStorage.setItem(prefixo+'sessao',JSON.stringify(perfil));}
export function lerSessao() {
  try {
    const s=JSON.parse(sessionStorage.getItem(prefixo+'sessao'));
    return s && typeof s.nome==='string' && typeof s.email==='string' && ['pkz','oto'].includes(s.marca) ? s : null;
  } catch {return null;}
}
