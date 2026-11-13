# Mudança de escopo — Remoção do agendamento

> Solicitação do cliente registrada em 13/11/2026 e aplicada à versão React na mesma data.  
> Origem: pedido do cliente repassado ao grupo. Não há ata de reunião anexada a este registro.

## Descrição da mudança

O cliente pediu a remoção da parte de **agendar aula / agendar avaliação** do site. O único canal de contato passa a ser o **WhatsApp de cada marca**, que já existia no portal:

| Marca | Destino |
|---|---|
| PKZ | `https://wa.me/5521972657266` |
| One to One | `https://wa.me/5521971067347` |

A página de agenda demonstrativa (grade semanal, reserva e cancelamento locais) deixa de existir. A Fisioterapia continua sem agendamento e com contato pelo grupo.

## Critérios de aceitação — RQ-AGE-01

| Código | Condição verificável | Local no código |
|---|---|---|
| AGE01 | Não existir página nem componente de agendamento no site | `src/pages/` sem `Agenda.jsx`; `src/styles/` sem `agendamento.css` |
| AGE02 | Nenhum botão ou link do site levar a `/agendamento` (“Agendar aula”, “Agendar avaliação”, “Ver horários”, “Gerenciar”) | `SiteLayout.jsx`, `Pkz.jsx`, `OneToOne.jsx`, `Painel.jsx` |
| AGE03 | O menu das páginas PKZ e One to One oferecer “Falar no WhatsApp” com o número da marca no lugar de “Agendar aula” | `src/components/SiteLayout.jsx` |
| AGE04 | Nas páginas das marcas, o botão principal do topo abrir o WhatsApp da marca | `src/pages/Pkz.jsx`, `src/pages/OneToOne.jsx` |
| AGE05 | A Área do Atleta não exibir agenda nem “Próximo agendamento”; exibir “Fale com a equipe” com o WhatsApp da marca da sessão | `src/pages/Painel.jsx` |
| AGE06 | Links antigos `/agendamento` e `/agendamento.html` não resultarem em página quebrada: redirecionar para a seção de contato da marca (`?marca=pkz` → `/pkz#contato`, `?marca=oto` → `/one-to-one#contato`, sem marca → `/#contato`) | `src/App.jsx` (`SemAgendamento`) |
| AGE07 | Os FAQs não mencionarem agendamento pelo site; orientar contato pelo WhatsApp | `Pkz.jsx`, `Fisioterapia.jsx` |
| AGE08 | Os números de WhatsApp ficarem definidos em um único lugar para reuso | `src/lib/dados.js` (`whatsapp`) |

## O que foi mantido

- Páginas institucionais (Hub, PKZ, One to One, Fisioterapia), com os links de WhatsApp já existentes.
- Login demonstrativo e Área do Atleta, com indicadores, evolução, histórico, relatórios fictícios e edição de perfil.

## Impacto no projeto

- **Front-end:** remoção de `Agenda.jsx`, `agendamento.css` e das funções de reserva e de datas da agenda em `dados.js` (`lerReservas`, `resumoReserva`, `formatarData`, `diasAgenda`, `horasAgenda`, `dataDaAgenda`). O site passa a ter seis páginas.
- **Requisitos:** RF16–RF20 e RF23, além das regras RN01–RN06, RN09 e RN11, ficam marcados como removidos; RF08, RF09, RF12, RF13 e RF22 foram ajustados; RF35 registra esta mudança. Ver [Requisitos.md](Requisitos.md).
- **Testes:** os testes automatizados da agenda foram substituídos por verificações de que não restam links para agendamento e de que os WhatsApp das marcas estão presentes.
- **Dados locais antigos:** reservas salvas em navegadores por versões anteriores (`grupo-pkz-oto-v1-reservas-*`) não são mais lidas nem apagadas pelo site.
- **Documentação histórica:** transcrição, brainstorm, AHT ilustrada, mapa mental ilustrado e registros de sprint mantêm o conteúdo original; recebem apenas notas de adendo apontando para este documento.
