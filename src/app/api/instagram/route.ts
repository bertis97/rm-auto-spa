import { NextResponse } from 'next/server'

export const revalidate = 3600 // cache 1h, refresh automatique toutes les heures

export interface InstagramPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp: string
}

export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN

  if (!token) {
    return NextResponse.json({ posts: [], error: 'INSTAGRAM_TOKEN not configured' }, { status: 200 })
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${token}`

    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) {
      const err = await res.json()
      return NextResponse.json({ posts: [], error: err.error?.message ?? 'Instagram API error' }, { status: 200 })
    }

    const data = await res.json()
    const posts: InstagramPost[] = (data.data ?? []).filter(
      (p: InstagramPost) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM'
    )

    return NextResponse.json({ posts })
  } catch (e) {
    return NextResponse.json({ posts: [], error: String(e) }, { status: 200 })
  }
}
