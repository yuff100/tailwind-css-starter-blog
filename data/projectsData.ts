interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'AI 职能厨师',
    description: '接入 AI 大模型的职能厨师，提供智能化的烹饪建议和食谱推荐。',
    imgSrc: '/static/images/ai-chef.png',
    href: 'https://ai-chef.deepnomind.com/',
  },
  {
    title: 'AI Draw IO',
    description: '基于 AI 的 Draw IO 图形编辑器，支持智能图形生成和编辑。',
    imgSrc: '/static/images/ai-drawio.png',
    href: 'https://ai-drawio.deepnomind.com/',
  },
]

export default projectsData
