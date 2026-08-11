# 🐶🍺 Bar do Bastião — Site + Sistema de Gestão

Site institucional, **cardápio virtual com pedido online**, **Box de Boteco** e um
**painel de gestão** completo (estoque, financeiro/DRE e fichas técnicas) para o
Bar do Bastião — Itapema/SC.

Tudo funciona **sem servidor**: são páginas estáticas (HTML/CSS/JS). Dá pra abrir
direto no navegador ou publicar de graça (GitHub Pages, Netlify, etc.).

---

## 📂 O que tem aqui

| Página | Para quê |
|---|---|
| `index.html` | **Cardápio virtual** para o cliente: história do bar, cardápio com fotos, carrinho e **pedido finalizado no WhatsApp**, e o **Box de Boteco** (combos prontos + "monte o seu"). |
| `gestao.html` | **Painel de gestão** (uso da equipe, com senha): visão geral, fichas técnicas, estoque e financeiro. |

```
bar-do-bastiao/
├── index.html            → cardápio / loja
├── gestao.html           → painel de gestão
└── assets/
    ├── css/styles.css    → estilo do cardápio
    ├── css/gestao.css    → estilo do painel
    ├── img/logo.svg      → logotipo (marca do Bastião)
    └── js/
        ├── data.js       → CARDÁPIO + INSUMOS + FICHAS TÉCNICAS (o coração)
        ├── images.js     → fotos dos produtos (geradas por IA)
        ├── storefront.js → lógica do cardápio e do carrinho
        └── gestao.js     → lógica do painel de gestão
```

---

## 🍽️ Cardápio (cliente)

- Categorias: **Petiscos & Porções, Pastéis, Do Bastião (carnes), Drinks & Caipirinhas, Bebidas**.
- 30 itens já cadastrados (croquete de costela, mandioca frita, torresmo de rolo,
  pastéis, iscas de alcatra/tilápia, caipirinhas de limão/morango/kiwi, Cuba Libre,
  gin tônica, batida de coco, etc.), cada um com **foto**.
- Carrinho + **checkout pelo WhatsApp**: o pedido vira uma mensagem prontinha.
- **Box de Boteco**: 3 combos prontos (Solo, da Galera, Premium) + **"Monte seu box"**
  escolhendo os petiscos com preço especial.

> ⚠️ **Antes de divulgar, troque o número do WhatsApp!** Ele está em
> `assets/js/data.js` (campo `whatsapp`) e também no painel em **Configurações**.
> Formato: `55` + DDD + número, só dígitos. Ex.: `5547999998888`.

---

## 📊 Painel de gestão (`gestao.html`)

**Senha inicial:** `bastiao2025` (troque em **Configurações**).

- **Visão geral** — faturamento, despesas, resultado do mês, CMV médio, margem média,
  valor em estoque, itens em alerta e ranking dos produtos mais lucrativos.
- **Cardápio & Fichas Técnicas** — cada produto com **custo, preço de venda, CMV%,
  margem de contribuição (R$ e %) e markup**. Clique no item para abrir a **ficha
  técnica** com os ingredientes e a **simulação de preço** (mudou o preço, a margem
  recalcula na hora).
- **Estoque** — insumos com estoque, mínimo, custo unitário e valor. Edição direto na
  tabela; **+ Entrada** registra uma compra (soma no estoque e lança a despesa).
- **Financeiro** — **registrar venda rápida** (lança a receita, o CMV e dá baixa no
  estoque), **DRE simplificado** do mês e lista de lançamentos (receitas e despesas).
- **Configurações** — dados do bar, **backup (exportar/importar .json)**, senha e
  restaurar dados de exemplo.

Os dados ficam salvos **no navegador** (localStorage). Faça **backup** de vez em
quando pela tela de Configurações e importe no aparelho do bar (tablet/notebook).

### 💡 Como ler os indicadores de ficha técnica
- **Custo** = soma dos insumos da ficha (calculado automático).
- **Preço de venda** = quanto você cobra.
- **CMV (%)** = custo ÷ preço. *Quanto menor, melhor.* (verde ≤30%, atenção 30–40%, alto >40%)
- **Margem de contribuição** = preço − custo (o que sobra pra pagar as contas e dar lucro).
- **Markup** = preço ÷ custo (quantas vezes o custo o preço representa).

> Os valores de custo e preço são **sugestões realistas** para Itapema/SC — revise e
> ajuste conforme seus fornecedores. Ao mudar o custo de um insumo no Estoque, **todas
> as fichas se atualizam**.

---

## 🌐 Publicar online (URL pública grátis)

**Opção mais simples — GitHub Pages:**
1. No GitHub, abra o repositório → **Settings** → **Pages**.
2. Em *Build and deployment*, escolha **Deploy from a branch**.
3. Selecione a branch (ex.: a branch deste projeto) e a pasta `/root` (ou `/docs`),
   salve. Em ~1 minuto o site fica no ar em `https://<usuário>.github.io/<repo>/bar-do-bastiao/`.

*(Se preferir a raiz do domínio, é só mover os arquivos da pasta `bar-do-bastiao/`
para a raiz do repositório.)*

**Netlify (arrastar e soltar):** entre em app.netlify.com, arraste a pasta
`bar-do-bastiao` para a área de deploy e pronto — sai um link público na hora.

---

## 🖼️ Fotos dos produtos

As fotos foram geradas por IA e ficam referenciadas em `assets/js/images.js`.
Para trocar por fotos reais do bar, basta substituir a URL da chave correspondente
(ou colocar as imagens em `assets/img/` e apontar o caminho). Se uma foto não
carregar, o cardápio mostra automaticamente um selo com a inicial do prato.
