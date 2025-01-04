import simpleGit from 'simple-git';

const git = simpleGit();

export async function getLastCommitInfo(filePath: string) {
  try {
    // 使用 git log 命令获取最后一次提交信息
    const log = await git.log({ file: filePath, n: 1 });
    const lastCommit = log.latest;

    return {
      hash: lastCommit?.hash,
      date: lastCommit?.date,
      message: lastCommit?.message,
      authorName: lastCommit?.author_name,
      authorEmail: lastCommit?.author_email,
    };
  }
  catch (_) {
    return null;
  }
}
