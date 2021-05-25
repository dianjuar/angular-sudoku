const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    important: true,
    prefix: '',
    mode: 'jit',
    purge: {
      enabled: true,
      content: [
        './apps/**/*.{html,ts,css,scss,sass,less,styl}',
        './libs/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {
      },
    },
    plugins: [],
    corePlugins: {
      outline: false,
    }
};
