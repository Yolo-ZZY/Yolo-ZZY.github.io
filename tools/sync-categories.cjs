'use strict';

const fs = require('fs');
const path = require('path');
const frontMatter = require('hexo-front-matter');

const postsDirectory = path.join(process.cwd(), 'source', '_posts');
const categoriesFile = path.join(process.cwd(), 'source', '_data', 'categories.yml');
const preferredOrder = new Map([
  ['', ['技术', '工具与折腾', '学习与成长', '随笔', '游戏']],
  ['技术', ['AI', 'Linux', '开发', '博客']],
  ['技术/AI', ['AI工具']],
  ['技术/Linux', ['服务器']],
  ['技术/开发', ['C++', '数据结构与算法', '环境配置']],
  ['技术/博客', ['Hexo', '部署运维']],
  ['工具与折腾', ['工具笔记', '数码设备']],
  ['学习与成长', ['面试复习', '本科毕设', '实习项目']]
]);

function collectMarkdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.name.startsWith('.')) return [];
    if (entry.isDirectory()) return collectMarkdownFiles(entryPath);
    return /\.md$/i.test(entry.name) ? [entryPath] : [];
  });
}

function addPath(tree, categories) {
  let branch = tree;
  for (const category of categories) {
    if (!Object.prototype.hasOwnProperty.call(branch, category)) branch[category] = {};
    branch = branch[category];
  }
}

function orderedKeys(branch, pathParts) {
  const preferred = preferredOrder.get(pathParts.join('/')) || [];
  const rank = new Map(preferred.map((name, index) => [name, index]));
  return Object.keys(branch).sort((left, right) => {
    const leftRank = rank.has(left) ? rank.get(left) : Number.MAX_SAFE_INTEGER;
    const rightRank = rank.has(right) ? rank.get(right) : Number.MAX_SAFE_INTEGER;
    return leftRank - rightRank || left.localeCompare(right, 'zh-CN');
  });
}

function safeKey(value) {
  return /^[A-Za-z0-9_+./\-\u4e00-\u9fff ]+$/.test(value) ? value : JSON.stringify(value);
}

function renderTree(branch, depth = 0, pathParts = []) {
  const lines = [];
  for (const name of orderedKeys(branch, pathParts)) {
    lines.push(`${'  '.repeat(depth)}${safeKey(name)}:`);
    lines.push(...renderTree(branch[name], depth + 1, pathParts.concat(name)));
    if (depth === 0) lines.push('');
  }
  return lines;
}

const tree = {};
for (const filePath of collectMarkdownFiles(postsDirectory)) {
  const metadata = frontMatter.parse(fs.readFileSync(filePath, 'utf8'));
  if (!Array.isArray(metadata.categories) || !metadata.categories.length) {
    throw new Error(`${path.relative(process.cwd(), filePath)} 没有有效的 categories 数组`);
  }
  addPath(tree, metadata.categories);
}

const output = `${renderTree(tree).join('\n').replace(/\n+$/, '')}\n`;
fs.mkdirSync(path.dirname(categoriesFile), { recursive: true });
const current = fs.existsSync(categoriesFile) ? fs.readFileSync(categoriesFile, 'utf8') : '';
if (current !== output) {
  fs.writeFileSync(categoriesFile, output, 'utf8');
  console.log('已根据文章同步 categories.yml。');
} else {
  console.log('categories.yml 已是最新状态。');
}
