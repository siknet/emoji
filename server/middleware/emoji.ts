import emojisData from '../../data/emoji-index.json'
import groupsData from '../../data/group-translate.json'

let emojis: any[] = []
let groups: any[] = []
let isDataPrepared = false
let initPromise: Promise<void> | null = null

function extractName (str: string) {
  if (str.includes(':') && !str.includes(',')) {
    str = str.replace(/: \w+(-\w+)* skin tone/g, '')
  }
  if (str.includes(':') && str.includes(',')) {
    str = str
      .replace(/\w+(-\w+)* skin tone, /g, '')
      .replace(/(,|:) \w+(-\w+)* skin tone/g, '')
      .replace(/ \w+(-\w+)* skin tone/g, '')
  }
  return str.trim()
}

async function prepareData () {
  if (isDataPrepared) return
  if (initPromise) return initPromise

  initPromise = (async () => {
    try {
      emojis = emojisData
      groups = groupsData

      const skinToneGroupIndex = groups.findIndex(gn => gn.name === 'People & Body')
      const hasSkinTone = emojis
        .filter(ve => ve.g === skinToneGroupIndex && !ve.n.includes('skin tone'))
        .reduce((acc, cur) => {
          acc[cur.n] = cur
          return acc
        }, {})

      const langs = emojis[0]?.t ? Object.keys(emojis[0].t) : []
      for (const item of emojis) {
        if (item.n.includes('skin tone') && !item.t) {
          const name = extractName(item.n)
          const target = hasSkinTone[name]
          item.t = {}
          if (target) {
            for (const i in target.t) {
              item.t[i] = `${target.t[i]} (${item.n})`
            }
            item.k = target.k
          } else {
            item.k = {}
            for (const i of langs) {
              item.t[i] = item.n
              item.k[i] = [item.n]
            }
          }
        }
      }
      isDataPrepared = true
    } catch (err) {
      console.error('Failed to load emoji data:', err)
    } finally {
      initPromise = null
    }
  })()

  return initPromise
}

export default defineEventHandler(async event => {
  // Skip static assets to save serverless compute cycles
  if (event.path && event.path.includes('.') && !event.path.startsWith('/api')) {
    return
  }

  if (!isDataPrepared) {
    await prepareData()
  }

  event.context.emojis = emojis
  event.context.groups = groups
})
