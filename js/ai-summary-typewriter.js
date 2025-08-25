// AI摘要打字机效果
document.addEventListener('DOMContentLoaded', function() {
  // 查找所有AI摘要内容元素
  const aiSummaryContents = document.querySelectorAll('.ai-summary-content');
  
  aiSummaryContents.forEach(function(element) {
    const text = element.textContent.trim();
    if (text && text.length > 0) {
      // 清空内容并添加光标
      element.innerHTML = '<span class="typing-cursor"></span>';
      
      // 延迟500ms后开始打字效果
      setTimeout(() => {
        typewriterEffect(element, text, 30);
      }, 500);
    }
  });
});

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

// PJAX兼容
if (typeof pjax !== 'undefined') {
  document.addEventListener('pjax:complete', function() {
    // PJAX页面切换后重新初始化
    const aiSummaryContents = document.querySelectorAll('.ai-summary-content');
    
    aiSummaryContents.forEach(function(element) {
      const text = element.textContent.trim();
      if (text && text.length > 0 && !element.querySelector('.typing-cursor')) {
        element.innerHTML = '<span class="typing-cursor"></span>';
        
        setTimeout(() => {
          typewriterEffect(element, text, 30);
        }, 500);
      }
    });
  });
}