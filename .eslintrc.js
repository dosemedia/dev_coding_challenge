module.exports = {
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    rules: {
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'vue/no-dupe-keys': 0,
        'no-console': 0,
    },
    globals: {
        'firebase': true,
        'db': true,
    }
};
