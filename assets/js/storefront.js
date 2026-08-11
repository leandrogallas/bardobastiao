/* =====================================================================
   BAR DO BASTIÃO — Cardápio virtual + carrinho + pedido WhatsApp
   ===================================================================== */
(function(){
  const B = window.BAR, C = window.BARcalc, IMG = window.BAR_IMAGES || {};
  const $ = s => document.querySelector(s);
  const el = (t, c, h) => { const e = document.createElement(t); if(c) e.className=c; if(h!=null) e.innerHTML=h; return e; };
  const LS = "bb_cart";

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(LS)) || []; } catch(e){}
  const saveCart = () => localStorage.setItem(LS, JSON.stringify(cart));

  /* ---------- imagem com fallback ---------- */
  function imgTag(key, nome){
    const url = key && IMG[key];
    const initial = (nome||"?").trim()[0].toUpperCase();
    if(!url) return `<div class="fallback">${initial}</div>`;
    return `<img src="${url}" alt="${nome}" loading="lazy"
      onerror="this.style.display='none';this.insertAdjacentHTML('afterend','<div class=\\'fallback\\'>${initial}</div>')">`;
  }

  /* ---------- HERO logo/bg ---------- */
  function setupHero(){
    if(IMG.hero){ $("#heroBg").style.backgroundImage = `url('${IMG.hero}')`; }
  }

  /* ---------- CARDÁPIO ---------- */
  let catAtual = "todos";
  function renderTabs(){
    const box = $("#catTabs"); box.innerHTML = "";
    const mk = (id, label) => {
      const b = el("button", id===catAtual?"on":"", label);
      b.onclick = () => { catAtual=id; renderTabs(); renderProdutos(); };
      box.appendChild(b);
    };
    mk("todos","🍽️ Tudo");
    B.categorias.forEach(c => mk(c.id, `${c.icone} ${c.nome}`));
  }
  function renderProdutos(){
    const g = $("#grid"); g.innerHTML = "";
    const lista = B.produtos.filter(p => catAtual==="todos" || p.cat===catAtual);
    lista.forEach(p => {
      const card = el("div", "card" + (p.disp?"":" off"));
      const badge = p.destaque ? `<span class="badge">⭐ Da casa</span>` : "";
      card.innerHTML = `
        <div class="ph">${imgTag(p.imgKey, p.nome)}${badge}</div>
        <div class="body">
          <h3>${p.nome}</h3>
          <div class="rende">${p.rende||""}</div>
          <p class="desc">${p.desc||""}</p>
          <div class="foot">
            <span class="preco">${C.brl(p.preco)}</span>
            ${p.disp
              ? `<button class="add">+ Adicionar</button>`
              : `<span class="esgotado">Esgotado</span>`}
          </div>
        </div>`;
      if(p.disp) card.querySelector(".add").onclick = () => addItem(p);
      g.appendChild(card);
    });
  }

  /* ---------- BOX DE BOTECO ---------- */
  function renderBoxes(){
    const g = $("#boxGrid"); g.innerHTML = "";
    B.boxes.forEach(bx => {
      const card = el("div","box-card");
      const badge = bx.destaque ? `<span class="badge" style="position:static;display:inline-block;margin-bottom:8px">Mais pedido</span>` : "";
      card.innerHTML = `
        <div class="ph">${imgTag(bx.imgKey, bx.nome)}</div>
        <div class="body">
          <span class="serve">Serve ${bx.serve}</span>
          <h3>${bx.nome}</h3>
          ${badge}
          <ul>${bx.itens.map(i=>`<li>${i}</li>`).join("")}</ul>
          <p class="muted" style="color:#b7ab93;font-size:13px">${bx.desc}</p>
          <div class="foot">
            <span class="preco">${C.brl(bx.preco)}</span>
            <button class="add">+ Pedir box</button>
          </div>
        </div>`;
      card.querySelector(".add").onclick = () => {
        cart.push({ id:bx.id+"_"+Date.now(), tipo:"combo", nome:bx.nome, preco:bx.preco, qty:1,
                    itens: bx.itens.map(i=>({nome:i,qty:1})) });
        saveCart(); updateCart(); toast("Box adicionado! 🎉"); openCart();
      };
      g.appendChild(card);
    });
  }

  /* ---------- MONTE SEU BOX (modal) ---------- */
  let boxSel = {};
  function openBuilder(){
    boxSel = {};
    const itens = B.produtos.filter(p => p.box && p.disp);
    const list = $("#builderList"); list.innerHTML = "";
    itens.forEach(p => {
      const row = el("div","opt");
      row.innerHTML = `
        <div class="nm"><b>${p.nome}</b><br><small>${p.rende||""}</small></div>
        <span class="pr">${C.brl(p.boxPreco||p.preco)}</span>
        <div class="qty">
          <button data-a="-">–</button><span id="bq_${p.id}">0</span><button data-a="+">+</button>
        </div>`;
      const span = row.querySelector("#bq_"+p.id);
      row.querySelectorAll("button").forEach(btn=>{
        btn.onclick = () => {
          const cur = boxSel[p.id]?.qty || 0;
          const nv = btn.dataset.a==="+" ? cur+1 : Math.max(0,cur-1);
          if(nv===0) delete boxSel[p.id]; else boxSel[p.id] = {prod:p, qty:nv};
          span.textContent = nv; updateBuilderTotal();
        };
      });
      list.appendChild(row);
    });
    updateBuilderTotal();
    $("#builder").classList.add("on");
  }
  function builderTotal(){
    return Object.values(boxSel).reduce((t,s)=> t + (s.prod.boxPreco||s.prod.preco)*s.qty, 0);
  }
  function updateBuilderTotal(){
    const t = builderTotal();
    $("#builderTotal").textContent = C.brl(t);
    const min = 50;
    const btn = $("#builderAdd");
    btn.disabled = t < min;
    btn.textContent = t < min ? `Mínimo ${C.brl(min)} pra fechar o box` : `Adicionar box • ${C.brl(t)}`;
    btn.style.opacity = t<min ? .5 : 1;
  }
  function addBuilderBox(){
    const itens = Object.values(boxSel).map(s=>({nome:s.prod.nome, qty:s.qty}));
    if(!itens.length) return;
    cart.push({ id:"boxpers_"+Date.now(), tipo:"box", nome:"Box de Boteco (personalizado)",
                preco: builderTotal(), qty:1, itens });
    saveCart(); updateCart(); $("#builder").classList.remove("on");
    toast("Seu box tá pronto! 🍺"); openCart();
  }

  /* ---------- CARRINHO ---------- */
  function addItem(p){
    const found = cart.find(i => i.id===p.id && i.tipo==="item");
    if(found) found.qty++;
    else cart.push({ id:p.id, tipo:"item", nome:p.nome, preco:p.preco, qty:1 });
    saveCart(); updateCart(); toast(p.nome + " adicionado");
  }
  function chQty(idx, d){
    cart[idx].qty += d;
    if(cart[idx].qty<=0) cart.splice(idx,1);
    saveCart(); updateCart();
  }
  function subtotal(){ return cart.reduce((t,i)=> t + i.preco*i.qty, 0); }
  function count(){ return cart.reduce((t,i)=> t + i.qty, 0); }

  function updateCart(){
    $("#cartCount").textContent = count();
    $("#cartCount").style.display = count()?"inline-flex":"none";
    const box = $("#cartItems"); box.innerHTML = "";
    if(!cart.length){ box.innerHTML = `<div class="empty">Seu carrinho tá vazio.<br>Bora escolher uns petiscos? 🍟</div>`; }
    cart.forEach((i, idx) => {
      const sub = i.tipo!=="item"
        ? `<small>${i.itens.map(x=>`${x.qty}× ${x.nome}`).join(", ")}</small>`
        : "";
      const row = el("div","ci");
      row.innerHTML = `
        <div class="info">
          <b>${i.nome}</b>
          ${sub}
          <div class="muted">${C.brl(i.preco)} ${i.tipo==='item'?'/un':''}</div>
        </div>
        <div class="qty">
          <button data-d="-1">–</button><span>${i.qty}</span><button data-d="1">+</button>
        </div>`;
      const [minus,plus] = row.querySelectorAll("button");
      minus.onclick = ()=>chQty(idx,-1); plus.onclick = ()=>chQty(idx,1);
      box.appendChild(row);
    });
    // resumo
    const ent = $("input[name=entrega]:checked")?.value || "entrega";
    const taxa = ent==="entrega" ? (B.contato.taxaEntrega||0) : 0;
    $("#sumSub").textContent = C.brl(subtotal());
    $("#sumTaxaLine").style.display = ent==="entrega" ? "flex" : "none";
    $("#sumTaxa").textContent = taxa? C.brl(taxa) : "a combinar";
    $("#sumTot").textContent = C.brl(subtotal() + (typeof taxa==="number"?taxa:0));
  }

  /* ---------- CHECKOUT WHATSAPP ---------- */
  function checkout(){
    if(!cart.length){ toast("Adicione itens primeiro 🙂"); return; }
    const nome = $("#fNome").value.trim();
    const ent = $("input[name=entrega]:checked").value;
    const end = $("#fEnd").value.trim();
    const obs = $("#fObs").value.trim();
    if(ent==="entrega" && !end){ toast("Informe o endereço de entrega"); $("#fEnd").focus(); return; }
    const sub = subtotal();
    const taxa = ent==="entrega" ? (B.contato.taxaEntrega||0) : 0;
    if(sub < (B.contato.pedidoMinimo||0)){ toast(`Pedido mínimo: ${C.brl(B.contato.pedidoMinimo)}`); return; }

    let m = `*PEDIDO — BAR DO BASTIÃO* 🐶🍺%0a%0a`;
    if(nome) m += `*Cliente:* ${nome}%0a`;
    m += `*Tipo:* ${ent==="entrega"?"Entrega 🛵":"Retirada no bar 🏠"}%0a`;
    if(ent==="entrega") m += `*Endereço:* ${end}%0a`;
    m += `%0a*Itens:*%0a`;
    cart.forEach(i=>{
      m += `• ${i.qty}× ${i.nome} — ${C.brl(i.preco*i.qty)}%0a`;
      if(i.tipo!=="item") i.itens.forEach(x=> m += `   ↳ ${x.qty}× ${x.nome}%0a`);
    });
    m += `%0a*Subtotal:* ${C.brl(sub)}%0a`;
    if(ent==="entrega") m += `*Entrega:* ${taxa?C.brl(taxa):"a combinar"}%0a`;
    m += `*TOTAL:* ${C.brl(sub + (typeof taxa==="number"?taxa:0))}%0a`;
    if(obs) m += `%0a*Obs:* ${obs}%0a`;
    m += `%0aPedido feito pelo cardápio online 📱`;

    const url = `https://wa.me/${B.contato.whatsapp}?text=${m}`;
    window.open(url, "_blank");
  }

  /* ---------- UI helpers ---------- */
  function openCart(){ $("#drawer").classList.add("on"); $("#overlay").classList.add("on"); }
  function closeCart(){ $("#drawer").classList.remove("on"); $("#overlay").classList.remove("on"); }
  let toastT;
  function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("on");
    clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove("on"),2200); }

  /* ---------- INIT ---------- */
  document.addEventListener("DOMContentLoaded", ()=>{
    setupHero(); renderTabs(); renderProdutos(); renderBoxes(); updateCart();
    $("#cartBtn").onclick = openCart;
    $("#drawerClose").onclick = closeCart;
    $("#overlay").onclick = ()=>{ closeCart(); $("#builder").classList.remove("on"); };
    $("#btnCheckout").onclick = checkout;
    $("#btnMontar").onclick = openBuilder;
    $("#builderClose").onclick = ()=> $("#builder").classList.remove("on");
    $("#builderAdd").onclick = addBuilderBox;
    document.querySelectorAll("input[name=entrega]").forEach(r=> r.onchange = updateCart);
    // nav mobile
    $("#navToggle").onclick = ()=> $("#nav").classList.toggle("open");
    $("#nav").querySelectorAll("a").forEach(a=> a.onclick = ()=> $("#nav").classList.remove("open"));
    // preenche contato
    $$fill();
  });

  function $$fill(){
    const c = B.contato;
    document.querySelectorAll("[data-wa]").forEach(a=> a.href = `https://wa.me/${c.whatsapp}`);
    document.querySelectorAll("[data-ig]").forEach(a=> a.href = `https://instagram.com/${c.instagram}`);
    const set = (id,v)=>{ const e=document.getElementById(id); if(e) e.textContent=v; };
    set("cEndereco", c.endereco); set("cHorario", c.horario); set("cCidade", c.cidade);
    set("cInsta", "@"+c.instagram);
  }
})();
