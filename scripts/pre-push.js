/* eslint-disable no-console */
try {
  const { username } = require('os').userInfo();
  const {
    repository: { url: repoUrl },
  } = require('../package.json');

  const remote = process.env.GIT_PARAMS.split(' ')[1];
  const repoName = repoUrl.match(/(?:.(?!\/))+\.git$/)[0];

  if (username !== 'lucky404' && remote.includes(`lucky401${repoName}`)) {
    console.log(
      `You're trying to push to lucky401's repo directly. If you want to save and push your work or even make a contribution to the workshop material, you'll need to fork the repo first and push changes to your fork. Learn how here: https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo`
    );
    process.exit(1);
  }
} catch (error) {
  // ignore
}
