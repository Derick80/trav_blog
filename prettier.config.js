// prettier.config.js
module.exports = {
    tabwidth: 4,
    semi: false,
    singleQuote: true,
    bracketSpacing: true,
    trailingComma: 'none',
    jsxSingleQuote:true,
    tailwindConfig: './tailwind.config.ts',
    tailwindFunctions: [ 'clsx', 'cn' ],
    plugins: [ 'prettier-plugin-tailwindcss' ],
}