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
<http://{ip da máquina}:3001/>

o retorno do serviço main é um json como o exemplo abaixo:

```javascript
{
	"cpu": {
		"us": "9.6",
		"sy": "12.9",
		"ni": "0.0",
		"id": "74.6",
		"wa": "1.1",
		"hi": "0.0",
		"si": "1.8",
		"st": "0.0",
		"total": 25.400000000000006
	},
	"memory": {
		"total": "15942",
		"used": "2607",
		"free": "13334",
		"shared": "1",
		"buffers": "119",
		"cached": "1808"
	}
}
```

Onde o atributo cpu contem 9 atributos

**us:** user cpu time (or) % CPU time spent in user space
**sy:** system cpu time (or) % CPU time spent in kernel space
**ni:** user nice cpu time (or) % CPU time spent on low priority processes
**id:** idle cpu time (or) % CPU time spent idle
**wa:** io wait cpu time (or) % CPU time spent in wait (on disk)
**hi:** hardware irq (or) % CPU time spent servicing/handling hardware interrupts
**si:** software irq (or) % CPU time spent servicing/handling software interrupts
**st:** steal time - - % CPU time in involuntary wait by virtual cpu while hypervisor
**total:** total % CPU usage

O serviço virt-top é responsável por disponibilizar as informações de consumo de cpu e de memória das máquinas virtuais e pode ser acessado através da rota:
<http://{ip da máquina}:3001/virt-top>
