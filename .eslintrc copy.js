module.exports = {
    // "extends": "standard"
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {},
    "extends": [
        "plugin:vue/recommended",
        // "eslint:recommended",
        "prettier"
    ],
    "parser": "babel-eslint", // 必须指定解析器 "Parsing error: ‘import’ and ‘export’ may appear only with sourceType: module"
    // "parserOptions": { "ecmaVersion": 2018 },
    "rules": {
        "no-undef": "error",
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "error",
            {
                "allow": [
                    "warn",
                    "error",
                    "log",
                    "dev"
                ]
            }
        ]
    }
};