export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

const RECIPIENTS = ['royautospa@gmail.com', 'absurdite101@gmail.com']

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { vehicle, year, condition, service, name, email, phone, message } = data

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'RM AUTO SPA <onboarding@resend.dev>',
      to: RECIPIENTS,
      replyTo: email,
      subject: `Soumission RM AUTO SPA — ${name} | ${vehicle} ${year}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111;">
          <h2 style="color:#7c3aed;margin-bottom:4px;">Nouvelle soumission</h2>
          <p style="color:#6b7280;margin-top:0;">RM AUTO SPA — formulaire de devis</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;"/>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#6b7280;width:140px;">Véhicule</td><td style="padding:6px 0;font-weight:600;">${vehicle} ${year || ''}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">État</td><td style="padding:6px 0;">${condition}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Service</td><td style="padding:6px 0;">${service}</td></tr>
            <tr><td colspan="2"><hr style="border:none;border-top:1px solid #f3f4f6;margin:8px 0;"/></td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Nom</td><td style="padding:6px 0;">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Courriel</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#7c3aed;">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Téléphone</td><td style="padding:6px 0;">${phone || '—'}</td></tr>
            ${message ? `<tr><td style="padding:6px 0;color:#6b7280;vertical-align:top;">Message</td><td style="padding:6px 0;">${message}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;"/>
          <p style="color:#9ca3af;font-size:12px;">Envoyé depuis rmautospa.com</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
