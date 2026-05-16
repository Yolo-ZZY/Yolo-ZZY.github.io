const https = require('https');

let cachedCovers = [];

function fetchCovers() {
  return new Promise((resolve) => {
    https.get({
      hostname: 'api.github.com',
      path: '/repos/Yolo-ZZY/Image/contents/',
      headers: { 'User-Agent': 'Hexo-Blog-Auto-Cover' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const files = JSON.parse(data);
          if (Array.isArray(files)) {
            const covers = files
              .map(f => f.name)
              .filter(name => name.match(/^cover\d+\.(jpg|png)$/i))
              .map(name => `https://ghproxy.net/https://raw.githubusercontent.com/Yolo-ZZY/Image/main/${name}`);
            if (covers.length > 0) {
              cachedCovers = covers;
            }
          }
          resolve();
        } catch (e) {
          resolve();
        }
      });
    }).on('error', resolve);
  });
}

// 拦截配置合并后、渲染前，将图片数组注入到主题配置的 default_cover 中
hexo.extend.filter.register('before_generate', async function() {
  await fetchCovers();
  if (cachedCovers.length > 0) {
    hexo.theme.config.cover.default_cover = cachedCovers;
    hexo.log.info(`[AutoCover] 成功从 GitHub 图床获取了 ${cachedCovers.length} 张随机封面图！`);
  } else {
    hexo.log.warn(`[AutoCover] 无法获取封面，将使用主题默认封面。`);
  }
});
