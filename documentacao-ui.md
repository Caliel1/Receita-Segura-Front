# Documentação de UI — Receita Segura

Documento único com o registro das decisões visuais e técnicas do front-end: **o que existe, como usar e por que foi feito assim**.

Projeto: HTML + CSS + JavaScript puros. Setup e visão geral no `README.md`.

**Sumário**

1. [Design tokens](#1-design-tokens): cores, tipografia, espaçamento, forma e contraste
2. [Componentes](#2-componentes): Botão, Campo de formulário e Modal
3. [Fluxo de navegação](#3-fluxo-de-navegação): telas, transições, permissões e estados


## 1. Design tokens

Tokens são as menores decisões de design do projeto (cor, fonte, espaço) nomeadas e versionadas como código. Todos os tokens de cor e forma vivem em `:root`, no topo de `css/styles.css`.

**Regra de uso:** no CSS, use sempre `var(--nome)`. Não escreva hex solto quando já existir um token.


### Cores

![Paleta de cores do Receita Segura](img/paleta.png)

#### Azul: identidade e ações

| Token | Hex | Onde usar |
| --- | --- | --- |
| `--azul-900` | `#12314f` | Cor principal: títulos, botão primário, avatar, rodapé, cartão de verificação |
| `--azul-800` | `#17436b` | *Hover* do botão primário e de links de navegação |
| `--azul-700` | `#1f5c8f` | Borda do paciente selecionado na lista |
| `--azul-500` | `#4a8fc2` | Anel de foco (`:focus-visible`) |
| `--azul-300` | `#8fc0e6` | Textos secundários sobre fundo azul-900 (rodapé, rótulos do cartão de verificação) |
| `--azul-100` | `#eaf3fa` | Fundos de apoio: topo do hero, tela de login, item selecionado, *hover* do botão secundário |

#### Verde: sucesso e assinatura

| Token | Hex | Onde usar |
| --- | --- | --- |
| `--verde-700` | `#2f8f5b` | Textos e ícones de "assinado", destaque do título do hero, símbolo ℞ |
| `--verde-500` | `#45b378` | Faixa superior do receituário e onda do cabeçalho da folha de receita |
| `--verde-100` | `#e7f6ee` | Fundo de selos e faixas de assinatura |

#### Neutros: texto, bordas e superfícies

| Token | Hex | Onde usar |
| --- | --- | --- |
| `--tinta` | `#1c2530` | Texto principal do corpo |
| `--cinza-700` | `#4b5563` | Texto secundário e descrições |
| `--cinza-400` | `#94a3b8` | Texto terciário (notas, rodapé legal). **Só para texto não essencial**, ver [contraste](#contraste-e-acessibilidade) |
| `--cinza-200` | `#e2e8f0` | Bordas e divisores |
| `--cinza-100` | `#f4f7fa` | Fundo de seções alternadas, painéis e itens de lista |
| `--papel` | `#fffdf8` | Fundo do cartão de receita ilustrativo (efeito papel) |
| `--branco` | `#ffffff` | Fundo padrão de página e cartões |

#### Cores semânticas ainda sem token

Estes valores estão escritos direto no CSS. **Candidatos a virar tokens:**

| Uso | Valor | Onde aparece |
| --- | --- | --- |
| Erro (texto) | `#b42318` | `.mensagem-erro`, `.botao-remover` |
| Erro (fundo) | `#fde8e8` | `.mensagem-erro` |
| Aviso (texto) | `#8a5a00` | `.aviso-protótipo` |
| Aviso (fundo) | `#fff7e6` | `.aviso-protótipo` |
| Status verificado (texto) | `#8ee0b3` | `.cartao-verificacao .status` |
| Status verificado (fundo) | `rgba(69, 179, 120, 0.2)` | `.cartao-verificacao .status` |
| Fundo do overlay | `rgba(18, 24, 32, 0.55)` | `.sobreposicao` |

#### Exemplo de uso

```css
.meu-cartao {
  background: var(--branco);
  border: 1px solid var(--cinza-200);
  color: var(--tinta);
}
.meu-cartao:hover {
  border-color: var(--azul-700);
}
```


### Tipografia

**Famílias** (definidas como tokens):

| Token | Valor | Uso |
| --- | --- | --- |
| `--fonte-titulo` | `'Fraunces', Georgia, 'Times New Roman', serif` | `h1`, `h2`, `h3`, símbolo ℞, marca na folha de receita |
| `--fonte-corpo` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Todo o restante |
| *(sem token)* | `'SFMono-Regular', Consolas, monospace` | Hashes SHA-256 (`.folha-hash`, `.linha-verificacao dd`) |

Pesos carregados: Fraunces 500 / 600 / 700, Inter 400 / 500 / 600 / 700.
Base: `16px` (padrão do navegador), `line-height: 1.5`, `-webkit-font-smoothing: antialiased`.

#### Escala tipográfica

Os tamanhos estão em `rem` (1rem = 16px).

| Nível | Fonte | Tamanho | Peso | Onde usar |
| --- | --- | --- | --- | --- |
| Título do hero | Fraunces | `clamp(2rem, 4.2vw, 2.9rem)` (≤480px: `1.7rem`), *line-height* 1.12 | 600 | `.hero h1`, uma vez por página |
| Título de seção | Fraunces | `clamp(1.5rem, 3vw, 2rem)` | 600 | `.secao-titulo h2` |
| Título de painel | Fraunces | `1.5rem` (≈24px) | 700 (padrão) | `.painel-corpo h1` |
| Título de cartão de login | Fraunces | `1.4rem` (≈22px) | 700 (padrão) | `.cartao-auth h2` |
| Título de modal | Fraunces | `1.2rem` (≈19px) | 700 (padrão) | `h2` dentro de `.modal` |
| Título de cartão / passo | Fraunces | `1.05rem` (≈17px) | 700 (padrão) | `.cartao h2`, `.passo h3` |
| Lead / texto de destaque | Inter | `1.05rem` | 400 | `.hero p` |
| Corpo | Inter | `0.9rem`–`0.95rem` (≈14–15px) | 400 | Parágrafos, campos, botões |
| Rótulo / apoio | Inter | `0.85rem` (≈14px) | 600 | `.campo label`, links da navegação |
| Legenda | Inter | `0.78rem`–`0.82rem` (≈12–13px) | 400–500 | Subtítulos de lista, notas |
| Metadado / legal | Inter | `0.68rem`–`0.72rem` (≈11px) | 400–500 | `.rodape-legal`, `.folha-rodape-legal`, `.marca-texto small` |
| Monoespaçada | Mono | `0.72rem`–`0.82rem` | 400 | `.folha-hash`, `.linha-verificacao dd` |

> ⚠ Há vários tamanhos próximos (0.78, 0.8, 0.82, 0.85 rem). Ao criar algo novo, **reutilize o nível mais próximo** da tabela em vez de inventar outro valor.


### Espaçamento

O projeto **ainda não tem tokens de espaçamento**: os valores estão escritos direto nas regras. Abaixo, o que existe hoje e uma escala proposta para consolidar.

#### Valores recorrentes hoje

| Valor | Onde aparece |
| --- | --- |
| 8px | Espaço entre botões do formulário de novo paciente; padding de botões pequenos |
| 10px | `gap` em `.linha-medicamento`, `.lista-pacientes`, `.tabela-receitas` |
| 12px | Padding de itens de lista e de `.credenciais-demo`; `gap` do cabeçalho do painel |
| 14px | `gap` de `.cta-grupo`; padding de `.item-receita` |
| 16px | `margin-bottom` de `.campo`; padding lateral do `.container` em telas ≤480px |
| 20px | Padding lateral do `.container`; padding do `.sobreposicao` |
| 22px | Padding de `.cartao` |
| 24px | `gap` das grades (`.passos`, `.grade-painel`) |
| 26px | Padding de `.receituario`, `.passo`, `.cartao-verificacao`, `.modal` |
| 44px | `margin-bottom` de `.secao-titulo` |
| 48px | `gap` do hero e da grade de segurança |
| 72px | Padding vertical de `.secao` (52px em telas ≤900px) |

#### Escala proposta (a adotar)

| Token proposto | Valor | Substitui (aprox.) |
| --- | --- | --- |
| `--espaco-xs` | 4px | Ajustes finos entre ícone e texto |
| `--espaco-sm` | 8px | 8px |
| `--espaco-md` | 16px | 14px, 16px |
| `--espaco-lg` | 24px | 20px, 22px, 24px, 26px |
| `--espaco-xl` | 32px | Espaços entre blocos de um cartão |
| `--espaco-2xl` | 48px | 44px, 48px |
| `--espaco-3xl` | 72px | 72px |

```css
/* Como ficaria em tokens.css */
:root {
  --espaco-xs: 4px;
  --espaco-sm: 8px;
  --espaco-md: 16px;
  --espaco-lg: 24px;
  --espaco-xl: 32px;
  --espaco-2xl: 48px;
  --espaco-3xl: 72px;
}
```


### Forma, sombra e layout

| Token | Valor | Uso |
| --- | --- | --- |
| `--raio` | `14px` | Cartões, modais, receituário |
| `--raio-sm` | `8px` | Campos, itens de lista, selos |
| *(sem token)* | `999px` | Botões e alternador em formato de pílula |
| *(sem token)* | `50%` | Avatar e botão de fechar |
| `--sombra` | `0 12px 30px rgba(18, 49, 79, 0.12)` | Receituário do hero e cartão de login |
| `--largura-maxima` | `1120px` | Largura máxima do `.container` |

Tamanhos fixos de componentes (sem token):

| Elemento | Medida |
| --- | --- |
| Altura do cabeçalho | 68px (60px em ≤480px) |
| Altura mínima de botão `.botao` | 48px |
| Altura mínima de campo | 46px |
| Altura mínima de item de lista clicável | 48px (pacientes) / 56px (receitas) |
| Largura máxima do modal | 480px |
| Largura máxima do cartão de login | 420px |


### Breakpoints

Abordagem *desktop-first* com dois pontos de quebra:

| Largura | O que muda |
| --- | --- |
| `≤ 900px` | Menu hambúrguer, grades em coluna única, seções com menos padding |
| `≤ 480px` | Padding lateral do container 16px, hero menor, CTAs em coluna, cabeçalho de 60px |

Também existe `prefers-reduced-motion: reduce` (anula animações e transições) e `@media print` (imprime só `#folha-atual`).


### Camadas (z-index)

| Valor | Elemento |
| --- | --- |
| `40` | `.cabecalho` (fixo no topo) |
| `100` | `.sobreposicao` (modais) |


### Contraste e acessibilidade

Razões calculadas pela fórmula WCAG 2.1 (mínimo AA: **4.5:1** para texto normal, **3:1** para texto grande e componentes).

| Combinação | Razão | Resultado |
| --- | --- | --- |
| Branco sobre `--azul-900` (botão primário) | 13.3:1 | ✔ AAA |
| Branco sobre `--azul-800` (hover primário) | 10.2:1 | ✔ AAA |
| `--azul-900` sobre branco (botão secundário) | 13.3:1 | ✔ AAA |
| `--tinta` sobre branco (texto) | 15.5:1 | ✔ AAA |
| `--cinza-700` sobre branco | 7.6:1 | ✔ AAA |
| `--cinza-700` sobre `--cinza-100` | 7.0:1 | ✔ AAA |
| `--azul-300` sobre `--azul-900` (rodapé) | 6.9:1 | ✔ AA |
| `#8ee0b3` sobre `--azul-900` (status) | 8.5:1 | ✔ AAA |
| `#b42318` sobre `#fde8e8` (erro) | 5.6:1 | ✔ AA |
| `#8a5a00` sobre `#fff7e6` (aviso) | 5.6:1 | ✔ AA |
| `--verde-700` sobre branco | 4.0:1 | ⚠ Só texto grande/negrito |
| `--verde-700` sobre `--verde-100` (selo) | 3.6:1 | ⚠ Só texto grande/negrito |
| `--cinza-400` sobre branco | 2.6:1 | ✘ Reprova AA; usar só em texto decorativo |

**Pontos de atenção:**

- O texto `✓ ASSINADO DIGITALMENTE` (`--verde-700` sobre `--verde-100`, corpo pequeno) fica abaixo de 4.5:1. Sugestão: escurecer o verde do texto, ou aumentar o tamanho.
- `--cinza-400` é usado em `.nota-demo` e `.folha-rodape-legal` (texto informativo). Sugestão: trocar por `--cinza-700`.
- Foco visível: `a`, `button`, `input`, `select` e `textarea` recebem `outline: 3px solid var(--azul-500)` com `outline-offset: 2px`.


---

## 2. Componentes

Este projeto usa HTML + CSS + JS puros, então um "componente" é um **padrão de marcação + classes CSS (+ um gancho de JS quando há comportamento)**. Não existem *props* como em React; o equivalente aqui é a **API de classes e atributos**, documentada em tabelas com as mesmas colunas: nome, tipo, padrão e descrição.

Componentes documentados:

- [Botão](#botão)
- [Campo de formulário](#campo-de-formulário)
- [Modal](#modal)

**Para ver todos os estados renderizados**, abra `docs/preview-componentes.html` num servidor local (veja o README.md (seção "Começando em 30 segundos")). A página usa o mesmo `css/styles.css` do projeto.

Tokens citados (`--azul-900`, `--raio-sm` …) estão em [Design tokens](#1-design-tokens).


### Botão

**Propósito:** disparar uma ação (entrar, assinar, adicionar, cancelar). Existem dois botões "de conteúdo" (`.botao-primario` e `.botao-secundario`) e uma família de botões utilitários.

**Onde é usado:** CTAs do hero, formulário de login, formulário de receita, ações dos modais.

#### API

| Classe / atributo | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `.botao` | classe | obrigatória | Base: pílula (`999px`), `min-height: 48px`, peso 600, `0.95rem`, borda `2px` transparente |
| `.botao-primario` | classe (variante) | — | Fundo `--azul-900`, texto branco. Ação principal da tela |
| `.botao-secundario` | classe (variante) | — | Fundo branco, texto e borda `--azul-900`. Ação alternativa ou "cancelar" |
| `type` | `"button"` \| `"submit"` | `submit` (padrão do HTML dentro de `<form>`) | Use `type="button"` fora de formulários para evitar envio acidental |
| `disabled` | `boolean` | `false` | Bloqueia o clique. **Ainda sem estilo próprio** (veja [Estados](#estados)) |
| `data-abrir-auth` | `""` \| `"medico"` \| `"paciente"` | — | Gancho de JS: abre o login e, se houver valor, pré-seleciona o perfil |
| `aria-label` | `string` | — | Obrigatório quando o botão tiver só ícone (ex.: ✕) |

> Sempre combine `.botao` com **uma** variante. Sem variante, o botão fica sem fundo e sem cor de texto definidos.

#### Estados

| Estado | Primário | Secundário | Como é implementado |
| --- | --- | --- | --- |
| `default` | Fundo `--azul-900`, texto `--branco` | Fundo `--branco`, borda e texto `--azul-900` | Classes da variante |
| `hover` | Fundo `--azul-800` | Fundo `--azul-100` | `:hover` |
| `foco` | Anel `3px --azul-500`, `offset 2px` | Igual | Regra global `button:focus-visible` |
| `desabilitado` | ⚠ Sem estilo dedicado | ⚠ Sem estilo dedicado | Atributo `disabled` bloqueia o clique, mas o botão parece normal |
| `carregando` | ✘ Não existe | ✘ Não existe | — |

**Sugestão para o estado desabilitado** (ainda não aplicada):

```css
.botao:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Exemplos de código

```html
<!-- Ação principal -->
<button type="button" class="botao botao-primario">Sou médico(a)</button>

<!-- Ação secundária que abre o login já como paciente -->
<button type="button" class="botao botao-secundario" data-abrir-auth="paciente">
  Sou paciente
</button>

<!-- Envio de formulário, largura total -->
<button type="submit" class="botao botao-primario" style="width:100%;">Entrar</button>
```

#### Família de botões utilitários

Não usam `.botao`; têm estilo próprio.

| Classe | Uso | Observação |
| --- | --- | --- |
| `.botao-entrar` | "Entrar" no cabeçalho, menu mobile e rodapé | Pílula compacta `--azul-900`, `0.9rem` |
| `.botao-sair` | "Sair" nos painéis | Contorno `--cinza-200`, `min-height: 40px` |
| `.botao-adicionar` | "+ Novo paciente", "+ Adicionar medicamento" | Borda tracejada, largura total, `min-height: 44px` |
| `.botao-remover` | Remove uma linha de medicamento | Texto `#b42318`, exige `aria-label` |
| `.fechar-modal` | ✕ do modal e do login | Círculo de 34px |
| `.botao-menu` | Hambúrguer do cabeçalho (só ≤900px) | Exige `aria-label` e `aria-expanded` |

#### Acessibilidade

- Contraste do primário: 13.3:1; do secundário: 13.3:1 (AAA).
- Área de toque mínima de 48px em `.botao`.
- Foco sempre visível; nunca remova `outline` sem substituto.
- Botões só com ícone (✕) precisam de `aria-label`.


### Campo de formulário

**Propósito:** entrada de texto, e-mail, senha, seleção ou texto longo, sempre com rótulo visível.

**Onde é usado:** login (e-mail e senha), nova receita (paciente, medicamentos, orientações), novo paciente.

#### Estrutura

```html
<div class="campo">
  <label for="email-login">E-mail</label>
  <input type="email" id="email-login" autocomplete="username" required>
</div>
```

#### API

| Elemento / atributo | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `.campo` | classe (wrapper) | obrigatória | Espaça o campo (`margin-bottom: 16px`) e estiliza `label` e controle |
| `label[for]` | `string` | obrigatório | Deve ser igual ao `id` do controle |
| `input` | `text` \| `email` \| `password` | `text` | Controle com `min-height: 46px`, padding `12px 14px`, borda `1px --cinza-200`, raio `--raio-sm` |
| `select` | elemento | — | Mesmo estilo do `input` |
| `textarea` | elemento | — | `min-height: 88px`, `resize: vertical` |
| `required` | `boolean` | `false` | Validação nativa do navegador |
| `autocomplete` | `string` | — | Use `username` e `current-password` no login |
| `placeholder` | `string` | — | Exemplo de preenchimento. **Não substitui** o `label` |

#### Estados

| Estado | Visual | Implementação |
| --- | --- | --- |
| `default` | Borda `--cinza-200`, fundo `--branco` | `.campo input` |
| `foco` | Anel `3px --azul-500`, `offset 2px` | Regra global `input:focus-visible` |
| `erro` | Bloco vermelho **acima do formulário** (não há erro por campo) | `.mensagem-erro`, exibida removendo `.oculto` |
| `desabilitado` | ⚠ Sem estilo dedicado | — |
| `preenchido` | Igual ao default | — |

#### Exemplos de código

**Campo simples:**

```html
<div class="campo">
  <label for="orientacoes">Orientações gerais</label>
  <textarea id="orientacoes" placeholder="Ex.: repouso, retorno em 7 dias..."></textarea>
</div>
```

**Mensagem de erro do formulário** (oculta por padrão, exibida via JS):

```html
<p class="mensagem-erro oculto" id="erro-login">
  E-mail ou senha incorretos.
</p>
```

```js
document.querySelector('#erro-login').classList.remove('oculto'); // mostrar
document.querySelector('#erro-login').classList.add('oculto');    // esconder
```

**Linhas dinâmicas em grade** (medicamento + posologia + remover), como em `.linha-medicamento`:

```html
<div class="linha-medicamento">
  <div class="campo" style="margin-bottom:0;">
    <label for="med-nome-1">Medicamento</label>
    <input type="text" id="med-nome-1" required>
  </div>
  <div class="campo" style="margin-bottom:0;">
    <label for="med-pos-1">Posologia</label>
    <input type="text" id="med-pos-1" required>
  </div>
  <button type="button" class="botao-remover" aria-label="Remover medicamento">✕</button>
</div>
```

#### Acessibilidade

- Todo controle precisa de `label` associado por `for`/`id`.
- ⚠ **Lacuna atual:** `novaLinhaMedicamento()` (em `js/script.js`) cria os `<label>` **sem** `for` e os `<input>` **sem** `id`, então leitores de tela não associam rótulo e campo. Correção: gerar `id`s únicos a partir do `id` da linha (`med-nome-${id}`).
- A `.mensagem-erro` não tem `role="alert"`; adicione-o para que leitores de tela anunciem o erro.


### Modal

**Propósito:** exibir conteúdo em uma camada sobre a página, exigindo uma decisão ou leitura antes de voltar ao painel.

**Instâncias no projeto:**

| Id | Função | Conteúdo dinâmico |
| --- | --- | --- |
| `#modal-assinar` | Revisar a receita e confirmar a assinatura | `#resumo-receita` (resumo), `#selo-confirmado` (selo de sucesso) |
| `#modal-detalhe` | Ver a receita completa e imprimir | `#conteudo-detalhe` (preenchido por `abrirDetalheReceita()` com `.folha-receita`) |

#### Estrutura

```html
<div class="sobreposicao" id="meu-modal">
  <div class="modal">
    <button class="fechar-modal" data-fechar-modal aria-label="Fechar">✕</button>
    <h2 style="font-size:1.2rem;">Título do modal</h2>
    <p>Conteúdo.</p>

    <div class="modal-acoes">
      <button class="botao botao-secundario" data-fechar-modal>Cancelar</button>
      <button class="botao botao-primario">Confirmar</button>
    </div>
  </div>
</div>
```

#### API

| Classe / atributo | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `.sobreposicao` | classe (overlay) | oculta (`display: none`) | Camada de fundo `rgba(18,24,32,.55)`, tela cheia, `z-index: 100` |
| `.ativo` | classe (estado) | ausente | Torna a `.sobreposicao` visível (`display: flex`, centralizada) |
| `.modal` | classe (caixa) | obrigatória | Largura máx. `480px`, altura máx. `90vh` com rolagem, padding `26px` (`20px` em ≤480px) |
| `.fechar-modal` | classe | — | Botão ✕ no canto superior direito (`top/right: 16px`) |
| `.modal-acoes` | classe | — | Linha de botões alinhada à direita (`gap: 10px`, `margin-top: 22px`) |
| `data-fechar-modal` | atributo | — | Marca o elemento como fechador do modal |

#### Estados

| Estado | Como acontece |
| --- | --- |
| `fechado` | `.sobreposicao` sem `.ativo` |
| `aberto` | `elemento.classList.add('ativo')` |
| `assinar: em revisão` | `#botao-confirmar-assinatura` visível, `#selo-confirmado` com `.oculto` |
| `assinar: assinado` | `#selo-confirmado` visível, botão de confirmar oculto; o modal fecha sozinho após 1,4 s |

#### Como abrir e fechar

```js
const meuModal = document.querySelector('#meu-modal');

meuModal.classList.add('ativo');    // abrir
meuModal.classList.remove('ativo'); // fechar
```

O fechamento por **clique no fundo** vale para qualquer `.sobreposicao` (regra genérica). Já o **✕ / Cancelar** (`data-fechar-modal`) e a tecla **Esc** estão ligados *diretamente* a `modalAssinar` e `modalDetalhe`.

> ⚠ **Ao criar um modal novo**, registre-o nesses dois trechos de `js/script.js` (o laço de `[data-fechar-modal]` e o listener de `keydown`), ou ele só fechará clicando no fundo.

#### Acessibilidade

O que já existe: botão ✕ com `aria-label="Fechar"`, fechamento por Esc e clique no fundo, rolagem interna em telas pequenas.

**Lacunas atuais** (a corrigir):

| Falta | Correção sugerida |
| --- | --- |
| Papel semântico | `role="dialog"`, `aria-modal="true"` e `aria-labelledby` apontando para o `<h2>` |
| Foco ao abrir | Mover o foco para o modal (ex.: botão ✕ ou primeiro campo) |
| Foco ao fechar | Devolver o foco ao elemento que abriu o modal |
| Prisão de foco | Impedir que Tab saia do modal enquanto aberto |
| Rolagem do fundo | Travar o `body` com o modal aberto |
| Clique duplo em "Confirmar e assinar" | Desabilitar o botão enquanto o hash é calculado; hoje dois cliques rápidos podem gerar duas receitas |

```html
<!-- Como deveria ficar -->
<div class="sobreposicao" id="modal-assinar">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-assinar">
    <h2 id="titulo-assinar" style="font-size:1.2rem;">Assinar digitalmente</h2>
    …
  </div>
</div>
```


---

## 3. Fluxo de navegação

O Receita Segura é uma **página única (SPA sem roteador)**. Não há rotas de URL: cada "tela" é um bloco de `index.html` que aparece ou desaparece por classe CSS. Por isso, em vez de rotas, este documento registra o **identificador da tela** (`id` no HTML) e **o que dispara cada transição**.

> O botão "voltar" do navegador **não** navega entre as telas. A URL só muda com os âncoras da página pública (`#topo`, `#como-funciona`, `#seguranca`).


### Diagrama geral

![Diagrama geral de navegação entre as telas](img/fluxo-navegacao.png)

Caixas tracejadas são modais: **estados sobrepostos**, não telas, que ficam por cima do painel que os abriu. Setas tracejadas indicam retorno ou saída.


### Telas

| Tela | Id | Como é exibida | Conteúdo |
| --- | --- | --- | --- |
| Site público | `#site-publico` | Visível ao carregar; some com `.oculto` | Cabeçalho, hero, "Como funciona" (`#como-funciona`), "Segurança" (`#seguranca`), rodapé |
| Login | `#tela-auth` | `.oculto` removido por `abrirAuth()` | Alternador de perfil, e-mail, senha, credenciais de demonstração |
| Painel do médico | `#painel-medico` | Classe `.ativo` | Lista de pacientes, formulário de nova receita, receitas emitidas |
| Painel do paciente | `#painel-paciente` | Classe `.ativo` | Lista "Minhas receitas" |
| Modal de assinatura | `#modal-assinar` | Classe `.ativo` | Resumo da receita e confirmação |
| Modal de detalhe | `#modal-detalhe` | Classe `.ativo` | Folha da receita com hash e botão de imprimir |


### Transições

| De | Para | Gatilho | Função em `js/script.js` |
| --- | --- | --- | --- |
| Site público | Login | Qualquer elemento com `data-abrir-auth` (cabeçalho, menu mobile, hero, rodapé) | `abrirAuth(papel)` |
| Site público | Login (perfil pré-selecionado) | Hero: "Sou médico(a)" (`data-abrir-auth="medico"`) ou "Sou paciente" (`="paciente"`) | `abrirAuth(papel)` → `selecionarPapel()` |
| Login | Site público | Botão ✕ (`data-fechar-auth`) | `fecharAuth()` |
| Login | Painel do médico | Submit com `camila@clinica.com` / `demo123` e perfil "médico(a)" | `abrirPainelMedico()` |
| Login | Painel do paciente | Submit com `joao@email.com` / `demo123` e perfil "paciente" | `abrirPainelPaciente()` |
| Login | Login (erro) | Submit com credenciais erradas | Exibe `#erro-login` |
| Qualquer painel | Site público | Botão "Sair" (`data-sair`) | Handler de `[data-sair]` |
| Painel do médico | Modal de assinatura | Submit do `#form-receita` | Handler de `submit` do formulário |
| Modal de assinatura | Painel do médico | Confirmar (fecha após 1,4 s), Cancelar, ✕, Esc ou clique fora | Handlers de `data-fechar-modal` e `keydown` |
| Qualquer painel | Modal de detalhe | Clique num item da lista de receitas | `abrirDetalheReceita(receita)` |
| Modal de detalhe | Painel de origem | ✕, Esc ou clique fora | Handlers de `data-fechar-modal` e `keydown` |

**Navegação por âncoras (só na página pública):**

| Link | Destino |
| --- | --- |
| Logo (`href="#topo"`) | `<main id="topo">` |
| "Como funciona" | `#como-funciona` |
| "Segurança" | `#seguranca` |


### Fluxo de emissão de receita

O fluxo principal do produto, do painel médico até o paciente ver a receita.

| Passo | Quem | O que acontece |
| --- | --- | --- |
| 1 | Médico(a) | Escolhe o paciente e preenche medicamentos e posologia no painel |
| 2 | Médico(a) | Clica em "Revisar e assinar digitalmente" |
| 3 | Painel do médico | Abre o modal de assinatura com o resumo da receita |
| 4 | Médico(a) | Clica em "Confirmar e assinar" |
| 5 | Modal de assinatura | Calcula o SHA-256 do conteúdo (dados da receita + data/hora) |
| 6 | Modal de assinatura | Adiciona a receita (id `RS-…`, hash, …) no início de `estado.receitas` |
| 7 | Modal de assinatura | Mostra o selo "ASSINADO DIGITALMENTE" e fecha sozinho após 1,4 s |
| 8 | Painel do médico | Redesenha a lista com `renderizarReceitasEmitidas()` |
| 9 | Paciente | Faz login e abre "Minhas receitas" |
| 10 | Painel do paciente | Lista as receitas cujo paciente é "João Ferreira Lima" |


### Permissões

| Ação | Médico(a) | Paciente | Visitante |
| --- | :---: | :---: | :---: |
| Ver site público | ✔ | ✔ | ✔ |
| Ver lista de pacientes | ✔ | ✘ | ✘ |
| Criar e assinar receitas | ✔ | ✘ | ✘ |
| Ver todas as receitas emitidas | ✔ | ✘ | ✘ |
| Ver as próprias receitas | n/a | ✔ | ✘ |
| Abrir detalhe e imprimir receita | ✔ | ✔ | ✘ |

> **Aviso:** as permissões são só de interface. Como não há servidor, quem abrir o DevTools consegue acessar tudo. Em produção, essas regras precisam ser impostas no back-end.
>
> No protótipo, o painel do paciente filtra por um nome fixo (`'João Ferreira Lima'`) em `renderizarReceitasPaciente()`.


### Estados de cada tela

| Tela | Vazio | Carregando | Erro |
| --- | --- | --- | --- |
| Login | Formulário em branco | n/a | `#erro-login`: "E-mail ou senha incorretos…" |
| Painel do médico: receitas emitidas | "Nenhuma receita emitida ainda." | n/a | n/a |
| Painel do médico: nova receita | Uma linha de medicamento em branco | n/a | Validação nativa (`required`); submit ignorado se faltar paciente ou medicamento |
| Painel do paciente | "Nenhuma receita disponível ainda." | n/a | n/a |
| Modal de assinatura | n/a | ⚠ Sem indicador enquanto o hash é calculado | n/a |
| Modal de detalhe | n/a | n/a | n/a |

Não há estados de carregamento nem de erro de rede porque nada é enviado a servidor.
