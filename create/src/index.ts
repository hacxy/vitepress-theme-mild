import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  cancel,
  confirm,
  group,
  intro,
  outro,
  text
} from '@clack/prompts';
import fs from 'fs-extra';
import { bold, cyan, green } from 'picocolors';
import parentPkgInfo from '../../package.json';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = path.resolve(__dirname, '../template');
const vitepressVersion = parentPkgInfo.devDependencies.vitepress;
const version = parentPkgInfo.version;
export interface ScaffoldOptions {
  root: string
  useTs: boolean
}

function getPackageManger() {
  const name = process.env?.npm_config_user_agent || 'npm';
  return name.split('/')[0];
}

export async function createTheme() {
  intro(bold(cyan('✨ Welcome to create Mild Theme!')));

  const options: ScaffoldOptions = await group(
    {
      root: async () => {
        return text({
          message: 'Please enter the project name:',
          initialValue: 'my-blog',
          validate() {
            return void 0;
          }
        });
      },

      useTs: () => confirm({ message: 'Use TypeScript for config and theme files?' }),
    },

    {
      onCancel: () => {
        cancel('Cancelled.');
        process.exit(0);
      }
    }
  );

  const targetPath = path.resolve(process.cwd(), options.root);
  fs.cpSync(templatePath, targetPath, { recursive: true });

  const rmConfigFilePath = options.useTs ? path.resolve(targetPath, '.vitepress/config.js') : path.resolve(targetPath, '.vitepress/config.ts');

  if (options.useTs) {
    fs.renameSync(path.resolve(targetPath, '.vitepress/theme/index.js'), path.resolve(targetPath, '.vitepress/theme/index.ts'));
  }

  fs.removeSync(rmConfigFilePath);
  fs.renameSync(path.resolve(targetPath, '_gitignore'), path.resolve(targetPath, '.gitignore'));
  const targetPkgPath = path.resolve(targetPath, 'package.json');
  const packageJsonStr = fs.readFileSync(targetPkgPath, { encoding: 'utf-8' });
  const packageJson = JSON.parse(packageJsonStr);
  packageJson.devDependencies.vitepress = vitepressVersion;
  packageJson.devDependencies['vitepress-theme-mild'] = `^${version}`;
  packageJson.name = options.root;
  const newPackageJsonStr = JSON.stringify(packageJson, null, 2);
  fs.writeFileSync(targetPkgPath, newPackageJsonStr);

  outro(bold(green('✨ Creation successful!')));

  console.log(`\ncd ${targetPath}\n${getPackageManger()} run docs:dev`);
}

createTheme();
