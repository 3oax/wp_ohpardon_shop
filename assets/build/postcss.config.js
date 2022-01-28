const cssnanoConfig = {
	preset: ['default', { discardComments: { removeAll: true } }]
};

const tailwindcss = require('tailwindcss');

module.exports = ( { file, options } ) => ( {
	parser: options.enabled.optimize ? 'postcss-safe-parser' : undefined,
	plugins: {
		"cssnano": options.enabled.optimize ? cssnanoConfig : false,	
		"postcss-css-variables": false,
		"tailwindcss": { config: __dirname + "/tailwind.config.js" },
		"autoprefixer": {},
	},
} );
