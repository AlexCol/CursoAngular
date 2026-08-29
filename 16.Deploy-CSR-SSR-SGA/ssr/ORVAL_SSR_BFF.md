# Orval com Angular SSR, BFF Express e backend privado

Este guia descreve uma arquitetura em que:

- o backend real (por exemplo, ASP.NET Core) publica um documento OpenAPI;
- o Orval gera os tipos e os clientes HTTP;
- o navegador nunca conhece a URL real do backend;
- chamadas feitas depois da hidratação passam por rotas `/api` do Express;
- chamadas feitas durante o SSR podem acessar o backend pela URL interna;
- código gerado para Node não entra no bundle do navegador.

## 1. Arquitetura

```text
                              OpenAPI do backend C#
                                       |
                                    Orval
                          +------------+------------+
                          |                         |
                client Angular               client Fetch
                src/app/api/...           src/server/api/...
                          |                         |
                          |                         |
Navegador -> /api/* -> Express BFF ----------------+-> backend C#
                          |
                          +-> AngularNodeAppEngine -> HTML SSR
```

Existem duas responsabilidades diferentes no mesmo servidor Node:

- **SSR:** o `AngularNodeAppEngine` renderiza HTML;
- **BFF:** as rotas Express `/api/*` recebem chamadas do navegador e acessam o backend privado.

As rotas `/api/*` são rotas de BFF, e não rotas de renderização SSR.

## 2. Fluxos de execução

### Primeira renderização com SSR

```text
GET /home
-> Express
-> AngularNodeAppEngine
-> resolver/componente Angular
-> serviço Angular gerado pelo Orval
-> backend C# pela URL interna
-> HTML pronto
-> navegador
```

### Depois da hidratação

```text
clique/navegação no navegador
-> serviço Angular gerado pelo Orval
-> /api/users
-> Express BFF
-> client Fetch gerado pelo Orval
-> backend C# pela URL interna
```

O serviço Angular gerado é o mesmo nos bundles browser e server. O provider da base URL determina o destino em cada plataforma.

## 3. Estrutura sugerida

```text
ssr/
├── orval.config.ts
├── orval/
│   └── strip-client-servers.ts
└── src/
    ├── app/
    │   ├── api/
    │   │   └── generated/          # somente client Angular gerado
    │   │       ├── backend.ts
    │   │       ├── backend.base-url.ts
    │   │       ├── users/
    │   │       └── models/
    │   └── root-layout/
    └── server/
        ├── api/
        │   └── generated/          # somente client Fetch gerado
        │       ├── backend.ts
        │       ├── users/
        │       └── models/
        ├── app.config.server.ts
        └── server.ts
```

Não importar arquivos de `src/server` em componentes, services, resolvers ou configurações do browser.

## 4. Instalação e scripts

Instalar o Orval como dependência de desenvolvimento:

```bash
npm install --save-dev orval
```

Adicionar scripts ao `package.json`:

```json
{
  "scripts": {
    "api:generate": "orval --config orval.config.ts",
    "api:watch": "orval --config orval.config.ts --watch"
  }
}
```

O backend precisa estar disponível quando o input do Orval for uma URL. Em CI, uma alternativa mais determinística é exportar e versionar um arquivo `openapi.json`.

## 5. Configuração do Orval

Exemplo de `orval.config.ts`:

```ts
import { defineConfig } from 'orval';

const openApiUrl =
  process.env['OPENAPI_URL'] ??
  'http://localhost:5000/swagger/v1/swagger.json';

export default defineConfig({
  // Client usado por componentes e resolvers Angular.
  angularBffClient: {
    input: {
      target: openApiUrl,
      override: {
        // Impede que a URL interna declarada em `servers` seja incluída
        // nos arquivos que farão parte do bundle do navegador.
        transformer: './orval/strip-client-servers.ts',
      },
    },
    output: {
      client: 'angular',
      mode: 'tags-split',
      target: 'src/app/api/generated/backend.ts',
      schemas: 'src/app/api/generated/models',
      clean: true,
      override: {
        angular: {
          retrievalClient: 'httpClient',
          provideIn: 'root',
          baseUrl: {
            apiId: 'backend',
          },
        },
      },
    },
  },

  // Client exclusivo do Node/Express para acessar o backend real.
  serverBackendClient: {
    input: {
      target: openApiUrl,
    },
    output: {
      client: 'fetch',
      mode: 'tags-split',
      target: 'src/server/api/generated/backend.ts',
      schemas: 'src/server/api/generated/models',
      clean: true,
      baseUrl: {
        runtime: 'process.env.BACKEND_URL',
      },
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
          forceSuccessResponse: true,
        },
      },
    },
  },
});
```

Observações:

- `tags-split` usa as tags do OpenAPI para separar os arquivos;
- nomes de funções, classes e arquivos dependem de `tags` e `operationId` do backend;
- `provideIn: 'root'` torna os services Angular gerados injetáveis;
- `baseUrl.apiId: 'backend'` gera tokens e helpers de DI para a base URL;
- `baseUrl.runtime` mantém a URL verdadeira como configuração de runtime do Node;
- `clean: true` remove arquivos antigos da área gerada; nunca guardar código manual dentro dessas pastas.

## 6. Remover a URL interna do client Angular

Se o OpenAPI contém:

```json
{
  "servers": [
    { "url": "https://backend-interno.exemplo.com" }
  ]
}
```

o Orval pode incorporar essa string no código Angular gerado como fallback. Mesmo que um provider sobrescreva o valor em runtime, a string ainda pode aparecer no bundle.

Criar `orval/strip-client-servers.ts`:

```ts
import { defineTransformer } from 'orval';

export default defineTransformer((schema) => ({
  ...schema,
  servers: [{ url: '' }],
}));
```

Esse transformer é usado somente na geração do client Angular. O client Fetch do servidor pode manter as informações completas da especificação.

Não considerar a ocultação da URL uma autorização de segurança. O backend também deve:

- aceitar conexões apenas da infraestrutura esperada, quando possível;
- validar autenticação e autorização;
- nunca confiar em dados apenas porque chegaram pelo BFF.

## 7. Configuração HTTP do Angular

Em `src/app/app.config.ts`, registrar `HttpClient` e usar `/api` no navegador:

```ts
import {
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

import { provideBackendBaseUrl } from './api/generated/backend.base-url';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBackendBaseUrl('/api'),
  ],
};
```

O navegador passa a chamar somente URLs como:

```text
/api/users
/api/products
/api/orders
```

## 8. Base URL exclusiva do SSR

Em `src/server/app.config.server.ts`, sobrescrever o mesmo token com a URL interna:

```ts
import {
  ApplicationConfig,
  mergeApplicationConfig,
} from '@angular/core';
import {
  provideServerRendering,
  withRoutes,
} from '@angular/ssr';

import { appConfig } from '../app/app.config';
import { provideBackendBaseUrl } from '../app/api/generated/backend.base-url';
import { serverRoutes } from './app.routes.server';

const backendUrl = process.env['BACKEND_URL'];

if (!backendUrl) {
  throw new Error('BACKEND_URL não foi configurada.');
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideBackendBaseUrl(backendUrl),
  ],
};

export const config = mergeApplicationConfig(
  appConfig,
  serverConfig,
);
```

Como `serverConfig` é mesclado depois de `appConfig`, o provider do servidor substitui `/api` durante SSR.

Resultado:

```text
Browser: /api/users
SSR:     ${BACKEND_URL}/users
```

Não colocar `BACKEND_URL` em `src/app`, em arquivos `environment` enviados ao browser ou em qualquer constante gerada para o client.

## 9. Rotas BFF no Express

As rotas BFF precisam ser registradas antes do middleware genérico do Angular:

```ts
app.get('/api/users', async (_req, res, next) => {
  try {
    // O nome exato depende do operationId definido no OpenAPI.
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response
        ? writeResponseToNodeResponse(response, res)
        : next(),
    )
    .catch(next);
});
```

O import de `getUsers` deve vir exclusivamente da saída server:

```ts
import { getUsers } from './api/generated/users/users';
```

O nome e o caminho acima são ilustrativos. Conferir o resultado real da geração.

Adicionar também um error handler depois das rotas/middlewares:

```ts
app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);

    res.status(502).json({
      message: 'Falha ao comunicar com o backend.',
    });
  },
);
```

## 10. Controllers ou proxy

Existem duas formas de expor o BFF.

### Rotas explícitas

Adequadas quando o BFF precisa:

- validar ou transformar dados;
- converter cookies em credenciais do backend;
- aplicar autorização;
- combinar múltiplas respostas;
- esconder apenas parte da API real;
- alterar o contrato entregue ao frontend.

Nesse caso, criar handlers/controllers Express que usam o client Fetch gerado.

### Proxy transparente

Adequado quando `/api/*` apenas espelha os mesmos paths e contratos do backend. Um proxy genérico evita criar um controller para cada operação.

Para o objetivo inicial deste guia — manter o backend C# privado sem alterar seus contratos — começar por um proxy controlado costuma ser mais simples do que duplicar todos os endpoints em controllers Express. Criar endpoints BFF explícitos apenas quando houver composição, transformação ou regra própria no Node.

Mesmo com proxy, aplicar uma allowlist de paths/métodos. Não transformar o BFF em um proxy aberto para URLs arbitrárias.

## 11. Consumir no Angular

O componente deixa de usar `HttpClient` diretamente e injeta o service gerado:

```ts
import { Component, inject, signal } from '@angular/core';

import { UsersService } from '../../../api/generated/users/users.service';
import type { User } from '../../../api/generated/models';

@Component({
  selector: 'app-home-users',
  template: `...`,
})
export class HomeUsers {
  private readonly usersApi = inject(UsersService);

  readonly users = signal<User[]>([]);

  handleClick(): void {
    this.usersApi.getUsers().subscribe({
      next: (users) => this.users.set(users),
    });
  }
}
```

Os nomes `UsersService` e `getUsers` são exemplos. Eles dependem das tags e dos `operationId` do OpenAPI.

Uma chamada iniciada por clique acontece no browser e, portanto, vai para `/api/users`.

## 12. Carregar dados durante SSR

Para que os usuários façam parte do HTML inicial, carregar os dados durante a resolução da rota, e não em `afterNextRender` ou somente por clique:

```ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { UsersService } from '../../../api/generated/users/users.service';
import type { User } from '../../../api/generated/models';

export const usersResolver: ResolveFn<User[]> = () => {
  return inject(UsersService).getUsers();
};
```

Na rota:

```ts
export const homeRoute: Route = {
  path: 'home',
  loadComponent: () =>
    import('./home').then((module) => module.Home),
  resolve: {
    users: usersResolver,
  },
};
```

Para SSR por requisição, a rota server deve usar:

```ts
{
  path: '**',
  renderMode: RenderMode.Server,
}
```

Com `RenderMode.Prerender`, a chamada ocorre durante o build e o resultado é SSG, não SSR por requisição.

Requisições GET feitas pelo `HttpClient` durante SSR só são reaproveitadas automaticamente na hidratação quando o Angular consegue produzir a mesma chave de cache nos dois ambientes. Como esta arquitetura usa URLs diferentes no Node e no navegador, consulte a seção seguinte antes de contar com esse reaproveitamento.

## 13. Transfer cache quando as URLs diferem

Na arquitetura principal deste guia, uma mesma operação pode ter estas URLs:

```text
SSR:     http://backend-interno:5000/users
Browser: /api/users
```

Sem configuração adicional, essas requisições possuem chaves diferentes. Se a aplicação repetir a busca durante a hidratação, o navegador poderá chamar o BFF mesmo que o SSR já tenha recebido os usuários.

O Angular oferece `HTTP_TRANSFER_CACHE_ORIGIN_MAP` para relacionar origens diferentes. O token deve existir **somente** em `app.config.server.ts`:

```ts
import {
  HTTP_TRANSFER_CACHE_ORIGIN_MAP,
} from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideBackendBaseUrl(backendUrl),
    {
      provide: HTTP_TRANSFER_CACHE_ORIGIN_MAP,
      useValue: {
        'http://backend-interno:5000':
          'https://app.exemplo.com',
      },
    },
  ],
};
```

Esse token traduz somente a **origem**. Ele não adiciona, remove nem troca prefixos de path. Os valores do mapa também não podem conter paths.

Portanto, o exemplo acima funciona quando o restante da URL é idêntico:

```text
SSR:     http://backend-interno:5000/api/users
Browser: https://app.exemplo.com/api/users
```

Esse exemplo também pressupõe que o `HttpRequest.url` do browser seja absoluto. Com a configuração principal deste guia:

```ts
provideBackendBaseUrl('/api')
```

o client Angular pode produzir a string relativa `/api/users`. Na implementação atual, o Angular aplica o mapa ao construir a chave no servidor, mas usa `req.url` diretamente no browser. Portanto, não presumir que estas duas strings gerem a mesma chave:

```text
SSR depois do origin map: https://app.exemplo.com/api/users
Browser relativo:         /api/users
```

`HTTP_TRANSFER_CACHE_ORIGIN_MAP` foi projetado para relacionar origens absolutas diferentes; ele não normaliza uma URL absoluta do servidor para uma URL relativa do browser. Quando o client usar URLs relativas, verificar o comportamento na versão Angular adotada ou escolher uma das estratégias descritas abaixo.

Ele não resolve sozinho este caso:

```text
SSR:     http://backend-interno:5000/users
Browser: https://app.exemplo.com/api/users
                                      ^ prefixo adicional
```

Quando o BFF adiciona `/api` e o backend não possui esse prefixo, escolher conscientemente uma destas estratégias:

1. aceitar que uma busca repetida na hidratação fará outra requisição;
2. alinhar os paths públicos e internos para que apenas as origens sejam diferentes;
3. fazer o SSR chamar a URL absoluta do próprio BFF, preservando exatamente a URL usada pelo browser, ao custo de um salto HTTP adicional;
4. implementar uma estratégia explícita de `TransferState`/normalização de chave para relacionar paths diferentes.

Não adicionar `HTTP_TRANSFER_CACHE_ORIGIN_MAP` ao `app.config.ts`: o Angular lança erro se encontrar esse provider no browser.

Também não habilitar cache de respostas autenticadas indiscriminadamente. Por padrão, o transfer cache exclui requisições com `Authorization`, `Proxy-Authorization`, `Cookie` ou credenciais, além de respostas com diretivas como `private`, `no-cache`, `no-store` ou `Set-Cookie`. Dados específicos de usuário exigem uma decisão de segurança própria.

### Requisito de versão e segurança

Manter todos os pacotes Angular na mesma versão patch e acompanhar os advisories oficiais. A vulnerabilidade de alta severidade [GHSA-jhpw-976m-542j](https://github.com/angular/angular/security/advisories/GHSA-jhpw-976m-542j), publicada em julho de 2026, permitia ambiguidade na chave do `HttpTransferCache` para parâmetros repetidos.

Versões mínimas que corrigem especificamente esse advisory:

```text
Angular 20: 20.3.27
Angular 21: 21.2.19
Angular 22: 22.0.2
```

Esses números são mínimos para essa vulnerabilidade específica, não uma garantia de que não existam advisories posteriores. Usar o patch mais recente da linha Angular suportada e manter `@angular/core`, `@angular/common`, `@angular/platform-browser`, `@angular/platform-server` e `@angular/ssr` alinhados.

No momento desta revisão, este projeto está instalado com `@angular/common` 21.2.22, portanto já contém a correção desse advisory.

## 14. Quando usar a mesma especificação nos dois clients

A mesma especificação OpenAPI pode gerar o client Fetch e o client Angular quando o BFF preserva o contrato:

```text
Backend: GET /users
BFF:     GET /api/users
```

Se o BFF mudar nomes, payloads ou respostas, ele passou a possuir outro contrato:

```text
Backend: GET /internal/customers
BFF:     GET /api/users
```

Nesse caso, o desenho correto é:

```text
OpenAPI do C#  -> Orval -> client Fetch do servidor
OpenAPI do BFF -> Orval -> client Angular
```

## 15. Variáveis de ambiente

Exemplo local, somente para o processo Node:

```env
BACKEND_URL=http://localhost:5000
OPENAPI_URL=http://localhost:5000/swagger/v1/swagger.json
```

Em produção, `BACKEND_URL` pode ser um hostname interno de container, cluster ou rede privada.

Não usar prefixos destinados a variáveis públicas do frontend. A variável deve existir apenas no runtime do servidor.

## 16. Autenticação entre browser, BFF e backend

Ocultar a URL real não define o fluxo de autenticação. Antes de considerar a arquitetura pronta para produção, definir como a identidade atravessa as três camadas.

Um desenho comum é:

```text
Browser
-> cookie de sessão HttpOnly
-> Node BFF
-> Authorization: Bearer <token interno>
-> ASP.NET Core
```

Durante SSR:

```text
GET /home com cookie
-> Angular SSR / Node
-> valida ou recupera a sessão
-> acrescenta credencial interna
-> ASP.NET Core
```

Recomendações mínimas:

- manter tokens internos exclusivamente no Node;
- preferir cookies `HttpOnly`, `Secure` e com política `SameSite` adequada para a sessão do browser;
- aplicar proteção CSRF quando a autenticação depender de cookies;
- validar autorização novamente no backend C#;
- não serializar tokens, cookies ou headers sensíveis no transfer cache;
- não criar um proxy aberto: restringir paths, métodos, headers e destinos permitidos.

O mecanismo concreto de sessão/token depende do provedor de identidade e deve ser documentado separadamente.

## 17. Checklist

- [ ] Backend publica OpenAPI com `tags` e `operationId` estáveis.
- [ ] Orval gera um client Angular em `src/app/api/generated`.
- [ ] Orval gera um client Fetch em `src/server/api/generated`.
- [ ] A especificação usada pelo client Angular não incorpora a URL interna.
- [ ] Browser recebe `provideBackendBaseUrl('/api')`.
- [ ] SSR recebe `provideBackendBaseUrl(BACKEND_URL)`.
- [ ] Rotas `/api/*` são registradas antes do handler do Angular.
- [ ] Código de `src/server` nunca é importado por `src/app`.
- [ ] A URL real não aparece em arquivos enviados ao browser.
- [ ] O backend continua validando autenticação e autorização.
- [ ] `RenderMode.Server` é usado quando o requisito é SSR por requisição.
- [ ] A estratégia de transfer cache considera origem e path diferentes.
- [ ] URLs absolutas e relativas não são tratadas como chaves equivalentes sem verificação.
- [ ] `HTTP_TRANSFER_CACHE_ORIGIN_MAP`, quando aplicável, existe somente na configuração server.
- [ ] Angular está em uma versão corrigida e seus pacotes usam patches alinhados.
- [ ] O fluxo de autenticação entre browser, BFF e backend foi definido.
- [ ] Arquivos gerados não são editados manualmente.

## Referências

- [Orval: Angular](https://orval.dev/docs/guides/angular/)
- [Orval: Fetch](https://orval.dev/docs/guides/fetch/)
- [Orval: configuração de output](https://orval.dev/docs/reference/configuration/output/)
- [Angular: SSR e renderização híbrida](https://angular.dev/guide/ssr)
- [Angular: HTTP_TRANSFER_CACHE_ORIGIN_MAP](https://angular.dev/api/common/http/HTTP_TRANSFER_CACHE_ORIGIN_MAP)
