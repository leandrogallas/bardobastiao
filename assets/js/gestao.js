/* =====================================================================
   BAR DO BASTIÃO — Painel de Gestão (local-first)
   Estoque · Fichas Técnicas · Financeiro/DRE · Cardápio
   Os dados ficam salvos no navegador (localStorage). Use Exportar para backup.
   ===================================================================== */
(function(){
  const B = window.BAR, C = window.BARcalc;
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const brl = C.brl, pct = C.pct;
  const LS = "bb_gestao_v1";
  const SESS = "bb_auth";
  const SENHA_PADRAO = "bastiao2025";   // troque em Configurações

  /* ---------------- Store ---------------- */
  function seed(){
    const s = JSON.parse(JSON.stringify({
      config: B.contato,
      categorias: B.categorias,
      insumos: B.insumos,
      produtos: B.produtos,
      boxes: B.boxes,
    }));
    s.senha = SENHA_PADRAO;
    s.lancamentos = [
      {id:id(), data:"2026-08-01", tipo:"despesa", categoria:"Aluguel", desc:"Aluguel do ponto", valor:1800},
      {id:id(), data:"2026-08-03", tipo:"despesa", categoria:"Bebidas",  desc:"Fornecedor de cervejas", valor:950},
      {id:id(), data:"2026-08-05", tipo:"despesa", categoria:"Insumos",  desc:"Açougue e hortifruti", valor:680},
      {id:id(), data:"2026-08-07", tipo:"receita", categoria:"Venda",    desc:"Vendas do dia", valor:1580, cmv:480},
      {id:id(), data:"2026-08-08", tipo:"receita", categoria:"Venda",    desc:"Vendas do dia", valor:1240, cmv:372},
    ];
    return s;
  }
  function id(){ return "x"+Math.random().toString(36).slice(2,9); }
  let store;
  function load(){ try{ return JSON.parse(localStorage.getItem(LS)); }catch(e){ return null; } }
  function save(){ localStorage.setItem(LS, JSON.stringify(store)); bind(); }
  function bind(){ // liga BARcalc aos dados vivos do store
    B.insumos = store.insumos; B.produtos = store.produtos;
    B.categorias = store.categorias; B.boxes = store.boxes; B.contato = store.config;
  }
  function boot(){ store = load() || seed(); if(!store.senha) store.senha = SENHA_PADRAO; bind(); }

  /* ---------------- Auth ---------------- */
  function initGate(){
    const ok = sessionStorage.getItem(SESS)==="1";
    if(ok){ enter(); return; }
    $("#gate").style.display="flex";
    $("#gateBtn").onclick = tryLogin;
    $("#gatePw").addEventListener("keydown", e=>{ if(e.key==="Enter") tryLogin(); });
  }
  function tryLogin(){
    const v = $("#gatePw").value;
    if(v === store.senha){ sessionStorage.setItem(SESS,"1"); enter(); }
    else { $("#gateErr").textContent = "Senha incorreta. Tente de novo."; }
  }
  function enter(){ $("#gate").style.display="none"; $("#app").classList.add("on"); go("dashboard"); }

  /* ---------------- Navegação ---------------- */
  let aba = "dashboard";
  function go(a){ aba=a; $$(".side nav button").forEach(b=> b.classList.toggle("on", b.dataset.a===a)); render(); }
  function render(){
    const m = $("#content");
    if(aba==="dashboard") m.innerHTML = viewDashboard();
    else if(aba==="cardapio") m.innerHTML = viewCardapio();
    else if(aba==="estoque")  m.innerHTML = viewEstoque();
    else if(aba==="financeiro")m.innerHTML = viewFinanceiro();
    else if(aba==="config")   m.innerHTML = viewConfig();
    wire();
  }

  /* ---------------- Helpers de cálculo ---------------- */
  const mesRef = "2026-08"; // mês corrente do painel (baseado na data de hoje)
  function lancMes(){ return store.lancamentos.filter(l=> l.data.startsWith(mesRef)); }
  function totalReceita(){ return lancMes().filter(l=>l.tipo==="receita").reduce((t,l)=>t+l.valor,0); }
  function totalCMV(){ return lancMes().filter(l=>l.tipo==="receita").reduce((t,l)=>t+(l.cmv||0),0); }
  function totalDespesa(){ return lancMes().filter(l=>l.tipo==="despesa").reduce((t,l)=>t+l.valor,0); }
  function valorEstoque(){ return store.insumos.reduce((t,i)=> t + i.estoque*i.custoUnit, 0); }
  function insumosBaixos(){ return store.insumos.filter(i=> i.estoque <= i.estoqueMin); }
  function cmvMedio(){
    const ps = store.produtos.filter(p=>p.disp);
    if(!ps.length) return 0;
    return ps.reduce((t,p)=> t + C.cmv(p), 0)/ps.length;
  }
  function margemMedia(){
    const ps = store.produtos.filter(p=>p.disp);
    if(!ps.length) return 0;
    return ps.reduce((t,p)=> t + C.margemPct(p), 0)/ps.length;
  }
  function ticketMedio(){
    const ps = store.produtos.filter(p=>p.disp && p.cat!=="bebidas");
    if(!ps.length) return 0;
    return ps.reduce((t,p)=>t+p.preco,0)/ps.length;
  }

  /* ================= DASHBOARD ================= */
  function viewDashboard(){
    const res = totalReceita(), cmvv = totalCMV(), desp = totalDespesa();
    const lucro = res - cmvv - desp;
    const baixos = insumosBaixos();
    return `
    <div class="page-head"><div><h1>Visão geral</h1><div class="sub">Resumo de agosto/2026 · Bar do Bastião</div></div></div>
    <div class="kpis">
      <div class="kpi g"><div class="lbl">Faturamento (mês)</div><div class="val">${brl(res)}</div><small>${lancMes().filter(l=>l.tipo==='receita').length} lançamentos</small></div>
      <div class="kpi r"><div class="lbl">Despesas (mês)</div><div class="val">${brl(desp)}</div><small>custos fixos + compras</small></div>
      <div class="kpi ${lucro>=0?'g':'r'}"><div class="lbl">Resultado (mês)</div><div class="val">${brl(lucro)}</div><small>receita − CMV − despesas</small></div>
      <div class="kpi b"><div class="lbl">CMV médio cardápio</div><div class="val">${pct(cmvMedio())}</div><small>quanto menor, melhor</small></div>
      <div class="kpi"><div class="lbl">Margem média</div><div class="val">${pct(margemMedia())}</div><small>margem de contribuição</small></div>
      <div class="kpi ${baixos.length?'r':'g'}"><div class="lbl">Estoque em alerta</div><div class="val">${baixos.length}</div><small>itens no/abaixo do mínimo</small></div>
      <div class="kpi b"><div class="lbl">Valor em estoque</div><div class="val">${brl(valorEstoque())}</div><small>${store.insumos.length} insumos</small></div>
      <div class="kpi"><div class="lbl">Itens no cardápio</div><div class="val">${store.produtos.filter(p=>p.disp).length}</div><small>de ${store.produtos.length} cadastrados</small></div>
    </div>

    <div class="card2">
      <div class="ch"><h2>⚠️ Precisa comprar</h2><span class="mini">Insumos no ou abaixo do estoque mínimo</span></div>
      <div class="cb"><table><thead><tr><th>Insumo</th><th class="num">Estoque</th><th class="num">Mínimo</th><th class="num">Custo un.</th><th>Status</th></tr></thead><tbody>
        ${baixos.length ? baixos.map(i=>`<tr><td>${i.nome}</td><td class="num">${i.estoque} ${i.unidade}</td><td class="num">${i.estoqueMin} ${i.unidade}</td><td class="num">${brl(i.custoUnit)}</td><td><span class="pill warn">Comprar</span></td></tr>`).join("")
          : `<tr><td colspan="5" style="text-align:center;color:var(--cinza);padding:20px">Tudo certo com o estoque 👍</td></tr>`}
      </tbody></table></div>
    </div>

    <div class="card2">
      <div class="ch"><h2>🏆 Itens mais lucrativos</h2><span class="mini">Maior margem de contribuição por unidade</span></div>
      <div class="cb"><table><thead><tr><th>Produto</th><th class="num">Preço</th><th class="num">Custo</th><th class="num">Margem R$</th><th class="num">Margem %</th></tr></thead><tbody>
        ${store.produtos.filter(p=>p.disp).sort((a,b)=>C.margemRS(b)-C.margemRS(a)).slice(0,6).map(p=>
          `<tr><td>${p.nome}</td><td class="num">${brl(p.preco)}</td><td class="num">${brl(C.custo(p))}</td><td class="num pos">${brl(C.margemRS(p))}</td><td class="num">${pct(C.margemPct(p))}</td></tr>`).join("")}
      </tbody></table></div>
    </div>`;
  }

  /* ================= CARDÁPIO & FICHAS TÉCNICAS ================= */
  let fichaAberta = null;
  function viewCardapio(){
    const rows = store.produtos.map(p=>{
      const custo = C.custo(p), cmvv = C.cmv(p), mrs = C.margemRS(p), mp = C.margemPct(p), mk = C.markup(p);
      const cat = C.categoria(p.cat);
      const cmvClass = cmvv<=30?"ok":(cmvv<=40?"mid":"warn");
      return `
      <tr class="clickable" data-ficha="${p.id}">
        <td><b>${p.nome}</b><br><span class="mini">${cat?cat.nome:""} · ${p.rende||""}</span></td>
        <td class="num">${brl(custo)}</td>
        <td class="num">${brl(p.preco)}</td>
        <td class="num"><span class="pill ${cmvClass}">${pct(cmvv)}</span></td>
        <td class="num pos">${brl(mrs)}</td>
        <td class="num">${pct(mp)}</td>
        <td class="num">${mk?mk.toFixed(2).replace('.',',')+'×':'—'}</td>
        <td>${p.disp?'<span class="pill ok">No cardápio</span>':'<span class="pill warn">Fora</span>'}</td>
      </tr>
      <tr class="ficha-row" id="fr_${p.id}" style="display:none"><td colspan="8" style="padding:0">${fichaTecnica(p)}</td></tr>`;
    }).join("");
    return `
    <div class="page-head"><div><h1>Cardápio & Fichas Técnicas</h1><div class="sub">Custo, preço, CMV, margem e markup de cada item</div></div></div>
    <div class="tabnote">💡 Clique em qualquer produto pra abrir a <b>ficha técnica</b> completa (ingredientes, custo por item e simulação de preço). Edite o preço e veja a margem recalcular na hora.</div>
    <div class="card2">
      <div class="ch"><h2>Produtos (${store.produtos.length})</h2>
        <span class="mini">CMV: <span class="pill ok">bom</span> ≤30% · <span class="pill mid">atenção</span> 30-40% · <span class="pill warn">alto</span> &gt;40%</span></div>
      <div class="cb"><table><thead><tr>
        <th>Produto</th><th class="num">Custo</th><th class="num">Preço venda</th><th class="num">CMV</th>
        <th class="num">Margem R$</th><th class="num">Margem %</th><th class="num">Markup</th><th>Status</th>
      </tr></thead><tbody>${rows}</tbody></table></div>
    </div>`;
  }
  function fichaTecnica(p){
    const custo = C.custo(p);
    let linhas;
    if(p.custoDireto!=null){
      linhas = `<tr><td>Custo de compra (revenda)</td><td class="num">—</td><td class="num">${brl(p.custoDireto)}</td></tr>`;
    } else {
      linhas = (p.ficha||[]).map(l=>{
        const ins = C.insumo(l.ins); if(!ins) return "";
        const sub = ins.custoUnit*l.qtd;
        return `<tr><td>${ins.nome}</td><td class="num">${l.qtd} ${ins.unidade}</td><td class="num">${brl(sub)}</td></tr>`;
      }).join("");
    }
    return `<div class="ficha"><div class="grid2">
      <div>
        <h4>Ficha técnica — ${p.nome}</h4>
        <table><thead><tr><th>Insumo</th><th class="num">Qtd</th><th class="num">Custo</th></tr></thead>
          <tbody>${linhas}<tr><td><b>Custo total</b></td><td></td><td class="num"><b>${brl(custo)}</b></td></tr></tbody></table>
      </div>
      <div>
        <h4>Precificação</h4>
        <div class="resumo">
          <div class="l"><span>Custo do prato</span><b>${brl(custo)}</b></div>
          <div class="l"><span>Preço de venda</span>
            <span><input class="inp-sm preco-edit" data-p="${p.id}" type="number" step="0.10" value="${p.preco.toFixed(2)}"></span></div>
          <div class="l"><span>CMV (custo mercadoria)</span><b id="fk_cmv_${p.id}">${pct(C.cmv(p))}</b></div>
          <div class="l"><span>Margem de contribuição</span><b class="pos" id="fk_mrs_${p.id}">${brl(C.margemRS(p))}</b></div>
          <div class="l"><span>Margem %</span><b id="fk_mp_${p.id}">${pct(C.margemPct(p))}</b></div>
          <div class="l"><span>Markup</span><b id="fk_mk_${p.id}">${C.markup(p)?C.markup(p).toFixed(2).replace('.',',')+'×':'—'}</b></div>
          <div class="l"><span>Preço sugerido (markup 3×)</span><b class="big">${brl(custo*3)}</b></div>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px">
          <button class="b b-o b-sm toggle-disp" data-p="${p.id}">${p.disp?'Tirar do cardápio':'Colocar no cardápio'}</button>
        </div>
      </div>
    </div></div>`;
  }

  /* ================= ESTOQUE ================= */
  function viewEstoque(){
    const rows = store.insumos.map(i=>{
      const val = i.estoque*i.custoUnit;
      const st = i.estoque<=i.estoqueMin ? '<span class="pill warn">Comprar</span>'
               : (i.estoque<=i.estoqueMin*1.5 ? '<span class="pill mid">Atenção</span>' : '<span class="pill ok">OK</span>');
      return `<tr>
        <td><b>${i.nome}</b></td>
        <td>${i.unidade}</td>
        <td class="num"><input class="inp-sm est-edit" data-i="${i.id}" type="number" step="0.01" value="${i.estoque}"></td>
        <td class="num">${i.estoqueMin} ${i.unidade}</td>
        <td class="num"><input class="inp-sm custo-edit" data-i="${i.id}" type="number" step="0.01" value="${i.custoUnit.toFixed(2)}"></td>
        <td class="num">${brl(val)}</td>
        <td>${st}</td>
        <td class="num"><button class="b b-p b-sm entrada" data-i="${i.id}">+ Entrada</button></td>
      </tr>`;
    }).join("");
    return `
    <div class="page-head"><div><h1>Estoque</h1><div class="sub">${store.insumos.length} insumos · valor total ${brl(valorEstoque())}</div></div>
      <button class="b b-d" id="novoInsumo">+ Novo insumo</button></div>
    <div class="tabnote">💡 Edite o <b>estoque</b> e o <b>custo unitário</b> direto na tabela (salva sozinho). Toda vez que o custo de um insumo muda, as fichas técnicas e as margens se atualizam automaticamente. Use <b>+ Entrada</b> pra registrar uma compra (soma no estoque e lança a despesa no financeiro).</div>
    <div class="card2">
      <div class="ch"><h2>Insumos</h2><span class="mini">${insumosBaixos().length} item(ns) precisando de compra</span></div>
      <div class="cb"><table><thead><tr>
        <th>Insumo</th><th>Un.</th><th class="num">Estoque</th><th class="num">Mínimo</th><th class="num">Custo un.</th><th class="num">Valor total</th><th>Status</th><th></th>
      </tr></thead><tbody>${rows}</tbody></table></div>
    </div>`;
  }

  /* ================= FINANCEIRO ================= */
  function viewFinanceiro(){
    const res=totalReceita(), cmvv=totalCMV(), desp=totalDespesa();
    const margem = res-cmvv, lucro = margem-desp;
    const cmvPct = res? (cmvv/res*100):0;
    const lancs = [...store.lancamentos].sort((a,b)=> b.data.localeCompare(a.data));
    const optProd = store.produtos.filter(p=>p.disp).map(p=>`<option value="${p.id}">${p.nome} — ${brl(p.preco)}</option>`).join("");
    return `
    <div class="page-head"><div><h1>Financeiro</h1><div class="sub">DRE e fluxo de caixa · agosto/2026</div></div></div>

    <div class="kpis">
      <div class="kpi g"><div class="lbl">Faturamento</div><div class="val">${brl(res)}</div></div>
      <div class="kpi b"><div class="lbl">CMV</div><div class="val">${pct(cmvPct)}</div><small>${brl(cmvv)}</small></div>
      <div class="kpi"><div class="lbl">Margem de contribuição</div><div class="val">${brl(margem)}</div></div>
      <div class="kpi ${lucro>=0?'g':'r'}"><div class="lbl">Resultado do mês</div><div class="val">${brl(lucro)}</div></div>
    </div>

    <div class="card2">
      <div class="ch"><h2>⚡ Registrar venda rápida</h2></div>
      <div class="row-form">
        <label class="fld">Produto<select id="vProd">${optProd}</select></label>
        <label class="fld">Qtd<input id="vQtd" type="number" min="1" value="1" style="width:80px"></label>
        <label class="fld" style="justify-content:flex-end"><span><input type="checkbox" id="vBaixa" checked> baixar estoque</span></label>
        <button class="b b-g" id="vAdd">Registrar venda</button>
      </div>
    </div>

    <div class="card2">
      <div class="ch"><h2>DRE simplificado — agosto/2026</h2></div>
      <div class="cb" style="padding:16px 22px"><div class="dre">
        <div class="l"><span>Faturamento (vendas)</span><span class="v">${brl(res)}</span></div>
        <div class="l"><span>(−) CMV — custo das mercadorias</span><span class="v neg">− ${brl(cmvv)}</span></div>
        <div class="l"><span>(=) Margem de contribuição</span><span class="v"><b>${brl(margem)}</b></span></div>
        <div class="l"><span>(−) Despesas operacionais</span><span class="v neg">− ${brl(desp)}</span></div>
        <div class="l tot"><span>(=) Resultado do mês</span><span class="v ${lucro>=0?'pos':'neg'}">${brl(lucro)}</span></div>
      </div></div>
    </div>

    <div class="card2">
      <div class="ch"><h2>Lançamentos</h2><button class="b b-d" id="novoLanc">+ Novo lançamento</button></div>
      <div class="cb"><table><thead><tr><th>Data</th><th>Tipo</th><th>Categoria</th><th>Descrição</th><th class="num">CMV</th><th class="num">Valor</th><th></th></tr></thead><tbody>
        ${lancs.map(l=>`<tr>
          <td>${fmtData(l.data)}</td>
          <td>${l.tipo==="receita"?'<span class="pill ok">Receita</span>':'<span class="pill warn">Despesa</span>'}</td>
          <td>${l.categoria||"—"}</td>
          <td>${l.desc||""}</td>
          <td class="num mini">${l.cmv?brl(l.cmv):"—"}</td>
          <td class="num ${l.tipo==="receita"?'pos':'neg'}">${l.tipo==="receita"?'+':'−'} ${brl(l.valor)}</td>
          <td class="num"><button class="b b-r b-sm delLanc" data-l="${l.id}">excluir</button></td>
        </tr>`).join("")}
      </tbody></table></div>
    </div>`;
  }

  /* ================= CONFIG ================= */
  function viewConfig(){
    const c = store.config;
    return `
    <div class="page-head"><div><h1>Configurações</h1><div class="sub">Dados do bar, backup e senha</div></div></div>
    <div class="card2"><div class="ch"><h2>Dados do bar</h2></div>
      <div class="row-form" style="background:#fff">
        <label class="fld">Nome<input id="cfgNome" value="${c.nome}"></label>
        <label class="fld">WhatsApp (55+DDD+número)<input id="cfgWa" value="${c.whatsapp}"></label>
        <label class="fld">Instagram<input id="cfgIg" value="${c.instagram}"></label>
        <label class="fld">Endereço<input id="cfgEnd" value="${c.endereco}"></label>
        <label class="fld">Horário<input id="cfgHor" value="${c.horario}"></label>
        <label class="fld">Taxa de entrega (R$)<input id="cfgTaxa" type="number" step="0.5" value="${c.taxaEntrega}"></label>
        <label class="fld">Pedido mínimo (R$)<input id="cfgMin" type="number" step="1" value="${c.pedidoMinimo}"></label>
        <button class="b b-p" id="cfgSalvar">Salvar dados</button>
      </div>
    </div>
    <div class="card2"><div class="ch"><h2>Backup dos dados</h2></div>
      <div class="row-form" style="background:#fff">
        <button class="b b-d" id="btnExport">⬇️ Exportar (backup .json)</button>
        <label class="b b-o" style="cursor:pointer">⬆️ Importar backup<input id="fileImport" type="file" accept="application/json" style="display:none"></label>
        <button class="b b-r" id="btnReset">Restaurar dados de fábrica</button>
      </div>
      <div class="tabnote" style="margin:0 18px 18px">Os dados ficam salvos <b>neste navegador</b>. Exporte um backup de tempos em tempos — e importe no computador/tablet do bar pra usar em outro aparelho.</div>
    </div>
    <div class="card2"><div class="ch"><h2>Senha do painel</h2></div>
      <div class="row-form" style="background:#fff">
        <label class="fld">Nova senha<input id="cfgSenha" type="text" placeholder="nova senha" value="${store.senha}"></label>
        <button class="b b-p" id="cfgSenhaSalvar">Trocar senha</button>
      </div>
    </div>`;
  }

  /* ---------------- Wire (eventos após render) ---------------- */
  function wire(){
    // ficha expand
    $$("[data-ficha]").forEach(tr=> tr.onclick = e=>{
      if(e.target.closest("input,button")) return;
      const pid = tr.dataset.ficha; const fr = $("#fr_"+pid);
      fr.style.display = fr.style.display==="none"?"table-row":"none";
    });
    // preço edit (na ficha)
    $$(".preco-edit").forEach(inp=> inp.onchange = ()=>{
      const p = C.produto(inp.dataset.p); p.preco = parseFloat(inp.value)||0; save();
      $("#fk_cmv_"+p.id).textContent = pct(C.cmv(p));
      $("#fk_mrs_"+p.id).textContent = brl(C.margemRS(p));
      $("#fk_mp_"+p.id).textContent = pct(C.margemPct(p));
      $("#fk_mk_"+p.id).textContent = C.markup(p)?C.markup(p).toFixed(2).replace('.',',')+'×':'—';
    });
    $$(".toggle-disp").forEach(b=> b.onclick = ()=>{ const p=C.produto(b.dataset.p); p.disp=!p.disp; save(); render(); });

    // estoque
    $$(".est-edit").forEach(inp=> inp.onchange = ()=>{ ins(inp.dataset.i).estoque = parseFloat(inp.value)||0; save(); render(); });
    $$(".custo-edit").forEach(inp=> inp.onchange = ()=>{ ins(inp.dataset.i).custoUnit = parseFloat(inp.value)||0; save(); render(); });
    $$(".entrada").forEach(b=> b.onclick = ()=>{
      const i = ins(b.dataset.i);
      const q = parseFloat(prompt(`Entrada de ${i.nome} (em ${i.unidade}). Quantidade comprada:`, "1"));
      if(!q||q<=0) return;
      const custoTot = q*i.custoUnit;
      i.estoque += q;
      store.lancamentos.push({id:id(), data:hoje(), tipo:"despesa", categoria:"Insumos", desc:`Compra: ${q} ${i.unidade} de ${i.nome}`, valor:custoTot});
      save(); render();
    });
    const nIns = $("#novoInsumo"); if(nIns) nIns.onclick = ()=>{
      const nome = prompt("Nome do insumo:"); if(!nome) return;
      const un = prompt("Unidade (kg, L, un):","kg")||"un";
      const custo = parseFloat(prompt("Custo por "+un+" (R$):","0"))||0;
      store.insumos.push({id:id(), nome, unidade:un, custoUnit:custo, estoque:0, estoqueMin:1}); save(); render();
    };

    // financeiro
    const vAdd = $("#vAdd"); if(vAdd) vAdd.onclick = ()=>{
      const p = C.produto($("#vProd").value); const q = parseInt($("#vQtd").value)||1;
      const baixa = $("#vBaixa").checked;
      store.lancamentos.push({id:id(), data:hoje(), tipo:"receita", categoria:"Venda", desc:`${q}× ${p.nome}`, valor:p.preco*q, cmv:C.custo(p)*q});
      if(baixa && p.ficha){ p.ficha.forEach(l=>{ const i=C.insumo(l.ins); if(i) i.estoque = Math.max(0, i.estoque - l.qtd*q); }); }
      save(); render();
    };
    const nLanc = $("#novoLanc"); if(nLanc) nLanc.onclick = ()=>{
      const tipo = confirm("OK = Receita | Cancelar = Despesa") ? "receita":"despesa";
      const desc = prompt("Descrição:"); if(desc===null) return;
      const cat = prompt("Categoria:", tipo==="receita"?"Venda":"Despesa")||"";
      const valor = parseFloat(prompt("Valor (R$):","0"))||0;
      store.lancamentos.push({id:id(), data:hoje(), tipo, categoria:cat, desc, valor}); save(); render();
    };
    $$(".delLanc").forEach(b=> b.onclick = ()=>{ store.lancamentos = store.lancamentos.filter(l=>l.id!==b.dataset.l); save(); render(); });

    // config
    const cs = $("#cfgSalvar"); if(cs) cs.onclick = ()=>{
      const c = store.config;
      c.nome=$("#cfgNome").value; c.whatsapp=$("#cfgWa").value.replace(/\D/g,""); c.instagram=$("#cfgIg").value.replace("@","");
      c.endereco=$("#cfgEnd").value; c.horario=$("#cfgHor").value;
      c.taxaEntrega=parseFloat($("#cfgTaxa").value)||0; c.pedidoMinimo=parseFloat($("#cfgMin").value)||0;
      save(); alert("Dados salvos! ✅");
    };
    const ex = $("#btnExport"); if(ex) ex.onclick = exportar;
    const fi = $("#fileImport"); if(fi) fi.onchange = importar;
    const rs = $("#btnReset"); if(rs) rs.onclick = ()=>{ if(confirm("Isso apaga suas edições e volta aos dados de exemplo. Continuar?")){ store=seed(); save(); render(); } };
    const css2 = $("#cfgSenhaSalvar"); if(css2) css2.onclick = ()=>{ const v=$("#cfgSenha").value.trim(); if(v){ store.senha=v; save(); alert("Senha alterada!"); } };
  }

  function ins(idv){ return store.insumos.find(i=>i.id===idv); }
  function hoje(){ return "2026-08-09"; }
  function fmtData(d){ const [y,m,dd]=d.split("-"); return `${dd}/${m}`; }

  function exportar(){
    const blob = new Blob([JSON.stringify(store,null,2)], {type:"application/json"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "bar-do-bastiao-backup.json"; a.click();
  }
  function importar(e){
    const f = e.target.files[0]; if(!f) return;
    const r = new FileReader();
    r.onload = ()=>{ try{ store = JSON.parse(r.result); save(); render(); alert("Backup importado! ✅"); }catch(err){ alert("Arquivo inválido."); } };
    r.readAsText(f);
  }

  /* ---------------- Start ---------------- */
  document.addEventListener("DOMContentLoaded", ()=>{
    boot();
    $$(".side nav button").forEach(b=> b.onclick = ()=> go(b.dataset.a));
    $("#logout").onclick = ()=>{ sessionStorage.removeItem(SESS); location.reload(); };
    initGate();
  });
})();
