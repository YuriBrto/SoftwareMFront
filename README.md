🔐 Sistema de Intalação com Angular e Java
Este repositório contém o desenvolvimento full-stack de um sistema de instalação de softwares robusto e escalável, criado para a disciplina de Arquitetura de Software. O frontend foi desenvolvido com Angular standalone, TypeScript e SCSS, enquanto o backend inicialmente utilizava Spring Boot com REST, atualmente em processo de migração para uma arquitetura de microserviços com SOAP, conforme nova diretriz acadêmica.

📌 Visão Geral
O sistema foi idealizado para atender dois perfis de usuários:

Professores, que podem solicitar a instalação de softwares em laboratórios.

Administradores, responsáveis por gerenciar usuários e softwares disponíveis.

A solução visa:

✅ Segurança: Autenticação com JWT, controle de sessão e rotas protegidas com guards.

✅ Modularidade: Componentes reutilizáveis e organização parent-child.

✅ Usabilidade: Interface responsiva e acessível, pensada no público-alvo.

✅ Escalabilidade: Código estruturado para facilitar evolução futura.

✅ Boas práticas: Uso de interceptors para envio automático do token e tratamento centralizado de erros.

🚀 Funcionalidades do Frontend
🔑 Tela de login estruturada com componentes aninhados.

🔐 Autenticação com JWT e proteção de rotas com guards.

🧩 Componentes reutilizáveis para:

Listagem de dados

Formulários

Feedback de ações via toasts

🧑‍🏫 Painel do professor com solicitação de softwares por laboratório.

🛠️ Painel do administrador para gestão de usuários e softwares.

⚙️ Interceptor HTTP para envio de token e captura centralizada de erros.

📱 Layout responsivo com foco em acessibilidade e experiência de uso.

🐞 Problemas Resolvidos
Durante o desenvolvimento, foi identificado um problema em que o token JWT era recebido como undefined, o que impedia a associação correta entre solicitações e o usuário logado. Isso foi resolvido por meio da revisão do fluxo de autenticação e do envio de headers HTTP.

🧱 Estrutura do Projeto
bash
Copiar
Editar
/backend      -> API em Java (Spring Boot) - em refatoração para microserviços SOAP
/frontend     -> Aplicação Angular standalone com SCSS
🛠️ Tecnologias Utilizadas
Backend
Java

Spring Boot

Spring Security

Banco de Dados relacional (ex: PostgreSQL)

Frontend
Angular (standalone)

TypeScript

SCSS

RxJS

📚 Informações Acadêmicas
Curso: Engenharia de Software
Turma: 01 - Noturno
Disciplina: Arquitetura de Software
Tecnologia escolhida: Angular (https://angular.dev/)

📎 Em Desenvolvimento
A migração para microserviços e a integração completa entre backend e frontend seguem em andamento, com foco em aprimorar a escalabilidade e modularidade da solução.

