import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {
    apiKey: connectionSettings.settings.api_key, 
    fromEmail: connectionSettings.settings.from_email
  };
}

export async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail: fromEmail || 'noreply@resend.dev'
  };
}

export async function sendPurchaseConfirmationEmail(
  customerEmail: string,
  customerName: string,
  planName: string,
  amount: number
) {
  const { client, fromEmail } = await getUncachableResendClient();
  
  const amountFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount / 100);

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; border: 1px solid #d946ef33; }
    .header { background: linear-gradient(90deg, #d946ef, #9333ea); padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 2px; }
    .content { padding: 40px 30px; }
    .success-badge { background: #22c55e; color: #000; display: inline-block; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 20px; }
    .plan-card { background: #d946ef15; border: 1px solid #d946ef44; border-radius: 12px; padding: 24px; margin: 24px 0; }
    .plan-name { color: #d946ef; font-size: 24px; font-weight: bold; margin-bottom: 8px; }
    .plan-price { font-size: 32px; font-weight: 800; }
    .instructions { background: #ffffff08; border-radius: 8px; padding: 20px; margin-top: 24px; }
    .instructions h3 { color: #06b6d4; margin-top: 0; }
    .instructions ol { padding-left: 20px; line-height: 1.8; }
    .footer { text-align: center; padding: 30px; background: #0a0a0a; font-size: 12px; color: #666; }
    .cta-button { display: inline-block; background: linear-gradient(90deg, #d946ef, #9333ea); color: white; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ AKEMISOFT</h1>
    </div>
    <div class="content">
      <div class="success-badge">✓ PAGAMENTO CONFIRMADO</div>
      <h2>Parabéns, ${customerName}!</h2>
      <p>Sua compra foi processada com sucesso. Você agora tem acesso ao pacote de otimização mais avançado do mercado.</p>
      
      <div class="plan-card">
        <div class="plan-name">${planName}</div>
        <div class="plan-price">${amountFormatted}</div>
      </div>
      
      <div class="instructions">
        <h3>📥 Próximos Passos:</h3>
        <ol>
          <li>Você receberá um email separado com o link de download</li>
          <li>Execute o instalador como Administrador</li>
          <li>Siga as instruções do assistente de otimização</li>
          <li>Reinicie seu PC para aplicar todas as mudanças</li>
        </ol>
      </div>
      
      <p style="text-align: center; margin-top: 30px;">
        <strong>Dúvidas?</strong> Responda este email ou entre no nosso Discord
      </p>
    </div>
    <div class="footer">
      © 2025 AkemiSoft Performance Engineering<br>
      Otimização profissional para gamers competitivos
    </div>
  </div>
</body>
</html>
  `;

  try {
    const result = await client.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: `✅ AkemiSoft - Compra Confirmada: ${planName}`,
      html: emailHtml
    });
    
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
