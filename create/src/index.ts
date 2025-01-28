import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { input } from '@inquirer/prompts';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.resolve(__dirname, '../template');

export async function bootstrap() {
  const packageName = await input({
    message: 'Input package name: ',
    default: 'my-blog'
  });

  const targetPath = path.resolve(process.cwd(), packageName);
  fs.copySync(templatePath, targetPath);
  fs.renameSync(path.resolve(targetPath, '_gitignore'), path.resolve(targetPath, '.gitignore'));

  const pkg = JSON.parse(
    fs.readFileSync(path.resolve(targetPath, 'package.json'), 'utf-8')
  );
  pkg.name = packageName;

  // fs.writeFileSync(path.resolve(targetPath, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`);

  console.log(`\ncd ${targetPath}\nnpm run install\nnpm run dev`);
}

bootstrap();
