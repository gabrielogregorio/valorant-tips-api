# API do blog Valorant tips

Está documentação contém toda a parte técnica relacionada a API do blog [dicas de valorant](https://valorant-tips.vercel.app/), sendo a primeira usando a bibliteca doctbytest

A API do blog dicas de Valorant se destina a testarmos a biblioteca docbytest, então ainda estamos arrumando a casa e alguns informações podem ter imprecissões, não damos suporte e nem apoiamos o uso da api do Valorant tips, atualmente ela é publica, mas é alterada de acordo com as necessidades do blog, sem aviso prévio e sem suporte!

## Código aberto

Você pode colaborar com o [frontend](https://github.com/gabrielogregorio/valorant-tips) ou com o [backend](https://github.com/gabrielogregorio/valorant-tips-api) do dicas de Valorant, a qual serve essa documentação, mas já aviso que esse projeto possui poucos ajustes ao longo do tempo.


## A quem se destina?
Essa documentação atende vários publicos, porém, os publicos abaixo são os nossos principais

* Desenvolvedores de software que queira brincar com a API
* Analista de negócios que queira obter informações sobre a API
* Contribuidores do dicas de valorant

## Erros

Nossa API usa os códigos tradicionais das API's, erros na faixa de 200 indicam algum tipo de sucesso, na faixa de 400 algum problema com parâmetros passados e 500 algo no servidor. Confira uma tabela com todos os erros usados atualmente no projeto.

[Tabela de erros](errors_status_table)

## Autenticação

Alguns endpoints precisam de autenticação, você pode conseguir uma chave de acesso informando um login e senha válidos.

### Exemplo para obter o token

Você pode obter um token de autorização fazendo uma autorização get ao seguinte endereço

```bash
curl -X POST \
  -H "Content-type: application/json" \
  -d '{"username":"your username","password":"your password"}' \
    'https://backend-valorant.herokuapp.com/auth'

```
