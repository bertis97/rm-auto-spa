'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Translations } from '@/lib/i18n'

interface QuoteFormProps { t: Translations }

type FormData = {
  vehicle: string; year: string; condition: string;
  service: string;
  name: string; email: string; phone: string; message: string;
}

const TOTAL_STEPS = 3

export default function QuoteForm({ t }: QuoteFormProps) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<FormData>({
    vehicle: '', year: '', condition: '',
    service: '',
    name: '', email: '', phone: '', message: '',
  })

  const q = t.quote
  const update = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }))

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch('https://formspree.io/f/xnjwalqn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _replyto: data.email,
        _cc: 'royautospa@gmail.com',
        _subject: `Soumission RM AUTO SPA — ${data.name} | ${data.vehicle} ${data.year}`,
        Véhicule: `${data.vehicle} ${data.year}`,
        État: data.condition,
        Service: data.service,
        Nom: data.name,
        Courriel: data.email,
        Téléphone: data.phone || '—',
        Message: data.message || '—',
      }),
    }).catch(() => {})
    setSubmitted(true)
  }

  const stepTitles = [
    { n: 1, title: q.step1_title },
    { n: 2, title: q.step2_title },
    { n: 3, title: q.step3_title },
  ]

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm placeholder-white/25 focus:outline-none focus:border-violet-500 transition-colors min-h-[44px]'
  const selectCls = 'w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-violet-500 transition-colors min-h-[44px] cursor-pointer'

  return (
    <section id="contact" className="py-24 lg:py-32 bg-zinc-950" aria-label="Formulaire de devis">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block glass-violet rounded-full px-4 py-1.5 text-xs font-body text-violet-300 tracking-widest uppercase mb-4">
            {q.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            {q.title}{' '}
            <span className="text-gradient-luxury italic">{q.title2}</span>
          </h2>
          <p className="text-white/60 font-body text-base sm:text-lg">{q.subtitle}</p>
        </motion.div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            {/* Step indicators */}
            <div className="flex items-center mb-8" role="list" aria-label="Étapes du formulaire">
              {stepTitles.map((s, i) => (
                <div key={s.n} className="flex items-center flex-1" role="listitem">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold font-body transition-all duration-300 flex-shrink-0 ${
                    step > s.n ? 'bg-violet-500 text-white' :
                    step === s.n ? 'bg-violet-500/20 border-2 border-violet-500 text-violet-400' :
                    'bg-white/5 border border-white/15 text-white/30'
                  }`} aria-current={step === s.n ? 'step' : undefined}>
                    {step > s.n ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : s.n}
                  </div>
                  <span className={`hidden sm:block ml-2 text-xs font-body ${step === s.n ? 'text-white' : 'text-white/30'}`}>{s.title}</span>
                  {i < TOTAL_STEPS - 1 && (
                    <div className={`flex-1 mx-2 h-px transition-colors duration-300 ${step > s.n ? 'bg-violet-500' : 'bg-white/10'}`} aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                    <div>
                      <label className="block text-sm font-body text-white/70 mb-2" htmlFor="vehicle">{q.vehicle_label}</label>
                      <input id="vehicle" type="text" placeholder={q.vehicle_placeholder} value={data.vehicle} onChange={(e) => update('vehicle', e.target.value)} className={inputCls} required />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-white/70 mb-2" htmlFor="year">{q.year_label}</label>
                      <input id="year" type="text" placeholder={q.year_placeholder} value={data.year} onChange={(e) => update('year', e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-white/70 mb-2" htmlFor="condition">{q.condition_label}</label>
                      <select id="condition" value={data.condition} onChange={(e) => update('condition', e.target.value)} className={selectCls} required>
                        <option value="">—</option>
                        {q.condition_options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <button type="button" onClick={() => setStep(2)} disabled={!data.vehicle || !data.condition}
                      className="w-full py-3.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold font-body text-sm transition-colors duration-200 cursor-pointer min-h-[44px]">
                      {q.next} →
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                    <div>
                      <p className="block text-sm font-body text-white/70 mb-3">{q.service_label}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.service_options.map((opt) => (
                          <button key={opt} type="button" onClick={() => update('service', opt)}
                            className={`px-4 py-3 rounded-xl border text-sm font-body text-left cursor-pointer transition-all duration-200 min-h-[44px] ${
                              data.service === opt ? 'border-violet-500 bg-violet-500/15 text-white' : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
                            }`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(1)}
                        className="flex-1 py-3.5 rounded-xl border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-body text-sm transition-colors cursor-pointer min-h-[44px]">
                        ← {q.back}
                      </button>
                      <button type="button" onClick={() => setStep(3)} disabled={!data.service}
                        className="flex-1 py-3.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold font-body text-sm transition-colors duration-200 cursor-pointer min-h-[44px]">
                        {q.next} →
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                    <div>
                      <label className="block text-sm font-body text-white/70 mb-2" htmlFor="name">{q.name_label}</label>
                      <input id="name" type="text" placeholder={q.name_placeholder} value={data.name} onChange={(e) => update('name', e.target.value)} className={inputCls} required autoComplete="name" />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-white/70 mb-2" htmlFor="email">{q.email_label}</label>
                      <input id="email" type="email" placeholder={q.email_placeholder} value={data.email} onChange={(e) => update('email', e.target.value)} className={inputCls} required autoComplete="email" />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-white/70 mb-2" htmlFor="phone">{q.phone_label}</label>
                      <input id="phone" type="tel" placeholder={q.phone_placeholder} value={data.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls} autoComplete="tel" />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-white/70 mb-2" htmlFor="message">{q.message_label}</label>
                      <textarea id="message" placeholder={q.message_placeholder} value={data.message} onChange={(e) => update('message', e.target.value)} rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm placeholder-white/25 focus:outline-none focus:border-violet-500 transition-colors resize-none" />
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(2)}
                        className="flex-1 py-3.5 rounded-xl border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-body text-sm transition-colors cursor-pointer min-h-[44px]">
                        ← {q.back}
                      </button>
                      <button type="submit" disabled={!data.name || !data.email}
                        className="flex-1 py-3.5 rounded-xl bg-gradient-luxury hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold font-body text-sm transition-opacity cursor-pointer min-h-[44px]">
                        {q.submit}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">{q.success_title}</h3>
            <p className="text-white/60 font-body">{q.success_desc}</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
