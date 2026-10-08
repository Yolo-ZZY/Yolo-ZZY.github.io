'use strict';

const fs = require('fs');
const path = require('path');
const frontMatter = require('hexo-front-matter');

const postsDirectory = path.join(process.cwd(), 'source', '_posts');

const categoryGroups = [
  {
    categories: ['技术', '开发', 'C++'],
    files: [
      'C++基础部分.md', 'C++编译链接与指令.md', 'C++面向对象.md',
      'const.一级指针与引用的结合引用.md', 'new,malloc,free,delete，引用和指针.md', '全面掌握const.md',
      '关于include与多个源文件关联.md', '学习复数类CComplex，cin与cout.md',
      '实现C++STL向量容量vector代码.md', '实现string类型.md', '对象池.md', '对象的浅拷贝和深拷贝.md',
      '指向类成员的指针.md', '指针、引用和const.md', '掌握构造函数和析构函数.md',
      '掌握类的各种成员方法及区别.md', '数组与向量.md', '构造函数的初始化列表.md',
      '模拟实现string类型代码.md', '理解函数模板.md', '理解容器空间配置器allocator的重要性.md',
      '理解类模板.md', '类和对象代码应用实践.md', '继承.md', '进程虚拟地址空间划分.md'
    ]
  },
  { categories: ['技术', '开发', '数据结构与算法'], files: ['二分查找.md', '移除元素.md'] },
  { categories: ['技术', 'Linux', '服务器'], files: ['linux服务器Mihomo (Clash) 部署与避坑完整记录.md', 'Mihomo 服务器节点每月更新操作指南.md', '终端网络开关.md'] },
  { categories: ['技术', 'AI', 'AI工具'], files: ['记录claude-code安装与ccswitch配置.md', 'Ubuntu 搭建 Claude Code指南.md'] },
  {
    categories: ['技术', '博客', 'Hexo'],
    files: ['搭建博客一.md', '搭建博客二.md', '搭建博客踩坑合集.md', '关于博客图片上传问题.md', '在多端上同步部署hexo.md', '2026-07-21-博客自动化工作流测试.md']
  },
  { categories: ['技术', '博客', '部署运维'], files: ['搭建服务器博客.md', 'nginx配置ssl.md'] },
  { categories: ['工具与折腾', '工具笔记'], files: ['markdown相关.md', 'windows踩坑合集.md', '相关快捷键.md'] },
  { categories: ['技术', '开发', '环境配置'], files: ['在vscde中写c.md'] },
  { categories: ['工具与折腾', '数码设备'], files: ['记录小米手机刷系统.md'] },
  { categories: ['学习与成长', '面试复习'], files: ['mysql数据库面试.md', '数据结构面试.md'] },
  { categories: ['学习与成长', '本科毕设'], files: ['安装SDN网络数据中心环境.md'] },
  { categories: ['学习与成长', '实习项目'], files: ['ERPNEXT环境搭建.md', 'ERPNEXT环境搭建（二）.md'] },
  { categories: ['随笔'], files: ['年末小结.md', '二六年五月有感.md'] },
  { categories: ['游戏'], files: ['rlcraft附魔.md'] }
];

const categoryByFile = new Map();
for (const group of categoryGroups) {
  for (const file of group.files) categoryByFile.set(file, group.categories);
}

const tagAliases = new Map([
  ['c++', 'C++'], ['c', 'C'], ['linux', 'Linux'], ['hexo', 'Hexo'],
  ['butterfly', 'Butterfly'], ['Github', 'GitHub'], ['mysql', 'MySQL'],
  ['nginx', 'Nginx'], ['ssl', 'SSL'], ['markdown', 'Markdown'],
  ['vscode', 'VS Code'], ['claude', 'Claude Code'], ['ccswitch', 'CCSwitch'],
  ['rlcraft', 'RLCraft'], ['mc', 'Minecraft'], ['gitbash', 'Git Bash']
]);

const tagOverrides = new Map([
  ['数据结构面试.md', ['数据结构', '算法', '面试']],
  ['在vscde中写c.md', ['VS Code', 'C', 'MinGW', '开发环境']],
  ['2026-07-21-博客自动化工作流测试.md', ['Hexo', '自动化']],
  ['Ubuntu 搭建 Claude Code指南.md', ['Claude Code', 'Ubuntu', 'DeepSeek', 'AI 编程']]
]);

const descriptionOverrides = new Map([
  ['2026-07-21-博客自动化工作流测试.md', '用于验证 Hexo 博客文章创建、元数据规范和自动化工作流的测试记录。'],
  ['C++编译链接与指令.md', '梳理 C++ 源文件从预处理、编译、汇编到链接的完整过程及相关指令。'],
  ['Ubuntu 搭建 Claude Code指南.md', '在 Ubuntu 服务器上使用 DeepSeek 的 Anthropic 兼容接口安装并配置 Claude Code。']
]);

function scalar(value) {
  const text = String(value ?? '');
  return /^[A-Za-z0-9_+./\-\u4e00-\u9fff ]+$/.test(text) && text.trim() === text && text !== ''
    ? text
    : JSON.stringify(text);
}

function originalValue(source, field) {
  const match = source.match(new RegExp(`^${field}:\\s*(.*?)\\s*$`, 'm'));
  return match ? match[1].replace(/^['\"]|['\"]$/g, '') : '';
}

function render(metadata, content, source) {
  const lines = [
    '---',
    `title: ${scalar(metadata.title)}`,
    `date: ${originalValue(source, 'date')}`,
    `updated: ${originalValue(source, 'updated') || originalValue(source, 'date')}`,
    'categories:',
    ...metadata.categories.map(value => `  - ${scalar(value)}`),
    'tags:',
    ...metadata.tags.map(value => `  - ${scalar(value)}`),
    `description: ${JSON.stringify(metadata.description)}`,
    `cover: ${JSON.stringify(metadata.cover ?? '')}`
  ];

  if (metadata.swiper_index !== undefined) lines.push(`swiper_index: ${metadata.swiper_index}`);
  if (metadata.fmContentType !== undefined) lines.push(`fmContentType: ${scalar(metadata.fmContentType)}`);
  lines.push('---', content.replace(/^\n+/, '').replace(/\n+$/, ''), '');
  return lines.join('\n');
}

const markdownFiles = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md')).sort();
const unknownFiles = markdownFiles.filter(file => !categoryByFile.has(file));
const missingFiles = [...categoryByFile.keys()].filter(file => !markdownFiles.includes(file));

if (unknownFiles.length || missingFiles.length) {
  if (unknownFiles.length) console.error(`未分类文章: ${unknownFiles.join(', ')}`);
  if (missingFiles.length) console.error(`迁移表中不存在的文章: ${missingFiles.join(', ')}`);
  process.exit(1);
}

for (const file of markdownFiles) {
  const filePath = path.join(postsDirectory, file);
  const source = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const metadata = frontMatter.parse(source);
  const tags = tagOverrides.get(file) || (Array.isArray(metadata.tags) ? metadata.tags : []);
  metadata.categories = categoryByFile.get(file);
  metadata.tags = [...new Set(tags.map(tag => tagAliases.get(String(tag)) || String(tag)))];
  metadata.description = descriptionOverrides.get(file) || String(metadata.description || '').trim();
  metadata.cover = metadata.cover || '';

  if (!metadata.title || !originalValue(source, 'date') || !metadata.description) {
    throw new Error(`${file} 缺少 title、date 或 description`);
  }

  fs.writeFileSync(filePath, render(metadata, metadata._content, source), 'utf8');
}

console.log(`已规范化 ${markdownFiles.length} 篇文章的 front matter。`);
