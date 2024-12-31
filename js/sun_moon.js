// // 页面加载时应用当前主题模式
// document.addEventListener('DOMContentLoaded', function () {
//     // 获取本地存储的主题模式
//     const savedTheme = localStorage.getItem('theme') || 'light';
//
//     // 设置 html 和 body 根据模式
//     if (savedTheme === 'dark') {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         document.querySelector('body').classList.add('DarkMode');
//     } else {
//         document.documentElement.setAttribute('data-theme', 'light');
//         document.querySelector('body').classList.remove('DarkMode');
//     }
//
//     // 处理模式图标
//     const modeIcon = document.getElementById('modeicon');
//     if (modeIcon) {
//         if (savedTheme === 'dark') {
//             modeIcon.setAttribute('xlink:href', '#icon-sun');
//         } else {
//             modeIcon.setAttribute('xlink:href', '#icon-moon');
//         }
//     }
// });
// 如果 Butterfly 开启了 PJAX，再监听 pjax:complete
// document.addEventListener('pjax:complete', function () {
//     const savedTheme = localStorage.getItem('theme') || 'light';

// 如果 Butterfly 开启了 PJAX，这里只用了PJAX监听：
// 初始化主题（首次加载页面）
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light'; // 默认是 'light'

  // 设置 <html> 标签的 data-theme 属性
  document.documentElement.setAttribute('data-theme', savedTheme);

  // 设置 body 的 DarkMode 类
  if (savedTheme === 'dark') {
      document.body.classList.add('DarkMode');
  } else {
      document.body.classList.remove('DarkMode');
  }

  // 更新按钮图标
  const modeIcon = document.getElementById('modeicon');
  if (modeIcon) {
      if (savedTheme === 'dark') {
          modeIcon.setAttribute('xlink:href', '#icon-sun');
      } else {
          modeIcon.setAttribute('xlink:href', '#icon-moon');
      }
  }
}

// 页面首次加载时应用主题
document.addEventListener('DOMContentLoaded', initTheme);

// 如果 Butterfly 开启了 PJAX，监听 pjax:complete 事件
document.addEventListener('pjax:complete', initTheme);

function switchNightMode() {
  // 插入太阳月亮动画 DOM
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>');

  setTimeout(function () {
      // 切换 DarkMode 类
      if (document.querySelector('body').classList.contains('DarkMode')) {
          document.querySelector('body').classList.remove('DarkMode');
          localStorage.setItem('isDark', '0');
          document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
      } else {
          document.querySelector('body').classList.add('DarkMode');
          localStorage.setItem('isDark', '1');
          document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
      }

      setTimeout(function () {
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
          setTimeout(function () {
              document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
          }, 1000);
      }, 2000);
  });

  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  if (nowMode === 'light') {
      // 设置太阳月亮透明度
      document.getElementById("sun").style.opacity = "1";
      document.getElementById("moon").style.opacity = "0";
      setTimeout(function () {
          document.getElementById("sun").style.opacity = "0";
          document.getElementById("moon").style.opacity = "1";
      }, 1000);

      // 激活夜间模式
      document.documentElement.setAttribute('data-theme', 'dark'); // 设置 data-theme 为 dark
      localStorage.setItem('theme', 'dark'); // 保存到 localStorage
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');

      // 弹窗提醒
      setTimeout(() => {
          new Vue({
              data: function () {
                  this.$notify({
                      title: "关灯啦🌙",
                      message: "明月装饰了你的窗子，你装饰了别人的梦。",
                      position: 'top-left',
                      offset: 50,
                      showClose: true,
                      type: "success",
                      duration: 5000
                  });
              }
          });
      }, 2000);
  } else {
      // 设置太阳月亮透明度
      document.getElementById("sun").style.opacity = "0";
      document.getElementById("moon").style.opacity = "1";
      setTimeout(function () {
          document.getElementById("sun").style.opacity = "1";
          document.getElementById("moon").style.opacity = "0";
      }, 1000);

      // 激活白天模式
      document.documentElement.setAttribute('data-theme', 'light'); // 设置 data-theme 为 light
      localStorage.setItem('theme', 'light'); // 保存到 localStorage
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');

      // 弹窗提醒
      setTimeout(() => {
          new Vue({
              data: function () {
                  this.$notify({
                      title: "开灯啦🌞",
                      message: "歌未竟，东方白。",
                      position: 'top-left',
                      offset: 50,
                      showClose: true,
                      type: "success",
                      duration: 5000
                  });
              }
          });
      }, 2000);
  }

  // 处理一些特定情况
  typeof utterancesTheme === 'function' && utterancesTheme();
  typeof FB === 'object' && window.loadFBComment();
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}
