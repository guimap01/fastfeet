# GoStack
Projeto final do bootcamp GoStack

Instruções para utilização:

Na raiz do projeto, execute yarn ou npm install para instalação das dependências;

Utilizando o Docker, execute os seguintes codigos:

Postgres: $ docker run --name (name_DB) -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432;

Redis: $ docker run --name (name_Redis) -p 6379:6379 -d -t redis:alpine;

Utilize os dados inseridos na criação dos bancos de dados no arquivo .env para configura-lo, o arquivo .env fica localizado na pasta backend.

# Inicialização:

* Backend: na raiz do backend execute o comando "yarn dev" para iniciar o programa e em outro terminal, também na raiz do backend execute "yarn queue" para iniciar a função de envio de e-mails.

* Frontend: na raiz do frontend execute o comando "yarn start"

* Mobile: Projeto construido apenas para Android. Para iniciar o aplicativo execute o comando "react-native run-android" na raiz do mobile.
