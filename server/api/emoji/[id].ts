export default defineEventHandler(ev => {
  const rawId = (ev.context.params?.id || '').trim()
  if (!rawId || rawId.length > 50) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Emoji ID'
    })
  }

  const query = getQuery(ev)
  const rawLocale = typeof query.locale === 'string' ? query.locale.slice(0, 15) : 'zh-hans'
  const locale = rawLocale || 'zh-hans'

  const emojis = ev.context.emojis || []
  const groupsData = ev.context.groups || []

  const res = emojis.find((emoji: any) => emoji.c === rawId)
  if (!res) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Emoji not found'
    })
  }

  setHeader(ev, 'Cache-Control', 'public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400')

  const groups = groupsData.map((g: any) => ({ n: g.name, nt: g[locale] || g['zh-hans'] || g.name }))
  const groupName = groups[res.g] || { n: '', nt: '' }
  const subGroupName = groups[res.s] || { n: '', nt: '' }

  const emoji = {
    c: res.c,
    q: res.q,
    e: res.e,
    v: res.v,
    n: res.n,
    t: res.t?.[locale] || res.n,
    k: res.k?.[locale] || [],
    g: groupName.nt,
    s: subGroupName.nt
  }

  return emoji
})
