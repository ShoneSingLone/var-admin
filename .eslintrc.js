module.exports = {
    // extends: ["plugin:vue/essential", "@vue/prettier"],
    extends: ['plugin:vue/recommended'],
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es6": true
    },
    "globals": {
        "TEMPLATE_PLACEHOLDER": true,
        "document": true,
        "window": true
    },
    "rules": {
        "no-undef": "error",
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-console": ["error", {
            "allow": ["warn", "error", "log", "dev"]
        }]
    }
};