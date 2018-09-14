module.exports = {
    "extends": [
        "standard",
        "plugin:react/recommended",
    ],
    "env": { "jest": true },
    "parser": "babel-eslint",
    "plugins": [ "flowtype" ],
    "rules": {
        "flowtype/define-flow-type": 1,
        "flowtype/use-flow-type": 1,
        "react/display-name": [0],
        "react/prop-types": [0],
        "no-useless-constructor": [0],
        "comma-dangle": 0,
        "object-curly-spacing": ["error", "always"]
    },
    "globals": {
        "fetch": false,
        "alert": false,
        "__DEV__" : false
    },
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        }
    },
};
