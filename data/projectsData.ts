interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'AI 智能厨师 Demo',
    description: '接入 AI 大模型的智能厨师，提供智能化的烹饪建议和食谱推荐。',
    imgSrc: '/static/images/ai-chef.png',
    href: 'https://ai-chef.deepnomind.com/',
  },
  {
    title: 'AI 架构图 Demo',
    description: '基于 AI 的 Draw IO 图形编辑器，支持智能图形生成和编辑。',
    imgSrc: '/static/images/ai-drawio.png',
    href: 'https://ai-drawio.deepnomind.com/',
  },
  {
    title: '图床服务 Demo',
    description: '支持七牛云和又拍云OSS的图床服务。',
    imgSrc: '/static/images/image-bed.png',
    href: 'https://image-bed.deepnomind.com/',
  },
  {
    title: '微信公众号文章转Markdown Demo',
    description: '支持将微信公众号文章转换为Markdown格式，方便内容管理和发布。',
    imgSrc: '/static/images/wechat-to-markdown.png',
    href: 'https://w2m.deepnomind.com/',
  },
  {
    title: 'OpenCode 中文教程 Demo',
    description: '提供系统化的中文 OpenCode 教程，帮助开发者快速掌握 OpenCode，零基础学会使用 AI。',
    imgSrc: '/static/images/learn-opencode.png',
    href: 'https://learn-opencode.deepnomind.com/',
  },
  {
    title: '智能发票处理系统 Demo',
    description: '基于AI技术的无服务器发票管理工具，支持自动识别、数据提取和OA系统集成。',
    imgSrc: '/static/images/invoice-ai.png',
    href: 'https://invoice-ai.deepnomind.com/',
  },
  {
    title: 'BadmintonAI - 羽毛球动作分析AI教练 Demo',
    description: '基于AI技术的羽毛球动作分析AI教练，提供智能化的训练建议和动作分析。',
    imgSrc: '/static/images/badminton-ai.png',
    href: 'https://github.com/yuff100/BadmintonAI',
  },
]

export default projectsData
