# Receita Segura

Protótipo **front-end** de uma plataforma onde médicos emitem receitas assinadas digitalmente (hash SHA-256) e pacientes as consultam, legíveis e sempre disponíveis.

> ⚠️ **Protótipo de demonstração.** Não há servidor nem banco de dados: os dados vivem só na memória da página e somem ao recarregar. A "assinatura digital" é um hash SHA-256 calculado no navegador e **não tem validade legal**.

---

## Sumário

- [Stack](#stack)
- [Começando em 30 segundos](#começando-em-30-segundos)
- [Credenciais de demonstração](#credenciais-de-demonstração)
- [Scripts](#scripts)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Onde está cada coisa no JavaScript](#onde-está-cada-coisa-no-javascript)
- [Documentação de UI](#documentação-de-ui)
- [Como contribuir](#como-contribuir)
- [Limitações conhecidas](#limitações-conhecidas)

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Marcação | HTML5 semântico (página única) |
| Estilo | CSS puro com variáveis (`:root`), sem pré-processador |
| Comportamento | JavaScript puro (ES2020+), sem framework |
| Tipografia | [Fraunces](https://fonts.google.com/specimen/Fraunces) (títulos) e [Inter](https://fonts.google.com/specimen/Inter) (corpo), via Google Fonts |
| Assinatura | Web Crypto API (`crypto.subtle.digest('SHA-256', …)`) |

Não há `package.json`, bundler nem etapa de build.

---

## Começando em 30 segundos

**Requisitos:** um navegador moderno (Chrome, Edge, Firefox ou Safari atuais). Para o modo recomendado, Python 3 **ou** Node.js.

```bash
1. Baixe o projeto
bash
git clone https://github.com/Caliel1/Receita-Segura-Front.git
2. Rode (escolha uma opção)

Opção A: Live Server (VS Code) — recomendada

No VS Code, instale a extensão Live Server (autor: Ritwick Dey) na aba de extensões.
Abra a pasta Receita-Segura-Front/receita-segura (File → Open Folder, a pasta que contém o index.html).
Clique com o botão direito no index.html e escolha Open with Live Server (ou clique em Go Live, no canto inferior direito).
O navegador abre em http://127.0.0.1:5500 e recarrega sozinho a cada alteração salva.

Opção B: terminal (sem VS Code)

bash
cd Receita-Segura-Front/receita-segura
python3 -m http.server 5500   # ou: npx serve .
# depois abra http://localhost:5500 no navegador
```

Também funciona abrindo o `index.html` direto no navegador. Prefira o servidor local: a Web Crypto API (usada para gerar o hash da receita) exige *contexto seguro*, e `localhost` conta como seguro.

> O projeto espera o arquivo `assets/logo.jpeg` (logo e favicon). Sem ele, a imagem aparece quebrada, mas nada mais deixa de funcionar.

---

## Credenciais de demonstração

Autenticação simulada no front-end, com credenciais fixas em `js/script.js` (`CREDENCIAIS`).

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Médico(a) — Dra. Camila Duarte | `camila@clinica.com` | `demo123` |
| Paciente — João Ferreira Lima | `joao@email.com` | `demo123` |

---

## Scripts

Não existem scripts de build, teste ou lint. Os comandos úteis são:

| Comando | O que faz |
| --- | --- |
| `python3 -m http.server 5500` | Serve o projeto em `http://localhost:5500` |
| `npx serve .` | Alternativa em Node.js para servir a pasta |

---

## Variáveis de ambiente

Nenhuma. Não há arquivo `.env` nem chamadas a APIs externas (exceto o carregamento das fontes do Google Fonts).

---

## Estrutura de pastas

```text
receita-segura/
├── index.html          # Todas as telas e modais (site, login, painéis, modais)
├── css/
│   └── styles.css      # Tokens (:root), componentes e responsividade
├── js/
│   └── script.js       # Estado, navegação entre telas, formulários e assinatura
├── assets/
│   └── logo.jpeg       # Logo (cabeçalho, rodapé, favicon, folha da receita)
├── docs/
│   ├── documentacao-ui.docx     # Design tokens, componentes e fluxo de navegação (Word)
│   ├── preview-componentes.html # Estados dos componentes renderizados
│   └── img/
│       └── paleta.png           # Preview da paleta de cores
└── README.md
```

Dentro do `index.html`, cada tela é um bloco de nível superior, alternado por classes CSS (não há roteador):

| Id | Tela |
| --- | --- |
| `#site-publico` | Página de apresentação (hero, como funciona, segurança) |
| `#tela-auth` | Login com alternância médico(a)/paciente |
| `#painel-medico` | Pacientes, nova receita e receitas emitidas |
| `#painel-paciente` | Lista de receitas do paciente |
| `#modal-assinar` / `#modal-detalhe` | Modais de assinatura e de detalhe da receita |

---

## Onde está cada coisa no JavaScript

Tudo está em `js/script.js`, na ordem abaixo.

| Função / bloco | Responsabilidade |
| --- | --- |
| `estado` | Objeto único com receitas, usuário logado e contadores |
| `CREDENCIAIS` | Contas de demonstração (médico e paciente) |
| `abrirAuth`, `fecharAuth`, `selecionarPapel` | Entrada e saída da tela de login |
| `abrirPainelMedico`, `abrirPainelPaciente`, `fecharTodosPaineis` | Troca de painel após login/logout |
| `adicionarNovoPaciente` | Inclui paciente na lista lateral do painel médico |
| `novaLinhaMedicamento` | Cria uma linha de medicamento/posologia no formulário |
| `gerarHashSha256` | Calcula o SHA-256 do conteúdo da receita |
| `renderizarReceitasEmitidas`, `renderizarReceitasPaciente` | Desenham as listas de receitas |
| `abrirDetalheReceita` | Monta a folha da receita no modal e permite imprimir |

---

## Documentação de UI

| Seção de [docs/documentacao-ui.md](receita-segura/docs/documentacao-ui.md) | Conteúdo |
| --- | --- |
| 1. Design tokens | Paleta com hex, tipografia, espaçamento, raios, sombras, breakpoints e contraste |
| 2. Componentes | Botão, Campo de formulário e Modal: API, estados, exemplos e acessibilidade |
| 3. Fluxo de navegação | Diagrama de telas, transições, permissões e estados de cada tela |

---

## Como contribuir

1. **Crie uma branch** a partir da principal: `git checkout -b feature/nome-curto`.
2. **Use os tokens.** Cores, raios e sombras vêm de `var(--…)`, sem hex solto no CSS. Veja a seção "1. Design tokens" em [`docs/documentacao-ui.docx`](docs/documentacao-ui.docx).
3. **Siga as convenções de nomes:**
   - classes CSS em português, `kebab-case` (`.botao-primario`, `.cartao-auth`);
   - modificadores como classes irmãs (`.botao` + `.botao-primario`);
   - estados por classe utilitária (`.ativo`, `.oculto`, `.selecionado`);
   - ganchos de JS por atributo `data-*` (`data-abrir-auth`, `data-fechar-modal`), não por classe de estilo.
4. **Mantenha o foco visível e alvos de toque ≥ 40px** (regras globais já cobrem `:focus-visible`).
5. **Atualize a doc no mesmo PR.** Mudou um componente, token ou fluxo? Mude o arquivo correspondente em `/docs`. Isso faz parte da definição de pronto.
6. **Teste manualmente** os dois perfis (médico e paciente) e a largura mobile (≤ 480px).
7. **Abra o Pull Request** descrevendo o que mudou na UI e anexando capturas de tela quando houver mudança visual.

---

## Limitações conhecidas

- **Sem persistência:** recarregar a página apaga as receitas criadas.
- **Autenticação simulada:** credenciais fixas no código, sem sessão real.
- **Assinatura sem validade legal:** o hash prova só a integridade do conteúdo no navegador, não a identidade do médico (não há certificado ICP-Brasil).
- **Sem roteamento:** as telas alternam por classes; o botão "voltar" do navegador não navega entre elas.
- **Sanitização:** nomes de pacientes e medicamentos entram via `innerHTML` sem escape. Para produção, usar `textContent` ou sanitizar.
- **Acessibilidade dos modais:** faltam `role="dialog"`, `aria-modal` e prisão/retorno de foco (detalhes na seção "2. Componentes › Modal" de [`docs/documentacao-ui.docx`](docs/documentacao-ui.docx)).
