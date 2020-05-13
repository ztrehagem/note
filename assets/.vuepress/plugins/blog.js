const path = require('path')
const fs = require('fs')
const globby = require('globby')
const MarkdownIt = require('markdown-it')

function getMarkdownTitle(markdown) {
  const md = new MarkdownIt()
  const parsed = md.parse(markdown, {})
  const index = parsed.findIndex((token) => token.tag === 'h1')
  return index === -1 ? null : parsed[index + 1].content
}

module.exports = (options, ctx) => {
  const postsDir = path.resolve(ctx.sourceDir, 'posts')
  const postFiles = globby.sync('*.md', { cwd: postsDir })
  const posts = postFiles.reverse().map((file) => {
    const filePath = path.resolve(postsDir, file)
    const markdown = fs.readFileSync(filePath).toString()

    return {
      uri: path.join('/posts', file.replace(/\.md$/, '.html')),
      title: getMarkdownTitle(markdown),
      date: file.match(/^\d{4}-\d{1,2}-\d{1,2}/),
    }
  })

  return {
    extendPageData($page) {
      $page.$posts = posts
    },
  }
}
