import fr from '@/i18n/fr.json'
import en from '@/i18n/en.json'

export type Locale = 'fr' | 'en'
export type Translations = typeof fr

const translations: Record<Locale, Translations> = { fr, en }

export function getTranslations(locale: Locale = 'fr'): Translations {
  return translations[locale] ?? translations.fr
}
