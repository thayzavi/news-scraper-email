require('dotenv').config();
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

const url = 'https://www.bbc.com/portuguese';

async function fetchNews(){
    try {
        const response = await fetch (url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const news = [];

        // respostas das div do site

        $('.promo-text').each((i, el) => {
            if (i >=10) return false;

            const anchor = $(el).find('h3 > a');
            const title = anchor.text().trim();
            const link = anchor.attr('href');
            const summary = $(el).find('p.promo-paragraph').text().trim();
            const time = $(el).find('time').text().trim();

            if(title && link){
                news.push({
                    title,
                    link: link.startsWith('http') ? link: `https://www.bbc.com${link}`, summary, time,
                });
            }
        });

        return news;
    }   catch (error){
        console.error('Erro ao buscar notícias:' , error);
        return [];
    }
}

// formato do email
function formatoEmailContent(news){
    if(news.length === 0) {
        return 'Nenhuma notícia disponivel no momento.'
    }
    let html = `<h2> Principais notícias da BBC Brasil</h2><ul>`;
    news.forEach(item => {
        html += `<li>
        <a href="${item.link}"
        target="_blank"
        style= "font-saize:1.1em;">
        ${item.title}</a><br/>
        <small><i> ${item.time}</i></small><br/>
        <p>${item.summary}</p>
        </li><hr/>`;
    });
    html += `</ul>`;
    return html;
}

//disparo do email

async function sendEmail(htmlContent){
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === 'true',
            auth : {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const info = await transporter.sendMail({
            from: `"Notícias" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: 'Resumo das principais Notícias - BBC Brasil',
            html: htmlContent,
        });

        console.log('E-mail enviado: %s',
        info.messageId);
    }   catch(error) {
        console.error('Error ao enviar e-mail:', error);
    }
}

async function main() {
    const news = await fetchNews();
    console.log('Noticias capturadas:', news);
    const emailContent = formatoEmailContent
    (news);
    await sendEmail(emailContent);
}
main();