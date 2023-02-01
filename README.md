# Sistema de Controle de Usuários

Problema idealizado para o primeiro projeto da **Mentoria Conquiste Sua Vaga - Time 23B.**

## Objetivo
- Começar a colocar em prática a metodologia **CTD (Código Todo Dia)** a partir de um problema com estimativa pessoal de 6 dias para ser resolvido.

## Funcionalidades
- **USUÁRIO COMUM**<br>
  1. Deverá criar uma conta/perfil antes de acessar o sistema. <br>
  2. Ao criar a conta, receberá um e-mail com a senha de acesso gerada aleatoriamente. Esta senha poderá ser alterada posteriormente. <br>
  3. Após fazer login, será direcionado para sua página principal. <br><br>
     **Página principal:**<br>
     a) Visualização dos demais usuários cadastrados no sistema.<br>
     b) Link para alteração de senha.<br>
     c) Link para editar as informações do perfil e visibilidade de suas informações de contato na lista de usuários cadastrados.<br>

- **ADMINISTRADOR**<br>
  1. Após fazer login, será direcionado para sua página principal. <br><br>
     **Página principal:**<br>
     a) Visualização de todos os usuários cadastrados no sistema.<br>
     b) Link para reiniciar senha de usuário comum (envio de nova senha aleatória por e-mail).<br>
     c) Link para editar as condições de acesso de cada usuário comum.<br>
        - **ativo**: usuário comum faz login e consegue acessar sua página inicial.<br>
        - **inativo**: usuário comum faz login, mas não consegue acessar as informações dos demais contatos na lista geral.<br>
        - **bloqueado**: usuário comum não consegue fazer login.<br>
  
## Tecnologias que serão utilizadas
- HTML5
- CSS3
- JAVASCRIPT
- NODE.JS
- Bibliotecas: express, express-handlebars, express-session, mongoose, connect-mongo, dotenv, connect-flash, nodemailer

## Cronograma previsto
- **Dia 1 (31/01/23):** Criação e configuração do projeto. <br>
- **Dia 2 (01/02/23):** Tela de login. Tela de criação de conta. Tela principal do usuário comum. Tela principal do administrador.<br>
- **Dia 3 (02/02/23):** Continuação do dia 2 + testes simples
- **Dia 4 (03/02/23):** Classe para manipulação dos dados de usuários. Envio de senha por e-mail (inicial, alteração e redefinição pelo admin)  
- **Dia 5 (04/02/23):** Continuação do dia 4 + testes simples
- **Dia 6 (05/02/23):** Deploy para colegas testarem e sugerirem melhorias.

## Autor
https://github.com/simeaomessias

