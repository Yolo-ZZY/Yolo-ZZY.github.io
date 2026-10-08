'use strict';

const fs = require('fs');
const path = require('path');
const frontMatter = require('hexo-front-matter');
const yaml = require('js-yaml');

const postsDirectory = path.join(process.cwd(), 'source', '_posts');
const categoriesFile = path.join(process.cwd(), 'source', '_data', 'categories.yml');
const requiredFields = ['title', 'date', 'updated', 'description', 'categories', 'tags', 'cover'];
const categoryTree = yaml.load(fs.readFileSync(categoriesFile, 'utf8')) || {};
const failures = [];
const articleCategoryPaths = new Set();

function collectMarkdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.name.startsWith('.')) return [];
    if (entry.isDirectory()) return collectMarkdownFiles(entryPath);
    return /\.md$/i.test(entry.name) ? [entryPath] : [];
  });
}

function hasOwnField(metadata, field) {
  return Object.prototype.hasOwnProperty.call(metadata, field);
}

function categoryPathExists(categories) {
  let branch = categoryTree;
  for (const category of categories) {
    if (!branch || typeof branch !== 'object' || !hasOwnField(branch, category)) return false;
    branch = branch[category];
  }
  return true;
}

function collectTreePaths(branch, prefix = [], result = new Set()) {
  if (!branch || typeof branch !== 'object') return result;
  for (const [category, children] of Object.entries(branch)) {
    const currentPath = prefix.concat(category);
    result.add(currentPath.join(' > '));
    collectTreePaths(children, currentPath, result);
  }
  return result;
}

for (const filePath of collectMarkdownFiles(postsDirectory)) {
  const relativePath = path.relative(process.cwd(), filePath);
  const source = fs.readFileSync(filePath, 'utf8');

  try {
    const metadata = frontMatter.parse(source);
    const missingFields = requiredFields.filter(field => !hasOwnField(metadata, field));
    if (missingFields.length) failures.push(`${relativePath}: 缺少字段 ${missingFields.join(', ')}`);

    if (source.includes('\r\n')) failures.push(`${relativePath}: 请使用 LF 换行`);
    if (!String(metadata.title || '').trim()) failures.push(`${relativePath}: title 不能为空`);
    if (!metadata.date || !metadata.updated) failures.push(`${relativePath}: date 和 updated 不能为空`);
    if (!String(metadata.description || '').trim()) failures.push(`${relativePath}: description 不能为空`);

    if (!Array.isArray(metadata.categories) || !metadata.categories.length) {
      failures.push(`${relativePath}: categories 必须是非空层级数组`);
    } else if (!categoryPathExists(metadata.categories)) {
      failures.push(`${relativePath}: 未知分类路径 ${metadata.categories.join(' > ')}`);
    } else {
      for (let depth = 1; depth <= metadata.categories.length; depth += 1) {
        articleCategoryPaths.add(metadata.categories.slice(0, depth).join(' > '));
      }
    }

    if (!Array.isArray(metadata.tags) || !metadata.tags.length) {
      failures.push(`${relativePath}: tags 必须是非空数组`);
    } else if (new Set(metadata.tags).size !== metadata.tags.length) {
      failures.push(`${relativePath}: tags 存在重复项`);
    }
  } catch (error) {
    failures.push(`${relativePath}: Front matter 无法解析（${error.message}）`);
  }
}

const dataCategoryPaths = collectTreePaths(categoryTree);
for (const categoryPath of dataCategoryPaths) {
  if (!articleCategoryPaths.has(categoryPath)) failures.push(`categories.yml: 存在无文章分类 ${categoryPath}`);
}
for (const categoryPath of articleCategoryPaths) {
  if (!dataCategoryPaths.has(categoryPath)) failures.push(`categories.yml: 缺少文章分类 ${categoryPath}`);
}

if (failures.length) {
  console.error('文章检查失败：');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('文章检查通过：front matter 完整，分类树与文章一致，标签格式正确。');
