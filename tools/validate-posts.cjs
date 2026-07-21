'use strict';

const fs = require('fs');
const path = require('path');
const frontMatter = require('hexo-front-matter');

const postsDirectory = path.join(process.cwd(), 'source', '_posts');
const requiredFields = ['title', 'description', 'categories', 'tags', 'cover'];

function collectMarkdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.name.startsWith('.')) {
      return [];
    }

    if (entry.isDirectory()) {
      return collectMarkdownFiles(entryPath);
    }

    return /\.md$/i.test(entry.name) ? [entryPath] : [];
  });
}

function hasOwnField(metadata, field) {
  return Object.prototype.hasOwnProperty.call(metadata, field);
}

const failures = [];

for (const filePath of collectMarkdownFiles(postsDirectory)) {
  const relativePath = path.relative(process.cwd(), filePath);

  try {
    const metadata = frontMatter.parse(fs.readFileSync(filePath, 'utf8'));
    const missingFields = requiredFields.filter((field) => !hasOwnField(metadata, field));

    if (missingFields.length > 0) {
      failures.push(`${relativePath}: 缺少 ${missingFields.join(', ')}`);
    }
  } catch (error) {
    failures.push(`${relativePath}: Front Matter 无法解析（${error.message}）`);
  }
}

if (failures.length > 0) {
  console.error('文章检查失败：');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('文章检查通过：title、description、categories、tags、cover 字段均存在。');
