import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENTS = ['royautospa@gmail.com', 'absurdite101@gmail.com']

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { vehicle, year, condition, service, name, email, phone, message } = data

    await resend.emails.send({
      from: 'RM AUTO SPA <onboarding@resend.dev>',
      to: RECIPIENTS,
      replyTo: email,
      subject: `Soumission - ${name} | ${vehicle} ${year}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#7c3aed;">Nouvelle soumission — RM AUTO SPA</h2>
          <hr style="border-color:#e5e7eb;"/>
          <h3 style="color:#374151;">Véhicule</h3>
          <p><strong>Type :</strong> ${vehicle}</p>
          <p><strong>Année :</strong> ${year || '—'}</p>
          <p><strong>État :</strong> ${condition}</p>
          <h3 style="color:#374151;">Service souhaité</h3>
          <p>${service}</p>
          <h3 style="color:#374151;">Coordonnées</h3>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Courriel :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Téléphone :</strong> ${phone || '—'}</p>
          ${message ? `<h3 style="color:#374151;">Message</h3><p>${message}</p>` : ''}
          <hr style="border-color:#e5e7eb;margin-top:24px;"/>
          <p style="color:#9ca3af;font-size:12px;">Envoyé depuis le formulaire de rmautospa.ca</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
