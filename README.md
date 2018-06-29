# invGateTests

Los tests esta creados en  [Protractor](https://www.protractortest.org/#/)

## Setup

instalar por npm

```
npm install -g protractor
```
esto instalara 2 comandos 'protractor' 'webdriver-manager'

correr los siguientes comandos 
```
webdriver-manager update
```
```
webdriver-manager start
```
Esto dejara levantado un server de selenium en 
[ http://localhost:4444/wd/hub]( http://localhost:4444/wd/hub).

Para Ejecutar los tests en otra terminal ejecutar
```
protractor config.js
```