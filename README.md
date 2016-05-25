# htop-as-a-service

## O que é?

O htop-as-a-service é um serviço REST criado em nodejs que tem como objetivo disponibilizar as informações que podem ser encontradas no aplicativo htop como um serviço REST. 

## Como instalar

1. git clone https://github.com/bundz/htop-as-a-service.git
2. Dentro da pasta htop-as-a-service execute sudo setup.sh
3. sudo npm install

## Como rodar
1.npm start

## Como utilizar
Com o serviço rodando ele estará escutando por padrão a porta 3001. Atualmente existem dois serviços disponíveis: main e virt-top.

O serviço main é responsável por disponibilizar as informações de uso de cpu e de memória e pode ser acessado através da rota:
http://{ip da máquina}:3001/

O serviço virt-top é responsável por disponibilizar as informações de consumo de cpu e de memória das máquinas virtuais e pode ser acessado através da rota:
http://{ip da máquina}:3001/virt-top
