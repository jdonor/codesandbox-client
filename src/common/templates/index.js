import { decorateSelector } from '../theme';

export const react = {
  name: 'create-react-app',
  niceName: 'React',
  url: 'https://github.com/facebookincubator/create-react-app',
  shortid: 'new',
  color: decorateSelector(() => '#6CAEDD'),

  alterDeploymentData: apiData => ({
    ...apiData,
    package: {
      ...apiData.package,
      devDependencies: {
        ...apiData.package.devDependencies,
        serve: '^5.0.1',
      },
      scripts: {
        ...apiData.package.scripts,
        'now-start': 'cd build && serve -s ./',
      },
    },
  }),
};

export const reactTs = {
  name: 'create-react-app-typescript',
  niceName: 'React + TS',
  url: 'https://github.com/wmonk/create-react-app-typescript',
  shortid: 'react-ts',
  color: decorateSelector(() => '#009fff'),

  sourceConfig: {
    typescript: true,
    entry: 'index.tsx',
  },
};

export const vue = {
  name: 'vue-cli',
  niceName: 'Vue',
  url: 'https://github.com/vuejs/vue-cli',
  shortid: 'vue',
  color: decorateSelector(() => '#41B883'),

  alterDeploymentData: apiData => ({
    ...apiData,
    package: {
      ...apiData.package,
      devDependencies: {
        ...apiData.package.devDependencies,
        serve: '^5.0.1',
      },
      scripts: {
        ...apiData.package.scripts,
        'now-start': 'cd dist && serve -s ./',
      },
    },
  }),
};

export const svelte = {
  name: 'svelte',
  niceName: 'Svelte',
  url: 'https://github.com/sveltejs/svelte',
  shortid: 'svelte',
  color: decorateSelector(() => '#AA1E1E'),

  alterDeploymentData: apiData => ({
    ...apiData,
    package: {
      ...apiData.package,
      devDependencies: {
        ...apiData.package.devDependencies,
        serve: '^5.0.1',
      },
      scripts: {
        ...apiData.package.scripts,
        'now-start': 'cd public && serve -s ./',
      },
    },
  }),
};

export const preact = {
  name: 'preact-cli',
  niceName: 'Preact',
  url: 'https://github.com/developit/preact-cli',
  shortid: 'preact',
  color: decorateSelector(() => '#AD78DC'),

  alterDeploymentData: apiData => ({
    ...apiData,
    package: {
      ...apiData.package,
      devDependencies: {
        ...apiData.package.devDependencies,
        serve: '^5.0.1',
      },
      scripts: {
        ...apiData.package.scripts,
        'now-start': 'cd build && serve -s ./',
      },
    },
  }),
};

export default function getDefinition(
  theme:
    | 'create-react-app'
    | 'vue-cli'
    | 'preact-cli'
    | 'create-react-app-typescript'
) {
  if (!theme) {
    return react;
  }

  switch (theme) {
    case react.name:
      return react;
    case vue.name:
      return vue;
    case preact.name:
      return preact;
    case reactTs.name:
      return reactTs;
    case svelte.name:
      return svelte;
    default:
      return react;
  }
}
