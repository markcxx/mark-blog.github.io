// 随机背景图片处理
document.addEventListener('DOMContentLoaded', function() {
  const webBg = document.getElementById('web_bg');
  
  if (webBg && webBg.hasAttribute('data-bg-images')) {
    try {
      const bgImages = JSON.parse(webBg.getAttribute('data-bg-images'));
      
      if (Array.isArray(bgImages) && bgImages.length > 0) {
        // 随机选择一张背景图片
        const randomIndex = Math.floor(Math.random() * bgImages.length);
        const selectedImage = bgImages[randomIndex];
        
        // 设置背景图片
        webBg.style.backgroundImage = `url(${selectedImage})`;
        webBg.style.backgroundSize = 'cover';
        webBg.style.backgroundPosition = 'center';
        webBg.style.backgroundRepeat = 'no-repeat';
        
        // 移除data属性，避免重复处理
        webBg.removeAttribute('data-bg-images');
      }
    } catch (error) {
      console.error('解析背景图片数据失败:', error);
    }
  }
});

// 支持PJAX的情况
if (typeof pjax !== 'undefined') {
  document.addEventListener('pjax:complete', function() {
    const webBg = document.getElementById('web_bg');
    
    if (webBg && webBg.hasAttribute('data-bg-images')) {
      try {
        const bgImages = JSON.parse(webBg.getAttribute('data-bg-images'));
        
        if (Array.isArray(bgImages) && bgImages.length > 0) {
          const randomIndex = Math.floor(Math.random() * bgImages.length);
          const selectedImage = bgImages[randomIndex];
          
          webBg.style.backgroundImage = `url(${selectedImage})`;
          webBg.style.backgroundSize = 'cover';
          webBg.style.backgroundPosition = 'center';
          webBg.style.backgroundRepeat = 'no-repeat';
          
          webBg.removeAttribute('data-bg-images');
        }
      } catch (error) {
        console.error('解析背景图片数据失败:', error);
      }
    }
  });
}