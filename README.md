# 📰 News Scraper & Email Sender

Este projeto realiza um **scraping automático** das últimas notícias da [BBC Brasil](https://www.bbc.com/portuguese) e envia um **e-mail com as 10 principais manchetes**.

## 🚀 Tecnologias utilizadas

- 📦 Node.js
- 🔍 Cheerio (web scraping)
- ✉️ Nodemailer (envio de e-mail)
- 🌐 dotenv (variáveis de ambiente)

---

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/news-scraper-email.git
cd news-scraper-email

### 3. Crie um arquivo `.env` na raiz do projeto

```env
EMAIL_HOST=smtp.seuprovedor.com
EMAIL_PORT=587
EMAIL_USER=seuemail@provedor.com
EMAIL_PASS=sua_senha
EMAIL_TO=emailquevaireceber
```

> ⚠️ **Nunca compartilhe seu `.env`** ou o adicione ao GitHub. Certifique-se de que ele está listado no seu `.gitignore`.

### 4. Execute o projeto

```bash
node app.js
```

---

## 📝 Exemplo de Saída (no e-mail)

```
📬 Exemplo do conteúdo enviado
O e-mail contém:

✅ Título da notícia
🔗 Link direto para leitura
📝 Resumo da notícia
⏰ Horário da publicação
...
```
