# Estado no Componente ou no Serviço? Entendendo quando utilizar cada abordagem no Angular

Uma dúvida comum ao desenvolver aplicações Angular é decidir onde deve ficar o estado de uma funcionalidade.

Ao fazer uma requisição HTTP, por exemplo, existem duas abordagens bastante utilizadas:

- o serviço retorna um `Observable` e o componente controla o estado da interface;
- o serviço controla tanto a comunicação com a API quanto o estado da funcionalidade, funcionando como uma pequena _store_.

Nenhuma delas é "a correta". A escolha depende principalmente de **quem é o verdadeiro dono daquele estado**.

---

# Abordagem 1 — O serviço retorna um Observable

Nesta abordagem, o serviço tem uma responsabilidade bastante objetiva: comunicar-se com a API.

Ele conhece:

- a URL;
- os parâmetros da requisição;
- como transformar a resposta da API em um modelo da aplicação.

Seu papel termina aí.

Exemplo:

```ts
@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<ProductDto[]>("/api/products").pipe(map((products) => products.map(Product.fromDto)));
  }
}
```

O componente passa a ser responsável por decidir:

- quando carregar os dados;
- como tratar erros;
- quando exibir loading;
- onde armazenar o resultado.

```ts
export class ProductsComponent {
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | undefined>(undefined);

  loadProducts() {
    this.loading.set(true);
    this.error.set(undefined);

    this.productsService
      .getProducts()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (products) => this.products.set(products),
        error: (err) => this.error.set(err.message),
      });
  }
}
```

Nesse modelo, o estado pertence ao componente.

Isso significa que `loading`, `error` e `products` representam apenas aquela tela.

---

## Quando essa abordagem faz sentido?

Ela costuma ser a melhor opção quando:

- apenas um componente utiliza aqueles dados;
- cada tela pode tratar carregamento ou erros de maneira diferente;
- os dados não precisam ser compartilhados;
- o componente é o verdadeiro responsável pela interface.

Um bom exemplo é uma tela de consulta.

Imagine uma página que lista produtos.

```text
Produtos
```

Somente essa tela precisa da lista de produtos.

Quando o usuário sai dela, o estado deixa de ser relevante.

Não existe motivo para manter essa lista armazenada globalmente.

---

## Vantagens

- responsabilidades bem separadas;
- serviço pequeno e reutilizável;
- o Observable continua disponível para composição (`switchMap`, `retry`, `combineLatest`, etc.);
- cada componente decide como consumir os dados.

---

# Abordagem 2 — O serviço funciona como uma Store

Na segunda abordagem, o serviço deixa de ser apenas um cliente HTTP.

Ele passa a ser o responsável pelo estado da funcionalidade.

Além de conversar com a API, ele também controla:

- os dados carregados;
- loading;
- erros;
- atualizações;
- inclusão e remoção de registros;
- cache;
- sincronização entre componentes.

É comum utilizar `signals` privados:

```ts
private usersSignal = signal<User[]>([]);
private loadingSignal = signal(false);
private errorSignal = signal<string | undefined>(undefined);
```

E expô-los somente para leitura:

```ts
users = this.usersSignal.asReadonly();
loading = this.loadingSignal.asReadonly();
error = this.errorSignal.asReadonly();
```

O componente praticamente apenas consome esse estado.

```ts
export class UsersComponent {
  users = this.usersStore.users;
  loading = this.usersStore.loading;
  error = this.usersStore.error;
}
```

Nesse cenário, o serviço atua como uma pequena store da aplicação.

---

## Quando essa abordagem faz sentido?

Ela é interessante quando o estado precisa ser compartilhado.

Imagine um e-commerce.

O carrinho de compras aparece em diversos lugares:

- cabeçalho;
- página do produto;
- checkout;
- menu lateral;
- mini carrinho.

Todos precisam enxergar exatamente o mesmo estado.

```text
Produto
        \
         \
Carrinho ---- Checkout
         /
        /
Header
```

Se cada componente tivesse sua própria lista de produtos do carrinho, seria muito fácil ocorrer inconsistência.

Ao adicionar um produto em uma página, todos os demais componentes devem refletir imediatamente essa alteração.

Por isso, faz sentido que exista uma única fonte de verdade.

---

Outro exemplo clássico é autenticação.

Imagine que o usuário realiza login.

Diversas partes da aplicação dependem desse estado:

- Header exibe o nome do usuário.
- Guard verifica se a rota pode ser acessada.
- Interceptor adiciona o token nas requisições.
- Menu mostra opções conforme o perfil.
- Componentes verificam permissões.

Nesse caso, o estado não pertence a uma tela.

Ele pertence à aplicação inteira.

Uma store de autenticação é bastante natural.

```text
Login
      \
       \
AuthService
       /
      /
Header
Guard
Interceptor
```

---

## Vantagens

- existe uma única fonte de verdade;
- múltiplos componentes compartilham o mesmo estado;
- alterações são propagadas automaticamente;
- reduz duplicação de requisições;
- facilita cache;
- centraliza regras de negócio relacionadas ao estado.

---

# Como decidir?

Uma pergunta costuma resolver a maior parte dos casos:

> **Quem é o dono desse estado?**

Se a resposta for:

> "Apenas esta tela."

Então provavelmente o estado deve ficar no componente.

Se a resposta for:

> "Vários componentes dependem dessa informação."

Então provavelmente o estado pertence ao serviço.

---

Outra forma de pensar é imaginar o ciclo de vida da informação.

Uma lista de pesquisa geralmente deixa de existir quando o usuário sai da tela.

Já um carrinho de compras continua existindo durante toda a navegação.

O mesmo vale para:

- usuário autenticado;
- tema da aplicação;
- idioma selecionado;
- notificações;
- permissões;
- configurações do usuário.

Esses estados normalmente sobrevivem à troca de páginas e são compartilhados.

---

# É obrigatório escolher apenas um padrão?

Não.

Na verdade, é bastante comum utilizar ambos na mesma aplicação.

Por exemplo:

| Funcionalidade           | Abordagem                         |
| ------------------------ | --------------------------------- |
| Tela de pesquisa         | Observable retornado pelo serviço |
| Dashboard                | Observable retornado pelo serviço |
| Carrinho de compras      | Store no serviço                  |
| Autenticação             | Store no serviço                  |
| Configurações do usuário | Store no serviço                  |
| Tema (claro/escuro)      | Store no serviço                  |
| Idioma atual             | Store no serviço                  |

Cada funcionalidade pode utilizar o modelo que melhor representa a propriedade daquele estado.

---

# Conclusão

A decisão não deve ser baseada em "onde é mais bonito colocar o código", mas sim em **quem é responsável pelo estado**.

Quando o estado pertence apenas a uma tela, normalmente faz mais sentido que o componente o controle e o serviço apenas forneça os dados.

Quando o estado precisa ser compartilhado entre diversos componentes ou representar uma funcionalidade inteira da aplicação, faz sentido que o serviço também seja responsável por armazená-lo e atualizá-lo, atuando como uma pequena store.

Não existe um padrão universal que substitua o outro. Ambos coexistem muito bem em uma aplicação Angular quando utilizados para resolver problemas diferentes.
