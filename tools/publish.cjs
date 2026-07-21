'use strict';

const { spawnSync } = require('child_process');

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    shell: process.platform === 'win32',
    stdio: options.capture ? 'pipe' : 'inherit'
  });

  if (options.capture) {
    return result;
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }

  return result;
}

const branchResult = run('git', ['branch', '--show-current'], { capture: true });
if (branchResult.status !== 0) {
  console.error(branchResult.stderr.trim());
  process.exit(branchResult.status || 1);
}

const currentBranch = branchResult.stdout.trim();
if (currentBranch !== 'hexo') {
  console.error(`发布已停止：当前分支是 ${currentBranch || '(detached HEAD)'}，请切换到 hexo 分支。`);
  process.exit(1);
}

run('npm', ['run', 'check']);
run('npm', ['run', 'build']);
run('npm', ['run', 'deploy']);
run('git', ['add', '.']);

const diffResult = run('git', ['diff', '--cached', '--quiet'], { capture: true });
if (diffResult.status === 1) {
  run('git', ['commit', '-m', 'update blog']);
} else if (diffResult.status !== 0) {
  console.error(diffResult.stderr.trim());
  process.exit(diffResult.status || 1);
} else {
  console.log('源码没有待提交变更，跳过 git commit。');
}

run('git', ['push', 'origin', 'hexo']);
console.log('博客发布及 hexo 源码同步完成。');
