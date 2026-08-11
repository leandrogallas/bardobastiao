/* =====================================================================
   BAR DO BASTIÃO — Base de dados do sistema
   ---------------------------------------------------------------------
   Este arquivo concentra TODO o cardápio, insumos e fichas técnicas.
   Ele é usado tanto pelo cardápio virtual (index.html) quanto pelo
   painel de gestão (gestao.html).

   Os valores (custos e preços) são sugestões realistas para Itapema/SC.
   A dona do bar pode ajustar tudo pelo painel de gestão.
   ===================================================================== */

window.BAR = {
  /* ---- Identidade / contato (AJUSTE AQUI o WhatsApp e dados reais) ---- */
  contato: {
    nome: "Bar do Bastião",
    slogan: "O melhor bar do canto da praia",
    // Coloque o número no formato internacional, só dígitos: 55 + DDD + número
    whatsapp: "5547900000000",
    instagram: "bardobastiao_",
    endereco: "Itapema – Rua 111, nº 174",
    cidade: "Itapema – SC",
    horario: "Ter a Dom, 17h à 00h",
    // Taxa de entrega padrão (R$). 0 = combinar pelo WhatsApp
    taxaEntrega: 8,
    pedidoMinimo: 25,
  },

  /* ---- Categorias do cardápio ---- */
  categorias: [
    { id: "petiscos", nome: "Petiscos & Porções", icone: "🍟", desc: "Fritos crocantes pra dividir na mesa" },
    { id: "pasteis",  nome: "Pastéis da Feira",    icone: "🥟", desc: "Massa fininha e recheio generoso" },
    { id: "carnes",   nome: "Do Bastião (Carnes)", icone: "🥩", desc: "Iscas e porções especiais da casa" },
    { id: "drinks",   nome: "Drinks & Caipirinhas",icone: "🍹", desc: "Autorais e clássicos de boteco" },
    { id: "bebidas",  nome: "Bebidas",             icone: "🍺", desc: "Geladas e refrescantes" },
  ],

  /* ---- Insumos (estoque) ----
     unidade: kg | L | un
     custoUnit: custo por unidade base (R$)
     estoque: quantidade atual  |  estoqueMin: alerta de compra   */
  insumos: [
    { id: "costela_desf",   nome: "Costela bovina desfiada", unidade: "kg", custoUnit: 38.00, estoque: 6,  estoqueMin: 3 },
    { id: "farinha_rosca",  nome: "Farinha de rosca",        unidade: "kg", custoUnit: 12.00, estoque: 5,  estoqueMin: 2 },
    { id: "batata_palito",  nome: "Batata palito congelada", unidade: "kg", custoUnit: 9.00,  estoque: 15, estoqueMin: 6 },
    { id: "batata",         nome: "Batata inglesa",          unidade: "kg", custoUnit: 6.00,  estoque: 8,  estoqueMin: 3 },
    { id: "mandioca",       nome: "Mandioca descascada",     unidade: "kg", custoUnit: 8.00,  estoque: 12, estoqueMin: 5 },
    { id: "polenta",        nome: "Polenta pré-cozida",      unidade: "kg", custoUnit: 7.00,  estoque: 6,  estoqueMin: 3 },
    { id: "barriga_suina",  nome: "Barriga suína",           unidade: "kg", custoUnit: 26.00, estoque: 4,  estoqueMin: 2 },
    { id: "calabresa",      nome: "Linguiça calabresa",      unidade: "kg", custoUnit: 24.00, estoque: 5,  estoqueMin: 2 },
    { id: "linguica_art",   nome: "Linguiça artesanal",      unidade: "kg", custoUnit: 32.00, estoque: 4,  estoqueMin: 2 },
    { id: "frango_asa",     nome: "Coxinha da asa (frango)", unidade: "kg", custoUnit: 15.00, estoque: 7,  estoqueMin: 3 },
    { id: "alcatra",        nome: "Alcatra",                 unidade: "kg", custoUnit: 44.00, estoque: 5,  estoqueMin: 3 },
    { id: "file_tilapia",   nome: "Filé de tilápia",         unidade: "kg", custoUnit: 39.00, estoque: 4,  estoqueMin: 2 },
    { id: "bacalhau",       nome: "Bacalhau dessalgado",     unidade: "kg", custoUnit: 58.00, estoque: 2,  estoqueMin: 1 },
    { id: "file_frango",    nome: "Filé de frango",          unidade: "kg", custoUnit: 19.00, estoque: 6,  estoqueMin: 3 },
    { id: "disco_pastel",   nome: "Disco de pastel",         unidade: "un", custoUnit: 0.55,  estoque: 200,estoqueMin: 60 },
    { id: "camarao",        nome: "Camarão limpo",           unidade: "kg", custoUnit: 60.00, estoque: 2,  estoqueMin: 1 },
    { id: "muçarela",       nome: "Muçarela",                unidade: "kg", custoUnit: 36.00, estoque: 5,  estoqueMin: 2 },
    { id: "carne_moida",    nome: "Carne moída",             unidade: "kg", custoUnit: 28.00, estoque: 5,  estoqueMin: 2 },
    { id: "carne_seca",     nome: "Carne seca dessalgada",   unidade: "kg", custoUnit: 56.00, estoque: 3,  estoqueMin: 1 },
    { id: "catupiry",       nome: "Requeijão cremoso",       unidade: "kg", custoUnit: 24.00, estoque: 4,  estoqueMin: 2 },
    { id: "cebola",         nome: "Cebola",                  unidade: "kg", custoUnit: 5.00,  estoque: 10, estoqueMin: 4 },
    { id: "alho",           nome: "Alho",                    unidade: "kg", custoUnit: 22.00, estoque: 2,  estoqueMin: 1 },
    { id: "farinha_mand",   nome: "Farinha de mandioca",     unidade: "kg", custoUnit: 8.00,  estoque: 4,  estoqueMin: 2 },
    { id: "oleo",           nome: "Óleo de soja (fritura)",  unidade: "L",  custoUnit: 8.50,  estoque: 20, estoqueMin: 8 },
    { id: "temperos",       nome: "Temperos / sal / diversos",unidade:"kg", custoUnit: 15.00, estoque: 3,  estoqueMin: 1 },
    { id: "limao",          nome: "Limão taiti",             unidade: "kg", custoUnit: 6.00,  estoque: 8,  estoqueMin: 3 },
    { id: "morango",        nome: "Morango",                 unidade: "kg", custoUnit: 22.00, estoque: 3,  estoqueMin: 1 },
    { id: "kiwi",           nome: "Kiwi",                    unidade: "kg", custoUnit: 14.00, estoque: 3,  estoqueMin: 1 },
    { id: "acucar",         nome: "Açúcar",                  unidade: "kg", custoUnit: 5.00,  estoque: 10, estoqueMin: 4 },
    { id: "gelo",           nome: "Gelo",                    unidade: "kg", custoUnit: 2.00,  estoque: 30, estoqueMin: 10 },
    { id: "cachaca",        nome: "Cachaça prata",           unidade: "L",  custoUnit: 22.00, estoque: 8,  estoqueMin: 3 },
    { id: "vodka",          nome: "Vodka",                   unidade: "L",  custoUnit: 40.00, estoque: 4,  estoqueMin: 2 },
    { id: "rum",            nome: "Rum",                     unidade: "L",  custoUnit: 45.00, estoque: 3,  estoqueMin: 1 },
    { id: "gin",            nome: "Gin",                     unidade: "L",  custoUnit: 65.00, estoque: 3,  estoqueMin: 1 },
    { id: "coca_lata",      nome: "Coca-Cola (lata)",        unidade: "un", custoUnit: 3.00,  estoque: 48, estoqueMin: 24 },
    { id: "tonica",         nome: "Água tônica (un)",        unidade: "un", custoUnit: 3.50,  estoque: 24, estoqueMin: 12 },
    { id: "leite_coco",     nome: "Leite de coco",           unidade: "L",  custoUnit: 14.00, estoque: 3,  estoqueMin: 1 },
    { id: "leite_cond",     nome: "Leite condensado",        unidade: "kg", custoUnit: 22.00, estoque: 4,  estoqueMin: 2 },
    { id: "frutas_verm",    nome: "Frutas vermelhas",        unidade: "kg", custoUnit: 28.00, estoque: 2,  estoqueMin: 1 },
    { id: "emb_box",        nome: "Embalagem box delivery",  unidade: "un", custoUnit: 4.50,  estoque: 100,estoqueMin: 30 },
    { id: "emb_porcao",     nome: "Embalagem porção",        unidade: "un", custoUnit: 1.80,  estoque: 200,estoqueMin: 50 },
  ],

  /* ---- Produtos (com ficha técnica) ----
     ficha: linhas {ins: idInsumo, qtd: quantidade na unidade do insumo}
     preco: preço de venda (R$)  |  imgKey: chave da foto (images.js)
     rende: rendimento/porção descrita   |  disp: disponível no cardápio */
  produtos: [
    /* ---------------- PETISCOS & PORÇÕES ---------------- */
    { id:"croquete_costela", cat:"petiscos", nome:"Croquete de Costela", rende:"6 unidades",
      desc:"Croquete cremoso de costela desfiada, empanado e frito na hora. Vai com maionese da casa.",
      preco:34.90, imgKey:"croquete", disp:true, box:true, boxPreco:32.90, destaque:true,
      ficha:[ {ins:"costela_desf",qtd:0.18},{ins:"farinha_rosca",qtd:0.05},{ins:"oleo",qtd:0.05},{ins:"temperos",qtd:0.02},{ins:"emb_porcao",qtd:1} ] },

    { id:"mandioca_frita", cat:"petiscos", nome:"Mandioca Frita", rende:"400g",
      desc:"Mandioca cremosa por dentro e crocante por fora, com aioli de alho.",
      preco:26.90, imgKey:"mandioca", disp:true, box:true, boxPreco:24.90,
      ficha:[ {ins:"mandioca",qtd:0.45},{ins:"oleo",qtd:0.06},{ins:"temperos",qtd:0.02},{ins:"emb_porcao",qtd:1} ] },

    { id:"batata_frita", cat:"petiscos", nome:"Batata Frita Rústica", rende:"400g",
      desc:"Batata palito sequinha, sal grosso e cheiro-verde.",
      preco:24.90, imgKey:"batata", disp:true, box:true, boxPreco:22.90,
      ficha:[ {ins:"batata_palito",qtd:0.45},{ins:"oleo",qtd:0.06},{ins:"temperos",qtd:0.01},{ins:"emb_porcao",qtd:1} ] },

    { id:"polenta_frita", cat:"petiscos", nome:"Polenta Frita", rende:"350g",
      desc:"Palitos de polenta crocantes com molho da casa.",
      preco:22.90, imgKey:"polenta", disp:true, box:true, boxPreco:20.90,
      ficha:[ {ins:"polenta",qtd:0.40},{ins:"oleo",qtd:0.05},{ins:"temperos",qtd:0.01},{ins:"emb_porcao",qtd:1} ] },

    { id:"torresmo_rolo", cat:"petiscos", nome:"Torresmo de Rolo", rende:"300g",
      desc:"Torresmo de rolo pururuca, com limão e farinha. Clássico do Bastião.",
      preco:34.90, imgKey:"torresmo", disp:true, box:true, boxPreco:32.90, destaque:true,
      ficha:[ {ins:"barriga_suina",qtd:0.35},{ins:"farinha_mand",qtd:0.03},{ins:"oleo",qtd:0.03},{ins:"temperos",qtd:0.02},{ins:"emb_porcao",qtd:1} ] },

    { id:"calabresa_aceb", cat:"petiscos", nome:"Calabresa Acebolada", rende:"350g",
      desc:"Calabresa fatiada na chapa com cebola caramelizada.",
      preco:29.90, imgKey:"calabresa", disp:true, box:true, boxPreco:27.90,
      ficha:[ {ins:"calabresa",qtd:0.32},{ins:"cebola",qtd:0.10},{ins:"oleo",qtd:0.02},{ins:"emb_porcao",qtd:1} ] },

    { id:"linguica_frita", cat:"petiscos", nome:"Linguiça Artesanal", rende:"400g",
      desc:"Linguiça artesanal frita com cebola. Vai bem com a cerveja.",
      preco:36.90, imgKey:"linguica", disp:true, box:true, boxPreco:34.90,
      ficha:[ {ins:"linguica_art",qtd:0.38},{ins:"cebola",qtd:0.08},{ins:"oleo",qtd:0.02},{ins:"emb_porcao",qtd:1} ] },

    { id:"bolinho_bacalhau", cat:"petiscos", nome:"Bolinho de Bacalhau", rende:"8 unidades",
      desc:"Bolinho cremoso de bacalhau, dourado, com limão.",
      preco:36.90, imgKey:"bolinho_bacalhau", disp:true, box:true, boxPreco:34.90,
      ficha:[ {ins:"bacalhau",qtd:0.15},{ins:"batata",qtd:0.12},{ins:"oleo",qtd:0.05},{ins:"temperos",qtd:0.02},{ins:"emb_porcao",qtd:1} ] },

    /* ---------------- PASTÉIS ---------------- */
    { id:"pastel_camarao", cat:"pasteis", nome:"Pastel de Camarão", rende:"1 unidade grande",
      desc:"Massa fininha e crocante, recheio generoso de camarão com catupiry.",
      preco:15.90, imgKey:"pastel_camarao", disp:true, box:true, boxPreco:14.90, destaque:true,
      ficha:[ {ins:"disco_pastel",qtd:1},{ins:"camarao",qtd:0.05},{ins:"catupiry",qtd:0.02},{ins:"oleo",qtd:0.02} ] },

    { id:"pastel_queijo", cat:"pasteis", nome:"Pastel de Queijo", rende:"1 unidade grande",
      desc:"Muçarela derretida saindo pelas beiradas.",
      preco:12.90, imgKey:"pastel_queijo", disp:true, box:true, boxPreco:11.90,
      ficha:[ {ins:"disco_pastel",qtd:1},{ins:"muçarela",qtd:0.06},{ins:"oleo",qtd:0.02} ] },

    { id:"pastel_carne", cat:"pasteis", nome:"Pastel de Carne", rende:"1 unidade grande",
      desc:"Carne moída temperada na hora.",
      preco:13.90, imgKey:"pastel_carne", disp:true, box:true, boxPreco:12.90,
      ficha:[ {ins:"disco_pastel",qtd:1},{ins:"carne_moida",qtd:0.07},{ins:"cebola",qtd:0.01},{ins:"oleo",qtd:0.02} ] },

    { id:"pastel_carne_seca", cat:"pasteis", nome:"Pastel de Carne Seca c/ Catupiry", rende:"1 unidade grande",
      desc:"Carne seca desfiada com requeijão cremoso. O queridinho.",
      preco:16.90, imgKey:"pastel_carne_seca", disp:true, box:true, boxPreco:15.90, destaque:true,
      ficha:[ {ins:"disco_pastel",qtd:1},{ins:"carne_seca",qtd:0.06},{ins:"catupiry",qtd:0.03},{ins:"oleo",qtd:0.02} ] },

    /* ---------------- DO BASTIÃO (CARNES) ---------------- */
    { id:"frango_passarinho", cat:"carnes", nome:"Frango a Passarinho", rende:"500g",
      desc:"Frango frito no alho e óleo, crocante, com alho tostado.",
      preco:34.90, imgKey:"frango_passarinho", disp:true, box:true, boxPreco:32.90,
      ficha:[ {ins:"frango_asa",qtd:0.55},{ins:"alho",qtd:0.03},{ins:"oleo",qtd:0.06},{ins:"temperos",qtd:0.02},{ins:"emb_porcao",qtd:1} ] },

    { id:"iscas_alcatra", cat:"carnes", nome:"Iscas de Alcatra Acebolada", rende:"350g",
      desc:"Iscas de alcatra na chapa com cebola e pimentão.",
      preco:48.90, imgKey:"iscas_alcatra", disp:true, box:true, boxPreco:46.90, destaque:true,
      ficha:[ {ins:"alcatra",qtd:0.34},{ins:"cebola",qtd:0.08},{ins:"oleo",qtd:0.02},{ins:"emb_porcao",qtd:1} ] },

    { id:"iscas_tilapia", cat:"carnes", nome:"Iscas de Tilápia Frita", rende:"350g",
      desc:"Tilápia empanada crocante com molho tártaro e limão.",
      preco:44.90, imgKey:"iscas_tilapia", disp:true, box:true, boxPreco:42.90,
      ficha:[ {ins:"file_tilapia",qtd:0.33},{ins:"farinha_rosca",qtd:0.04},{ins:"oleo",qtd:0.05},{ins:"emb_porcao",qtd:1} ] },

    { id:"isca_frango_mil", cat:"carnes", nome:"Isca de Frango à Milanesa", rende:"400g",
      desc:"Iscas de frango empanadas, douradinhas, com limão.",
      preco:32.90, imgKey:"isca_frango_milanesa", disp:true, box:true, boxPreco:30.90,
      ficha:[ {ins:"file_frango",qtd:0.38},{ins:"farinha_rosca",qtd:0.06},{ins:"oleo",qtd:0.06},{ins:"temperos",qtd:0.02},{ins:"emb_porcao",qtd:1} ] },

    /* ---------------- DRINKS & CAIPIRINHAS ---------------- */
    { id:"caipirinha_limao", cat:"drinks", nome:"Caipirinha de Limão", rende:"300ml",
      desc:"A clássica: cachaça, limão taiti, açúcar e muito gelo.",
      preco:18.90, imgKey:"caipirinha_limao", disp:true, destaque:true,
      ficha:[ {ins:"cachaca",qtd:0.06},{ins:"limao",qtd:0.10},{ins:"acucar",qtd:0.02},{ins:"gelo",qtd:0.15} ] },

    { id:"caipirinha_morango", cat:"drinks", nome:"Caipirinha de Morango", rende:"300ml",
      desc:"Morango fresco macerado com cachaça e açúcar.",
      preco:22.90, imgKey:"caipirinha_morango", disp:true,
      ficha:[ {ins:"cachaca",qtd:0.06},{ins:"morango",qtd:0.08},{ins:"acucar",qtd:0.02},{ins:"gelo",qtd:0.15} ] },

    { id:"caipirinha_kiwi", cat:"drinks", nome:"Caipirinha de Kiwi", rende:"300ml",
      desc:"Kiwi fresquinho, cachaça e açúcar. Refrescante.",
      preco:21.90, imgKey:"caipirinha_kiwi", disp:true,
      ficha:[ {ins:"cachaca",qtd:0.06},{ins:"kiwi",qtd:0.09},{ins:"acucar",qtd:0.02},{ins:"gelo",qtd:0.15} ] },

    { id:"cuba_libre", cat:"drinks", nome:"Cuba Libre", rende:"350ml",
      desc:"Rum, Coca gelada e limão. Simples e certeiro.",
      preco:19.90, imgKey:"cuba_libre", disp:true,
      ficha:[ {ins:"rum",qtd:0.05},{ins:"coca_lata",qtd:0.6},{ins:"limao",qtd:0.03},{ins:"gelo",qtd:0.15} ] },

    { id:"gin_tonica", cat:"drinks", nome:"Gin Tônica de Frutas Vermelhas", rende:"400ml",
      desc:"Gin, tônica, frutas vermelhas e alecrim na taça.",
      preco:28.90, imgKey:"gin_tonica", disp:true, destaque:true,
      ficha:[ {ins:"gin",qtd:0.05},{ins:"tonica",qtd:1},{ins:"frutas_verm",qtd:0.04},{ins:"gelo",qtd:0.2} ] },

    { id:"batida_coco", cat:"drinks", nome:"Batida de Coco", rende:"300ml",
      desc:"Cremosa, com leite de coco e leite condensado.",
      preco:18.90, imgKey:"batida_coco", disp:true,
      ficha:[ {ins:"cachaca",qtd:0.04},{ins:"leite_coco",qtd:0.05},{ins:"leite_cond",qtd:0.04},{ins:"gelo",qtd:0.1} ] },

    /* ---------------- BEBIDAS (revenda) ----------------
       Sem ficha detalhada — custo é o preço de compra direto. */
    { id:"long_neck", cat:"bebidas", nome:"Long Neck Heineken 330ml", rende:"330ml",
      desc:"Gelada estupidamente.", preco:12.00, custoDireto:6.50, disp:true, imgKey:"long_neck" },
    { id:"long_zehn", cat:"bebidas", nome:"Long Neck Zehn 355ml", rende:"355ml",
      desc:"A cerveja parceira da casa.", preco:11.00, custoDireto:5.80, disp:true, imgKey:"cerveja_balde" },
    { id:"chopp_zehn", cat:"bebidas", nome:"Chopp Zehn 300ml", rende:"300ml",
      desc:"Chopp puxado na pressão certa.", preco:11.00, custoDireto:3.20, disp:true, imgKey:"chopp" },
    { id:"cerveja_600", cat:"bebidas", nome:"Cerveja 600ml", rende:"600ml",
      desc:"Pra dividir na mesa.", preco:16.00, custoDireto:8.50, disp:true, imgKey:"cerveja_balde" },
    { id:"refri_lata", cat:"bebidas", nome:"Refrigerante Lata", rende:"350ml",
      desc:"Coca, Guaraná, Fanta.", preco:7.00, custoDireto:2.80, disp:true, imgKey:"naoalcool" },
    { id:"suco_natural", cat:"bebidas", nome:"Suco Natural", rende:"400ml",
      desc:"Laranja ou maracujá.", preco:12.00, custoDireto:2.50, disp:true, imgKey:"naoalcool" },
    { id:"agua", cat:"bebidas", nome:"Água Mineral", rende:"500ml",
      desc:"Com ou sem gás.", preco:5.00, custoDireto:1.20, disp:true, imgKey:"naoalcool" },
    { id:"energetico", cat:"bebidas", nome:"Energético", rende:"250ml",
      desc:"Pra segurar a noite.", preco:14.00, custoDireto:5.50, disp:true, imgKey:"naoalcool" },
  ],

  /* ---- Combos prontos do Box de Boteco ---- */
  boxes: [
    { id:"box_solo", nome:"Box Solo", serve:"1 a 2 pessoas", preco:59.90,
      desc:"Batata frita, calabresa acebolada, 1 pastel de carne e 1 pastel de queijo. O boteco na sua casa.",
      imgKey:"box", itens:["Batata frita","Calabresa acebolada","Pastel de carne","Pastel de queijo","Molho da casa"] },
    { id:"box_galera", nome:"Box da Galera", serve:"3 a 4 pessoas", preco:129.90, destaque:true,
      desc:"Mandioca frita, calabresa, frango a passarinho, torresmo e 4 pastéis sortidos.",
      imgKey:"box", itens:["Mandioca frita","Calabresa acebolada","Frango a passarinho","Torresmo de rolo","4 pastéis sortidos","Molhos"] },
    { id:"box_premium", nome:"Box Premium", serve:"4 a 5 pessoas", preco:189.90,
      desc:"Iscas de alcatra, iscas de tilápia, croquete de costela, linguiça, mandioca e pastéis.",
      imgKey:"box", itens:["Iscas de alcatra","Iscas de tilápia","Croquete de costela","Linguiça artesanal","Mandioca frita","4 pastéis sortidos"] },
  ],
};

/* =====================================================================
   FUNÇÕES DE CÁLCULO (compartilhadas)
   ===================================================================== */
window.BARcalc = {
  insumo(id){ return window.BAR.insumos.find(i => i.id === id); },
  produto(id){ return window.BAR.produtos.find(p => p.id === id); },
  categoria(id){ return window.BAR.categorias.find(c => c.id === id); },

  // Custo de um produto a partir da ficha técnica (ou custo direto p/ revenda)
  custo(prod){
    if (prod.custoDireto != null) return prod.custoDireto;
    if (!prod.ficha) return 0;
    return prod.ficha.reduce((tot, l) => {
      const ins = window.BARcalc.insumo(l.ins);
      return tot + (ins ? ins.custoUnit * l.qtd : 0);
    }, 0);
  },
  // CMV (Custo da Mercadoria Vendida) em % sobre o preço de venda
  cmv(prod){
    const p = prod.preco || 0; if (!p) return 0;
    return (window.BARcalc.custo(prod) / p) * 100;
  },
  // Margem de contribuição em R$ (preço - custo)
  margemRS(prod){ return (prod.preco || 0) - window.BARcalc.custo(prod); },
  // Margem de contribuição em %
  margemPct(prod){
    const p = prod.preco || 0; if (!p) return 0;
    return (window.BARcalc.margemRS(prod) / p) * 100;
  },
  // Markup (quantas vezes o custo o preço representa)
  markup(prod){
    const c = window.BARcalc.custo(prod); if (!c) return 0;
    return (prod.preco || 0) / c;
  },
  // Formata R$
  brl(v){ return "R$ " + (Number(v)||0).toLocaleString("pt-BR",{minimumFractionDigits:2, maximumFractionDigits:2}); },
  pct(v){ return (Number(v)||0).toFixed(1).replace(".",",") + "%"; },
};
