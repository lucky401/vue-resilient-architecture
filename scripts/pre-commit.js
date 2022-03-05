var spawnSync = require('child_process').spawnSync;
const { username } = require('os').userInfo();

if (username === 'lucky404') {
  const result = spawnSync('npm run lint', {
    stdio: 'inherit',
    shell: true,
  });

  if (result.status !== 0) {
    process.exit(result.status);
  }
}
