# AVORA Hotel Growth 360

Nueva version estrategica de AVORA enfocada en crecimiento hotelero, reservas directas y Diagnostico AVORA 360.

Este repositorio es independiente del sitio estable `avora-site-7mrd` y no modifica el proyecto original.

## Enfoque

AVORA se presenta como una firma de crecimiento hotelero para hoteles independientes, pequenos y medianos que necesitan recuperar control comercial, reducir dependencia de OTAs, ordenar WhatsApp/CRM y construir una ruta de crecimiento en 90 dias.

## Arquitectura de la home

1. Hero con promesa directa.
2. Dolores comerciales del hotel independiente.
3. Problema central: falta de control, no solo falta de ventas.
4. Diagnostico AVORA 360.
5. Entregables del diagnostico.
6. Metodo AVORA.
7. Ruta de 90 dias.
8. Modulos de implementacion.
9. Comparativa contra agencia tradicional.
10. Cliente en proceso: Hotel San Diego.
11. Senales de confianza.
12. FAQ y CTA final.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

## Variables de entorno

El formulario usa `api/send-lead.js` con Resend.

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
LEAD_TO_EMAIL=avora.contacto@gmail.com
LEAD_FROM_EMAIL=AVORA Leads <onboarding@resend.dev>
```

Si no hay backend configurado, el formulario muestra fallback y el CTA de WhatsApp sigue funcionando.
