const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
const LEADS_CSV = path.join(DATA_DIR, 'leads.csv');

// helper: append header if missing
function ensureCsvHeader() {
  if (!fs.existsSync(LEADS_CSV)) {
    const header = 'timestamp,nome,whatsapp,servico,periodo,origem\n';
    fs.writeFileSync(LEADS_CSV, header, { encoding: 'utf8' });
  }
}

app.post('/api/leads', async (req, res) => {
  try {
    const { nome, whatsapp, servico, periodo, origem, timestamp } = req.body || {};
    if (!nome || !whatsapp) {
      return res.status(400).json({ error: 'nome_e_whatsapp_sao_obrigatorios' });
    }
    ensureCsvHeader();
    const linha = `"${timestamp || new Date().toISOString()}","${nome.replace(/"/g, '""')}","${whatsapp.replace(/"/g, '""')}","${(servico||'').replace(/"/g,'""')}","${(periodo||'').replace(/"/g,'""')}","${(origem||'chatbot_web')}"\n`;
    fs.appendFileSync(LEADS_CSV, linha, { encoding: 'utf8' });

    // opcional: enviar e-mail para recepção se variáveis de ambiente estiverem configuradas
    if (process.env.SMTP_HOST && process.env.MAIL_TO) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        } : undefined
      });

      const text = [
        `Nova lead recebida via chatbot:`,
        `Nome: ${nome}`,
        `WhatsApp: ${whatsapp}`,
        `Serviço: ${servico || '-'}`,
        `Preferência de período: ${periodo || '-'}`,
        `Origem: ${origem || 'chatbot_web'}`,
        `Timestamp: ${timestamp || new Date().toISOString()}`
      ].join('\n');

      try {
        await transporter.sendMail({
          from: process.env.MAIL_FROM || 'bot@clinica.local',
          to: process.env.MAIL_TO,
          subject: 'Novo lead — Chatbot',
          text
        });
      } catch (mailErr) {
        console.error('Erro ao enviar e-mail:', mailErr);
      }
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('Erro /api/leads:', err);
    return res.status(500).json({ error: 'server_error' });
  }
});

app.listen(PORT, () => {
  console.log(`Leads server rodando em http://localhost:${PORT}`);
});
