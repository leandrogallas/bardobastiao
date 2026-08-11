#!/usr/bin/env bash
# =============================================================
# Baixa TODAS as fotos do cardápio para dentro do site,
# deixando o Bar do Bastião 100% independente de links externos.
# Rode uma vez (na sua VPS ou no seu PC) dentro da pasta bar-do-bastiao.
# =============================================================
set -e
DIR="assets/img/produtos"
mkdir -p "$DIR"
echo "Baixando fotos para $DIR ..."
declare -A IMG
IMG["hero"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_dd7a32d9-a3c6-4127-a01e-7573785c4375.png"
IMG["croquete"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_005803_0bc41bb5-dcc7-4dd1-a8ec-c2bf5be2e209.png"
IMG["mandioca"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_4e6a5505-dfad-44c8-8e7f-61b99bccaed6.png"
IMG["batata"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_284fb6eb-074a-40ae-8bb7-30a280f73f73.png"
IMG["polenta"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_6c4369c1-5bcc-405c-8c8f-1bb79f438b43.png"
IMG["torresmo"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_e1e44fde-2c76-42b5-abae-94d0dbc625df.png"
IMG["calabresa"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_c0ac9127-412d-40c7-a8df-dc92611a4994.png"
IMG["linguica"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_92d8cdde-1be3-4ec5-a1fd-7fcfe3481a23.png"
IMG["frango_passarinho"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_d9261834-36bb-4328-b6ec-e5039e4519f3.png"
IMG["iscas_alcatra"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_4fe2eeed-b454-480e-89a3-3334afeebfcd.png"
IMG["iscas_tilapia"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_2ce4483c-d18e-4726-a418-54517be051ab.png"
IMG["bolinho_bacalhau"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_5355cb09-2d07-4c7d-aba5-cda02aaaa28e.png"
IMG["isca_frango_milanesa"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010109_a6fe80c8-1cac-499d-9335-eea18533e7e6.png"
IMG["pastel_camarao"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_bd82746a-c94f-48e6-b888-530e89ec0479.png"
IMG["pastel_queijo"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_b7e3cb5a-8e75-4ec4-b396-0937a9eb866a.png"
IMG["pastel_carne"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_9eb9bee7-76a8-4ae7-a16f-da87c217b90c.png"
IMG["pastel_carne_seca"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010733_79675ce4-8104-4741-bda1-18ee20b5f6ac.png"
IMG["caipirinha_limao"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_ced816b9-26d5-409f-87c0-add5c6346b0b.png"
IMG["caipirinha_morango"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_bc0bf161-5b07-4005-8918-7a5fb81b539d.png"
IMG["caipirinha_kiwi"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_3d0119c1-cb7d-4625-aec5-ad10b33bf3dc.png"
IMG["cuba_libre"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_c5d8fb0a-d715-487e-b927-13362b4b6ebf.png"
IMG["gin_tonica"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_16413d14-ef7c-40b7-87e8-ccda4c51545e.png"
IMG["batida_coco"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_1e72a0c6-a0d2-46d5-aaaa-b96e665dd87c.png"
IMG["box"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_010133_a31b588e-218d-4b0a-9bfc-52318222b36c.png"
IMG["cerveja_balde"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_012836_033c8442-7e4e-434b-9cc7-86ea1951664c.png"
IMG["long_neck"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_012836_381ae37d-0061-4c5d-a360-e410adeba6e7.png"
IMG["naoalcool"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_012837_61baae8d-4a77-4480-957b-cccf5d83922e.png"
IMG["chopp"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_012837_26cb5bc7-19e4-4a43-9cf4-d8b78ac4a92a.png"
IMG["logo_art"]="https://d8j0ntlcm91z4.cloudfront.net/user_36Di4ByRPMe923s1sl6Mi8WTtBD/hf_20260809_012837_0a41e7e1-c5f5-484a-bd69-53cb22835b4b.png"

ok=0; fail=0
for key in "${!IMG[@]}"; do
  url="${IMG[$key]}"
  if curl -fsSL "$url" -o "$DIR/$key.png"; then
    echo "  ok  $key.png"; ok=$((ok+1))
  else
    echo "  ERRO ao baixar $key"; fail=$((fail+1))
  fi
done
echo "Concluído: $ok baixadas, $fail com erro."

# Reescreve images.js para usar as fotos LOCAIS
cat > assets/js/images.js <<'JS'
/* Fotos locais do Bar do Bastião (baixadas por baixar-imagens.sh) */
(function(){
  var L = "assets/img/produtos/";
  window.BAR_IMAGES = {
JS
for key in "${!IMG[@]}"; do
  echo "    $key: L + \"$key.png\"," >> assets/js/images.js
done
cat >> assets/js/images.js <<'JS'
  };
})();
JS
echo "images.js atualizado para usar as fotos locais. Pronto!"
