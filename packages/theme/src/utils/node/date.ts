import dayjs from 'dayjs';
import { simpleGit } from 'simple-git';

const git = simpleGit();

/**
 * @param filePath
 */
export async function getLastCommitDate(filePath: string) {
  const log = await git.log({ file: filePath });
  if (log.latest) {
    return dayjs(log.latest.date).format('YYYY-MM-DD');
  }
  return dayjs(new Date()).format('YYYY-MM-DD');
}
