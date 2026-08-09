import rss from './rss.mjs'
import llmsFull from './llms-full.mjs'

async function postbuild() {
  await rss()
  await llmsFull()
}

postbuild()
