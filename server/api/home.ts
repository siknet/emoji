export default defineEventHandler(ev => {
  setHeader(ev, 'Cache-Control', 'public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400')

  const query = getQuery(ev)
  const rawLocale = typeof query.locale === 'string' ? query.locale.slice(0, 15) : 'zh-hans'
  const locale = rawLocale || 'zh-hans'
  const quality = ((typeof query.quality === 'string' ? query.quality.slice(0, 50) : '') || '').split(',')
  const skinTone = ((typeof query.skinTone === 'string' ? query.skinTone.slice(0, 100) : '') || '').split(',')

  const emojis = ev.context.emojis || []
  const groupsData = ev.context.groups || []
  const groups = groupsData.map((g: any) => ({ n: g.name, nt: g[locale] || g['zh-hans'] || g.name }))
  const skinToneSubGroupIndex = groups.findIndex((gn: any) => gn.n === 'skin-tone')

  const filtered = emojis.filter(
    (li: any) =>
      quality.includes(li.q) &&
      (!li.n.includes('skin tone') || (li.n.includes('skin tone') && (skinTone.find(fst => fst && li.n.includes(' ' + fst)) || li.s === skinToneSubGroupIndex)))
  )

  const homeEmojis = filtered.map((emoji: any) => ({
    c: emoji.c,
    e: emoji.e,
    g: emoji.g,
    s: emoji.s,
    t: emoji.t?.[locale] || emoji.n
  }))

  return { groups, emojis: homeEmojis }
})
