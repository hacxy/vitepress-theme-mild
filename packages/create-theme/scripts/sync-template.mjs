import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageVersion = fs.readJSONSync(path.resolve(__dirname, '../../theme/package.json')).version;
const originTemplatePath = path.resolve(__dirname, '../../template');
const targetPath = path.resolve(__dirname, '../template');
const packagePath = path.resolve(targetPath, './package.json');

fs.removeSync(targetPath);
fs.copySync(originTemplatePath, targetPath);
fs.renameSync(path.resolve(targetPath, '.gitignore'), path.resolve(targetPath, '_gitignore'));
const packageData = JSON.parse(fs.readFileSync(packagePath));
packageData.devDependencies['vitepress-theme-mild'] = packageVersion;
fs.writeFileSync(packagePath, `${JSON.stringify(packageData, null, 2)}\n`);

console.log('模板同步完成');
