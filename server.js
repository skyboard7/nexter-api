const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/enviar', (req, res) => {
    const { link, quantidade } = req.body;
    console.log(`Recebido: ${link} para ${quantidade} views.`);
    res.json({ success: true, message: "Comando enviado!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
