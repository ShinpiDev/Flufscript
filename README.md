# Flufscript 1.1

## Visão geral

**Flufscript** é uma linguagem de script de console de alto nível simples e fácil de aprender, projetada para fins educacionais e de integração. Foi criada para ser acessível para iniciantes, fornecendo funcionalidade suficiente para criar comandos e scripts simples.

**Flufscript** é uma HLCSLEI (High-Level Console Scripting Language for Educational and Integration Purposes *Linguagem de Script de Console de Alto Nível para Fins Educacionais e de Integração*), o que significa que é otimizada para uso em ambientes de console e é ideal para fins educacionais ou como ferramenta para integração com outros programas "*Javascript*" ou "*Flufscript*".

Como o **Flufscript** ainda está em desenvolvimento, suas capacidades estão atualmente limitadas a criação de scripts e comandos básicos. No entanto, ele fornece um ótimo ponto de partida para aqueles que são novos na programação e desejam aprender a criar comandos e scripts simples.

## Instalação e configuração

A **Flufscript** funciona com *Html* e "*Javascript*" sendo assim, você deve baixar esse repositório e extrair.

Abra o "*index.html*" em um servidor local ou hosteado para funcionar.

Após isso só abrir o "*index.fluf*" e começar a programar.

## Sintaxe

A sintaxe da linguagem **Flufscript** é projetada para ser simples e fácil de aprender. Os comandos são escritos em uma única linha e geralmente são compostos por uma palavra-chave seguida por um ou mais parâmetros separados por espaços. A maioria dos comandos termina com um ponto e vírgula "*;*". A linguagem não é orientada a objetos e não possui bibliotecas padrão, mas ainda é capaz de lidar com operações matemáticas simples e manipulação de texto. Os comentários são feitos usando o símbolo #, devem também terminar com "*;*" e podem ser adicionados em qualquer lugar na linha após "*;*" do comando. A sintaxe básica da linguagem é fácil de entender e pode ser dominada rapidamente por iniciantes.

Exemplo de comentário :

```
#Scripts e comentários devem terminar com o ponto e vírgula;
```

## Tipos de dados e variáveis

As variáveis são bem diferentes das convencionais, aqui você não define o tipo da variável com " ou ' ou definindo antes de criar ela, aqui você apenas coloca o valor e a própria linguagem traduz e converte para o valor desejado.

Para criar variáveis você deve colocar *var* e o nome desejado :

```
var nova_variavel;
```

Quando você criar uma variável, não se define o valor dela na mesma linha, você deve definir o valor dela em uma linha diferente :

```
var nome;
nome = Shinpi Dev;
```

e para acessar esse valor só colocar um % antes do nome da variável:

```
var nome;
nome = Shinpi Dev;
log %nome;
```

## Operadores

**Flufscript** oferece os operadores matemáticos básicos para manipulação de números, permitindo a realização de cálculos e operações com facilidade. O operador de soma (+) é utilizado para adicionar um valor a uma variável, enquanto o operador de subtração (-) é utilizado para subtrair um valor de uma variável. Já o operador de multiplicação (*) é utilizado para multiplicar um valor por uma variável, e o operador de divisão (/) é utilizado para dividir uma variável por um valor.

Além desses operadores básicos, **Flufscript** também oferece o operador de resto de divisão ($), que é utilizado para obter o resto da divisão de uma variável por um valor. Isso pode ser útil em diversos casos, como para verificar se um número é par ou ímpar.

Para definir o valor de uma variável em **Flufscript**, é utilizado o operador de definição (=), que atribui um valor a uma variável específica. Com esses operadores, é possível realizar uma ampla variedade de operações matemáticas em **Flufscript**.

### Um exemplo

```
var numero;
numero = 0; #define para 0;
numero = +1; #soma com 1;
numero = -1; #subtrai por 1;
numero = *1; #multiplica por 1;
numero = /1; #divide por 1;
numero = $1; #resto de divisão por 1;
```

## Funções

Em **Flufscript**, as funções são blocos de código que podem ser definidos pelo usuário e executados sempre que necessário. Para definir uma função, você precisa usar a sintaxe :

```
function nomeDaFunção;
    #script da função;
end;
```

O nome da função deve ser escolhido pelo usuário e é usado para identificar e chamar a função mais tarde. O script da função deve ser colocado aonde está escrito "*#script da função;*". 

As funções podem ser muito úteis para simplificar o código e reduzir a quantidade de trabalho que você precisa fazer repetidamente. Quando você chama uma função, o código dentro dela é executado em vez de ter que escrevê-lo novamente.

## Inclusões

Em Flufscript, não há bibliotecas ou módulos como em outras linguagens de programação, mas há um script especial chamado "include" que permite importar outros scripts para dentro do script atual. Isso pode ser útil para executar outras tarefas enquanto o script principal é executado.

Para usar o "include", basta digitar "include" seguido do nome do arquivo que você deseja importar, como este exemplo:

```
#Ele irá importar outro_script.fluf;
include outro_script;
```

Ao importar um script com o "include", as variáveis e funções desse script não compartilham o escopo do script atual. Isso significa que você pode executar outras tarefas com esse script sem afetar as variáveis e funções do script atual. No entanto, você pode usar as funções e variáveis importadas para executar outras tarefas, como criar funções auxiliares ou executar tarefas em paralelo.

## Todos os scripts

```
# todo script deve começar com ; na primeira linha e deve ser separado de todo o script;
;

# define uma variável chamada name;
var name;
name = 0;

# para acessar o valor da váriavel, você deve colocar % antes no nome dela, exemplo log %name;

# operações matemáticas
var numero;
numero = 0; #define para 0;
numero = +1; #soma com 1;
numero = -1; #subtrai por 1;
numero = *1; #multiplica por 1;
numero = /1; #divide por 1;
numero = $1; #resto de divisão por 1;

# mostra o valor da variável name no console;
log name;

# verifica se a variável name é igual a 0 e, se for, mostra true no console;
if name == 0 : log true;

# retorna à primeira linha do programa
back 0;

# solicita que o usuário digite um texto para salvar na váriavel %getInput;
input texto de input;

# Mostra um texto em uma janela de dialogo;
show texto;

# repete o comando log 'Olá mundo!' 5 vezes;
repeat 5 log Olá mundo!;

# cria um comentário e deve terminar com um ;
# este é um comentário em uma linha de código;

# cria um request e adiciona o script.fluf importado ao script atual;
include script;

# limpa o console;
clear

# Cria uma função;
function nomeDaFunção;
    #script da função;
end;

# executa uma função;
(nomeDaFunção);

# Executa uma série de comandos flufscript em uma única linha, os scripts devem ser separados por um $;
fluf(códigos_para_executar);

# Salva, Carrega ou Deleta um valor na memória
local <get/rem/set>:<args>;

local set ValorNaMem:%valor;
local get ValorNaMem:%valor;
local rem ValorNaMem;

# Cria uma janela Html;
createWindow;

# Define o tamanho da janela;
screenSize largura:altura;

# Adiciona uma linha javascript a janela;
screenJs scriptEmJs;

# Abre a janela;
windowStart;
```

## Suporte e comunidade

Nosso forúm online [Acessar](https://flufscript.foroactivo.com/)

## Créditos

Linguagem desenvolvida por Shinpi Dev e com a ajuda de Yakazi no brasil com Html e Js.
