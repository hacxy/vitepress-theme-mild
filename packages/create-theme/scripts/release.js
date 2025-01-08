import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import c from 'picocolors';
import prompts from 'prompts';
import semver from 'semver';

const { version: currentVersion } = createRequire(import.meta.url)(
  '../package.json'
);
const { inc: _inc, valid } = semver;

const versionIncrements = ['patch', 'minor', 'major'];

const tags = ['latest', 'next'];

const dir = fileURLToPath(new URL('.', import.meta.url));
const inc = i => _inc(currentVersion, i);
function run(bin, args, opts = {}) {
  return execa(bin, args, { stdio: 'inherit', ...opts });
}
const step = msg => console.log(c.cyan(msg));

async function main() {
  let targetVersion;

  const versions = versionIncrements
    .map(i => `${i} (${inc(i)})`)
    .concat(['custom']);

  const { release } = await prompts({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versions
  });

  if (release === 3) {
    targetVersion = (
      await prompts({
        type: 'text',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion
      })
    ).version;
  }
  else {
    targetVersion = versions[release].match(/\((.*)\)/)[1];
  }

  if (!valid(targetVersion)) {
    throw new Error(`Invalid target version: ${targetVersion}`);
  }

  const { tag } = await prompts({
    type: 'select',
    name: 'tag',
    message: 'Select tag type',
    choices: tags
  });

  const { yes: tagOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion} on ${tags[tag]}. Confirm?`
  });

  if (!tagOk) {
    return;
  }

  // Update the package version.
  step('\nUpdating the package version...');
  updatePackage(targetVersion);

  // sync template
  step('\nSync template');
  await run('pnpm', ['sync']);

  // Build the package.
  step('\nBuilding the package...');
  await run('pnpm', ['build']);

  // Commit changes to the Git and create a tag.
  step('\nCommitting changes...');
  await run('git', ['add', 'package.json', 'template']);
  await run('git', ['commit', '-m', `chore: release: v${targetVersion}`]);

  // Publish the package.
  step('\nPublishing the package...');
  await run('pnpm', [
    'publish',
    '--tag',
    tags[tag],
    '--ignore-scripts',
    '--no-git-checks'
  ]);

  // Push.
  step('\nPushing...');
  await run('git', ['push']);
}

function updatePackage(version) {
  const pkgPath = resolve(resolve(dir, '..'), 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  pkg.version = version;

  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

main().catch(err => console.error(err));
