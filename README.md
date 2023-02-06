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
- MONGODB
- Bibliotecas: express, express-handlebars, express-session, mongoose, connect-mongo, dotenv, connect-flash, nodemailer

## Como acessar
- **Deploy** <br>
  https://controledeusuarios.onrender.com/
- **Para instalar e executar o projeto** <br>
  1. Fazer clone deste repositório. <br>
     `https://github.com/simeaomessias/controledeusuarios.git`
  2. Certificar que o npm está instalado. <br>
     O npm pode ser obtido instalando o [Node](https://nodejs.org/en/).
  3. Configurar os valores da seguintes variaveis de ambiente para o banco de dados e para o nodemailer:<br>
     - mongoUri (endereço para um banco MongoDB)<br>
     - emailServico (servidor SMTP)<br>
     - emailPorta (porta de conexão)<br>
     - emailUsuario (credencial do e-mail)<br>
     - emailSenha (credencial do e-mail)<br>
  4. Executar o comando *npm start*. <br>
     Acesse http://localhost:8081 para visualizar no navegador.

## Cronograma previsto
- **Dia 1 (31/01/23):** Criação e configuração do projeto. <br>
- **Dia 2 (01/02/23):** Tela de login. Tela de criação de conta. Tela principal do usuário comum. Tela principal do administrador.<br>
- **Dia 3 (02/02/23):** Continuação do dia 2 + testes simples
- **Dia 4 (03/02/23):** Classe para manipulação dos dados de usuários. Envio de senha por e-mail (inicial, alteração e redefinição pelo admin)  
- **Dia 5 (04/02/23):** Continuação do dia 4 + testes simples
- **Dia 6 (05/02/23):** Deploy para colegas testarem e sugerirem melhorias.

## Autor
https://github.com/simeaomessias

