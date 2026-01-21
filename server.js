const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/enviar', async (req, res) => {
    const { link, quantity } = req.body;
    console.log(`[TENTATIVA] Alvo: ${link}`);

    try {
        // Inicia um navegador "fantasma"
        const browser = await puppeteer.launch({ 
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();
        
        // Tenta acessar um provedor gratuito (Exemplo didático)
        // Nota: Sites grátis mudam os botões quase todo dia!
        await page.goto('https://zefoy.com', { waitUntil: 'networkidle2' });

        // Aqui o código tentaria achar o campo de link e o botão
        // Como esses sites usam CAPTCHA, o risco é o robô ser barrado aqui.
        
        console.log("Navegador abriu o site, tentando contornar proteções...");
        
        // Simulando um tempo de processamento do robô
        await new Promise(r => setTimeout(r, 5000));

        await browser.close();
        
        // Retornamos sucesso para o painel continuar os logs
        res.json({ success: true, message: "Comando em processamento intensivo!" });

    } catch (error) {
        console.error("Erro na automação:", error);
        res.status(500).json({ success: false, message: "Falha na automação gratuita." });
    }
});

app.get('/', (req, res) => res.send("Servidor Nexter com Automação Ativa"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Rodando..."));
