// 技术栈展示组件 - 基于React项目数据，适配Hexo环境

// 技术栈数据（从React项目提取）
const skillCategories = [
  {
    title: "前端开发",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
    </svg>`,
    skills: [
      { name: "React", level: "专家" },
      { name: "TypeScript", level: "高级" },
      { name: "Next.js", level: "高级" },
      { name: "Tailwind CSS", level: "专家" },
    ],
  },
  {
    title: "后端开发",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
    </svg>`,
    skills: [
      { name: "FastAPI", level: "专家" },
      { name: "Node.js", level: "高级" },
      { name: "Flask", level: "专家" },
      { name: "API开发", level: "专家" },
      { name: "PostgreSQL", level: "高级" },
    ],
  },
  {
    title: "软件开发",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>`,
    skills: [
      { name: "PyQt", level: "专家" },
      { name: "Qt", level: "高级" },
      { name: "Electron", level: "中级" },
    ],
  },
  {
    title: "AI/机器学习",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
    </svg>`,
    skills: [
      { name: "AIGC开发", level: "专家" },
      { name: "大模型微调", level: "高级" },
      { name: "RAG技术", level: "高级" },
      { name: "MCP", level: "高级" },
      { name: "LangChain", level: "中级" },
    ],
  },
  {
    title: "全栈开发",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
    </svg>`,
    skills: [
      { name: "云服务", level: "高级" },
      { name: "GitHub", level: "中级" },
      { name: "vercel", level: "中级" },
      { name: "Docker", level: "高级" },
      { name: "CI/CD", level: "中级" },
    ],
  },
  {
    title: "新兴技术",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
    </svg>`,
    skills: [
      { name: "WebAssembly", level: "初级" },
      { name: "GraphQL", level: "中级" },
      { name: "Rust", level: "初级" },
      { name: "边缘计算", level: "初级" },
    ],
  },
];

// 创建技能卡片HTML
function createSkillCard(category, index) {
  const maxSkillsToShow = 6;
  const visibleSkills = category.skills.slice(0, maxSkillsToShow);
  const remainingCount = category.skills.length - maxSkillsToShow;
  
  const skillsHTML = visibleSkills.map(skill => 
    `<span class="tech-skill-badge skill-level-${skill.level}">${skill.name}</span>`
  ).join('');
  
  const moreSkillsHTML = remainingCount > 0 ? 
    `<span class="tech-skill-badge tech-skill-more">+${remainingCount}</span>` : '';
  
  return `
    <div class="tech-skill-card" style="animation-delay: ${index * 0.1}s;">
      <div class="tech-skill-card-header">
        <div class="tech-skill-icon">
          ${category.icon}
        </div>
        <h3 class="tech-skill-title">${category.title}</h3>
      </div>
      <div class="tech-skills-list">
        ${skillsHTML}
        ${moreSkillsHTML}
      </div>
    </div>
  `;
}

// 创建完整的技术栈展示组件
function createTechSkillsShowcase() {
  const cardsHTML = skillCategories.map((category, index) => 
    createSkillCard(category, index)
  ).join('');
  
  return `
    <div class="tech-skills-showcase">
      <div class="tech-skills-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

// 主题切换适配
function updateThemeColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                document.body.classList.contains('dark') ||
                document.documentElement.classList.contains('dark');
  
  // 根据主题更新CSS变量（如果需要动态调整）
  if (isDark) {
    document.documentElement.style.setProperty('--card-bg', '#1f2937');
    document.documentElement.style.setProperty('--card-border', '#374151');
    document.documentElement.style.setProperty('--text-color', '#f9fafb');
  } else {
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
    document.documentElement.style.setProperty('--card-border', '#e5e7eb');
    document.documentElement.style.setProperty('--text-color', '#1f2937');
  }
}

// 插入技术栈展示到页面
function insertTechSkillsShowcase() {
  // 查找轮播图容器
  const swiperContainer = document.querySelector('#recent-posts');
  if (!swiperContainer) {
    console.warn('未找到轮播图容器，无法插入技术栈展示');
    return;
  }
  
  // 查找文章列表容器
  const recentPostItems = swiperContainer.querySelector('.recent-post-items');
  if (!recentPostItems) {
    console.warn('未找到文章列表容器，无法插入技术栈展示');
    return;
  }
  
  // 创建技术栈展示容器
  const techSkillsContainer = document.createElement('div');
  techSkillsContainer.id = 'tech-skills-container';
  techSkillsContainer.innerHTML = createTechSkillsShowcase();
  
  // 插入到#recent-posts容器内部，在.recent-post-items之前
  swiperContainer.insertBefore(techSkillsContainer, recentPostItems);
  
  // 初始化主题适配
  updateThemeColors();
  
  // 监听主题切换
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && 
          (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class')) {
        updateThemeColors();
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class']
  });
  
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
}

// 页面加载完成后初始化
function initTechSkillsShowcase() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertTechSkillsShowcase);
  } else {
    insertTechSkillsShowcase();
  }
}

// 如果是首页，则初始化技术栈展示
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  initTechSkillsShowcase();
}

// 兼容PJAX
if (typeof window.addEventListener !== 'undefined') {
  window.addEventListener('pjax:complete', function() {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      // 延迟执行，确保DOM已更新
      setTimeout(insertTechSkillsShowcase, 100);
    }
  });
}