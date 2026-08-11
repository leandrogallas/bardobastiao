# 🚀 Publicar o Bar do Bastião na sua VPS Hostinger

Guia rápido pra deixar o site no ar com URL pública, servido pela sua própria
VPS (Ubuntu + Nginx). Ao final, as **fotos ficam salvas dentro do servidor** —
o site fica 100% independente.

> Você vai precisar do **acesso à VPS**. Na Hostinger: hPanel → **VPS** → sua
> instância → **Navegador de terminal** (ou conecte por SSH). Os comandos abaixo
> são pra colar no terminal.

---

## Opção A — Passo a passo (copiar e colar)

### 1. Instalar o servidor web
```bash
sudo apt update && sudo apt install -y nginx git curl
```

### 2. Baixar o site
O jeito mais fácil é deixar o repositório **público** por um instante
(GitHub → Settings → General → *Change repository visibility* → Public) e clonar.
Se preferir manter privado, o git vai pedir seu usuário do GitHub e um
*Personal Access Token* (Settings → Developer settings → Tokens).

```bash
sudo git clone https://github.com/leandrogallas/Agentessxritorio.git /opt/bastiao
cd /opt/bastiao/bar-do-bastiao
git checkout claude/bar-bastion-website-fibk9e
```

### 3. Baixar as fotos pra dentro do servidor
```bash
sudo bash baixar-imagens.sh
```
Isso salva todas as fotos em `assets/img/produtos/` e faz o site usá-las
localmente (não depende mais de link externo).

### 4. Publicar os arquivos
```bash
sudo mkdir -p /var/www/bardobastiao
sudo cp -r /opt/bastiao/bar-do-bastiao/* /var/www/bardobastiao/
sudo chown -R www-data:www-data /var/www/bardobastiao
```

### 5. Configurar o Nginx
```bash
sudo tee /etc/nginx/sites-available/bardobastiao >/dev/null <<'NG'
server {
    listen 80;
    server_name _;                 # troque por seu domínio quando tiver
    root /var/www/bardobastiao;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
NG
sudo ln -sf /etc/nginx/sites-available/bardobastiao /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

✅ **Pronto!** Abra no navegador:
- **Cardápio:** `http://SEU_IP/`
- **Painel de gestão:** `http://SEU_IP/gestao.html`

(O IP da VPS aparece no painel da Hostinger.)

---

## Domínio próprio + cadeado (HTTPS)

1. No seu provedor de domínio (ou na Hostinger), aponte o domínio pra o **IP da
   VPS** (registro **A**). Ex.: `bardobastiao.com.br → SEU_IP`.
2. No arquivo do Nginx (passo 5), troque `server_name _;` por
   `server_name bardobastiao.com.br www.bardobastiao.com.br;` e recarregue:
   `sudo nginx -t && sudo systemctl reload nginx`.
3. Instale o certificado grátis (HTTPS):
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d bardobastiao.com.br -d www.bardobastiao.com.br
```
Pronto: `https://bardobastiao.com.br` 🔒

---

## Atualizar o site depois (quando mudar algo)
```bash
cd /opt/bastiao && sudo git pull
cd bar-do-bastiao && sudo bash baixar-imagens.sh
sudo cp -r /opt/bastiao/bar-do-bastiao/* /var/www/bardobastiao/
```

---

## Antes de divulgar
- Trocar o **número do WhatsApp**: `assets/js/data.js` (campo `whatsapp`) ou no
  painel de gestão em **Configurações**. Formato `55` + DDD + número.
- Trocar a **senha** do painel (Configurações).

Qualquer passo que travar, me manda o print do terminal que eu te ajudo. 🐶🍺
