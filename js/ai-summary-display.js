// AI摘要显示组件

// 创建AI摘要显示HTML
function createAISummaryHTML(summary) {
  if (!summary || summary.trim() === '') {
    return '';
  }
  
  return `
    <div class="ai-summary-container" style="
      margin: 1.5rem 0;
      padding: 1rem;
      background: var(--card-bg, #fff);
      border: 1px solid var(--card-border, #e5e7eb);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    ">
      <div class="ai-summary-header" style="
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        color: var(--text-color, #333);
      ">
        <svg style="width: 20px; height: 20px; margin-right: 8px; fill: rgb(255, 239, 92);" viewBox="0 0 24 24">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
        <h4 style="margin: 0; font-size: 1rem; font-weight: 600;">AI 文章摘要</h4>
      </div>
      <div class="ai-summary-content" style="
        line-height: 1.6;
        color: var(--text-color-secondary, #666);
        font-size: 0.95rem;
        min-height: 1.5em;
      " data-summary="${summary.replace(/"/g, '&quot;')}">
        <span class="typing-cursor" style="
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background-color: rgb(255, 239, 92);
          animation: blink 1s infinite;
          margin-left: 2px;
        "></span>
      </div>
    </div>
    <style>
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    </style>
  `;
}

// 打字机效果函数
function typewriterEffect(element, text, speed = 50) {
  const cursor = element.querySelector('.typing-cursor');
  let index = 0;
  
  function type() {
    if (index < text.length) {
      const char = text.charAt(index);
      const textNode = document.createTextNode(char);
      element.insertBefore(textNode, cursor);
      index++;
      setTimeout(type, speed);
    } else {
      // 打字完成后移除光标
      if (cursor) {
        cursor.style.display = 'none';
      }
    }
  }
  
  type();
}

// 插入AI摘要到文章页面
function insertAISummary() {
  // 检查是否在文章页面
  if (!window.location.pathname.includes('/posts/')) {
    return;
  }
  
  // 查找文章内容容器
  const postContent = document.querySelector('#article-container');
  if (!postContent) {
    console.warn('未找到文章内容容器');
    return;
  }
  
  // 检查是否已经插入过摘要
  if (document.querySelector('.ai-summary-container')) {
    return;
  }
  
  // 简化的摘要获取逻辑
  let aiSummary = '';
  
  // 直接从页面源码中查找ai字段
  const pageSource = document.documentElement.outerHTML;
  
  // 匹配 ai: 后面的内容，支持数组格式
  const aiMatches = [
    /ai["']?\s*:\s*\[\s*["']([^"']+)["']/i,  // 数组格式: ai: ["content"]
    /ai["']?\s*:\s*["']([^"']+)["']/i,      // 字符串格式: ai: "content"
    /ai:\s*([^\n\r,}]+)/i                    // 简单格式: ai: content
  ];
  
  for (const regex of aiMatches) {
    const match = pageSource.match(regex);
    if (match && match[1] && match[1].trim() !== '') {
      aiSummary = match[1].trim();
      break;
    }
  }
  
  // 如果没有找到摘要，不显示组件
  if (!aiSummary || aiSummary === '""' || aiSummary === '') {
    console.log('未找到AI摘要内容，跳过显示');
    return;
  }
  
  // 创建摘要HTML
  const summaryHTML = createAISummaryHTML(aiSummary);
  
  if (summaryHTML) {
    // 创建摘要容器
    const summaryContainer = document.createElement('div');
    summaryContainer.innerHTML = summaryHTML;
    
    // 插入到文章内容的开头
    const summaryElement = summaryContainer.firstElementChild;
    postContent.insertBefore(summaryElement, postContent.firstChild);
    
    // 启动打字机效果
    const contentElement = summaryElement.querySelector('.ai-summary-content');
    if (contentElement) {
      // 延迟500ms后开始打字效果
      setTimeout(() => {
        typewriterEffect(contentElement, aiSummary, 30); // 30ms每个字符
      }, 500);
    }
    
    console.log('AI摘要已插入，开始打字效果:', aiSummary.substring(0, 50) + '...');
  }
}

// 主题适配
function updateAISummaryTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                document.body.classList.contains('dark') ||
                document.documentElement.classList.contains('dark');
  
  const summaryContainer = document.querySelector('.ai-summary-container');
  if (summaryContainer) {
    if (isDark) {
      summaryContainer.style.background = 'var(--card-bg, #1f2937)';
      summaryContainer.style.borderColor = 'var(--card-border, #374151)';
      summaryContainer.style.color = 'var(--text-color, #f9fafb)';
    } else {
      summaryContainer.style.background = 'var(--card-bg, #fff)';
      summaryContainer.style.borderColor = 'var(--card-border, #e5e7eb)';
      summaryContainer.style.color = 'var(--text-color, #333)';
    }
  }
}

// 页面加载完成后初始化
function initAISummaryDisplay() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertAISummary);
  } else {
    insertAISummary();
  }
  
  // 监听主题切换
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && 
          (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class')) {
        updateAISummaryTheme();
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

// 初始化AI摘要显示
initAISummaryDisplay();

// 兼容PJAX
if (typeof window.addEventListener !== 'undefined') {
  window.addEventListener('pjax:complete', function() {
    // 延迟执行，确保DOM已更新
    setTimeout(insertAISummary, 100);
  });
}