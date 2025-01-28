import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import fs from 'fs-extra';

function run(bin, args, opts = {}) {
  return execa(bin, args, { stdio: 'inherit', ...opts });
}

async function bootstrap() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const packageVersion = fs.readJSONSync(path.resolve(__dirname, '../../theme/package.json')).version;
  const vitepressVersion = fs.readJSONSync(path.resolve(__dirname, '../../../package.json')).devDependencies.vitepress;
  const originTemplatePath = path.resolve(__dirname, '../../template');
  const targetPath = path.resolve(__dirname, '../template');
  const packagePath = path.resolve(targetPath, './package.json');

  fs.removeSync(targetPath);
  fs.copySync(originTemplatePath, targetPath);
  fs.renameSync(path.resolve(targetPath, '.gitignore'), path.resolve(targetPath, '_gitignore'));
  const packageData = JSON.parse(fs.readFileSync(packagePath));
  packageData.devDependencies.vitepress = vitepressVersion;
  packageData.devDependencies['vitepress-theme-mild'] = `^${packageVersion}`;
  fs.writeFileSync(packagePath, `${JSON.stringify(packageData, null, 2)}\n`);
  fs.removeSync(path.resolve(targetPath, 'node_modules'));
  fs.removeSync(path.resolve(targetPath, '.vitepress/cache'));
  fs.removeSync(path.resolve(targetPath, '.vitepress/dist'));
  await run('eslint', ['template/package.json', '--fix', '--no-ignore']);
  console.log('模板同步完成');
}

bootstrap();
