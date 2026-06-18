export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo no permitido.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL || 'avora.contacto@gmail.com';
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'AVORA Leads <onboarding@resend.dev>';

  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar RESEND_API_KEY en el servidor.' });
  }

  const lead = req.body || {};
  const safe = (value) => String(value || '').replace(/[<>]/g, '');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2>Nuevo lead - Diagnostico AVORA 360</h2>
      <p><strong>Nombre:</strong> ${safe(lead.nombre)}</p>
      <p><strong>Hotel:</strong> ${safe(lead.hotel)}</p>
      <p><strong>Ciudad:</strong> ${safe(lead.ciudad)}</p>
      <p><strong>Habitaciones:</strong> ${safe(lead.habitaciones)}</p>
      <p><strong>Canal principal:</strong> ${safe(lead.canal)}</p>
      <p><strong>Problema principal:</strong> ${safe(lead.problema)}</p>
      <p><strong>Contacto:</strong> ${safe(lead.contacto)}</p>
      <p><strong>Contexto:</strong><br/>${safe(lead.mensaje).replace(/\n/g, '<br/>')}</p>
      <hr/>
      <p style="font-size:12px;color:#555;">Lead enviado desde el formulario AVORA Hotel Growth 360.</p>
    </div>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: safe(lead.contacto).includes('@') ? safe(lead.contacto) : undefined,
        subject: `Diagnostico AVORA 360 - ${safe(lead.hotel) || safe(lead.nombre) || 'Solicitud'}`,
        html,
      }),
    });

    const data = await resendResponse.json().catch(() => ({}));
    if (!resendResponse.ok) {
      return res.status(resendResponse.status).json({ error: data?.message || 'Resend rechazo el envio.' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch {
    return res.status(500).json({ error: 'Error enviando el lead.' });
  }
}
