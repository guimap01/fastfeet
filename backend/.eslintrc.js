module.exports = {
    env: {
        "es6": true,
        "node": true
    },
    extends: [
        "airbnb-base",
        "prettier"
    ],
    plugins:["prettier"],
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    rules: {
        "prettier/prettier":"error",
        "class-methods-use-this":0,
        "no-param-reassign":0,
        "camelcase":0,
        "no-unused-vars":["error",{"argsIgnorePattern":"next"}],

    }
};
