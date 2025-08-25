
// 项目数据
const projects = [
  {
    id: 1,
    title: "MarkAI聊天应用",
    description: "基于最新AI技术的智能聊天应用，支持海量模型提供商，提供超100款大模型，支持多模态交互和知识库检索以及AI绘画等",
    image: "https://pic1.imgdb.cn/item/68acd9ee58cb8da5c84d43cf.png",
    tags: ["React", "Next.js", "OpenAI", "TailwindCSS", "TypeScript", "pLpgSQL"],
    liveUrl: "https://chatai.markqq.com",
    githubUrl: "https://github.com/markcxx/markai",
    featured: true
  },
  {
    id: 2,
    title: "VidFlow无水印视频下载工具",
    description: "VidFlow提供抖音、B站等视频平台的视频解析和无水印下载，提供网页版和桌面版，正在持续优化和更新中",
    image: "https://pic1.imgdb.cn/item/68ace15458cb8da5c84d4434.png",
    tags: ["React", "PyQt", "Python", "FastAPI"],
    liveUrl: "https://vidflow.markqq.com",
    githubUrl: "https://github.com/markcxx/VidFlowDesktop"
  },
  {
    id: 3,
    title: "MarkAI模型API服务",
    description: "MarkAI提供模型API服务，支持模型的训练、推理和评估，同时提供deepseekV3.1、gpt-oss-120b、GLM-4.5、Qwen等大模型API服务，方便用户调用",
    image: "https://pic1.imgdb.cn/item/68ace97b58cb8da5c84d44b7.png",
    tags: ["FastAPI", "Python", "Redis"],
    liveUrl: "#",
    githubUrl: "https://github.com/markcxx/huggingface-openai-proxy"
  },
];

// 创建项目轮播图组件
function createProjectCarousel() {
  let currentIndex = 0;
  let isHovered = false;
  let slideDirection = null;
  let autoPlayInterval = 5000;
  let autoPlayTimer = null;

  // 创建HTML结构
  function createCarouselHTML() {
    const currentProject = projects[currentIndex];
    
    return `
      <div class="modern-carousel-container">
        <div class="modern-carousel-card">
          <div class="modern-carousel-content">
            <!-- 斜线分割背景 -->
            <div class="modern-carousel-bg-gradient"></div>
            <div class="modern-carousel-bg-diagonal"></div>
            
            <!-- 左侧图片区域 -->
            <div class="modern-carousel-image-container">
              <div class="modern-carousel-image-wrapper">
                <img 
                  src="${currentProject.image}" 
                  alt="${currentProject.title}" 
                  class="modern-carousel-image ${slideDirection === 'right' ? 'slide-in-right' : slideDirection === 'left' ? 'slide-in-left' : ''}"
                />
                <div class="modern-carousel-image-overlay"></div>
                <div class="modern-carousel-image-hover-overlay"></div>
              </div>
            </div>
            
            <!-- 右侧内容区域 -->
            <div class="modern-carousel-info-container">
              <div class="modern-carousel-info-wrapper ${slideDirection === 'right' ? 'slide-in-right' : slideDirection === 'left' ? 'slide-in-left' : ''}">
                ${currentProject.featured ? '<span class="modern-carousel-badge featured-badge">精选项目</span>' : ''}
                
                <div class="modern-carousel-info-content">
                  <h2 class="modern-carousel-title">${currentProject.title}</h2>
                  <p class="modern-carousel-description">${currentProject.description}</p>
                  
                  <!-- 技术标签 -->
                  <div class="modern-carousel-tags">
                    ${currentProject.tags.map(tag => 
                      `<span class="modern-carousel-tag">${tag}</span>`
                    ).join('')}
                  </div>
                  
                  <!-- 操作按钮 -->
                  <div class="modern-carousel-actions">
                    ${currentProject.liveUrl ? 
                      `<a href="${currentProject.liveUrl}" class="modern-carousel-button primary-button" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        查看
                      </a>` : 
                      ''}
                    ${currentProject.githubUrl ? 
                      `<a href="${currentProject.githubUrl}" class="modern-carousel-button outline-button" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        源码
                      </a>` : 
                      ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 指示器 -->
          ${projects.length > 1 ? `
            <div class="modern-carousel-indicators">
              ${projects.map((_, index) => `
                <button class="modern-carousel-indicator ${index === currentIndex ? 'active' : ''}" data-index="${index}"></button>
              `).join('')}
            </div>
          ` : ''}
        </div>
        
        <!-- 导航按钮 -->
        ${projects.length > 1 ? `
          <button class="modern-carousel-nav-button prev-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button class="modern-carousel-nav-button next-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        ` : ''}

      </div>
    `;
  }

  // 更新轮播图
  function updateCarousel() {
    const carouselContainer = document.querySelector('.modern-carousel-container');
    if (!carouselContainer) return;
    
    const newCarouselHTML = createCarouselHTML();
    carouselContainer.outerHTML = newCarouselHTML;
    
    // 重新绑定事件
    bindEvents();
  }

  // 切换到上一个项目
  function goToPrevious() {
    slideDirection = 'left';
    currentIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    updateCarousel();
    resetSlideDirection();
  }

  // 切换到下一个项目
  function goToNext() {
    slideDirection = 'right';
    currentIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    updateCarousel();
    resetSlideDirection();
  }

  // 切换到指定项目
  function goToSlide(index) {
    if (index === currentIndex) return;
    slideDirection = index > currentIndex ? 'right' : 'left';
    currentIndex = index;
    updateCarousel();
    resetSlideDirection();
  }

  // 重置滑动方向
  function resetSlideDirection() {
    setTimeout(() => {
      slideDirection = null;
    }, 500);
  }

  // 开始自动播放
  function startAutoPlay() {
    if (projects.length <= 1) return;
    
    autoPlayTimer = setInterval(() => {
      if (!isHovered) {
        goToNext();
      }
    }, autoPlayInterval);
  }

  // 停止自动播放
  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  // 绑定事件
  function bindEvents() {
    const container = document.querySelector('.modern-carousel-container');
    if (!container) return;
    
    // 鼠标悬停事件
    container.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    
    container.addEventListener('mouseleave', () => {
      isHovered = false;
    });
    
    // 导航按钮事件
    const prevButton = container.querySelector('.prev-button');
    const nextButton = container.querySelector('.next-button');
    
    if (prevButton) {
      prevButton.addEventListener('click', goToPrevious);
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', goToNext);
    }
    
    // 指示器事件
    const indicators = container.querySelectorAll('.modern-carousel-indicator');
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        const index = parseInt(indicator.dataset.index);
        goToSlide(index);
      });
    });
  }

  // 初始化轮播图
  function init() {
    return createCarouselHTML();
  }

  // 公开方法
  return {
    init,
    bindEvents,
    startAutoPlay,
    stopAutoPlay
  };
}

// 插入项目轮播图到页面
function insertProjectCarousel() {
  // 查找轮播图容器
  const swiperContainer = document.querySelector('#recent-posts');
  if (!swiperContainer) {
    console.warn('未找到轮播图容器，无法插入项目轮播图');
    return;
  }
  
  // 查找技术栈展示容器
  const techSkillsContainer = document.querySelector('#tech-skills-container');
  if (!techSkillsContainer) {
    console.warn('未找到技术栈展示容器，无法插入项目轮播图');
    return;
  }
  
  // 创建项目轮播图容器
  const projectCarouselContainer = document.createElement('div');
  projectCarouselContainer.id = 'project-carousel-container';
  
  // 创建轮播图实例
  const carousel = createProjectCarousel();
  projectCarouselContainer.innerHTML = carousel.init();
  
  // 插入到首页的第一个位置
  const firstChild = swiperContainer.firstChild;
  swiperContainer.insertBefore(projectCarouselContainer, firstChild);
  
  // 绑定事件
  carousel.bindEvents();
  
  // 开始自动播放
  carousel.startAutoPlay();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  insertProjectCarousel();
});