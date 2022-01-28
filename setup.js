const replace = require( 'replace-in-file' );

/**
 * Create necessary combinations of given theme name.
 * @param {array} names Theme name and slug from the prompt.
 * @returns {string} names Prepared theme names set.
 */
function prepareThemeName( names ) {
	names.underscoreLc = names.theme_slug.toLowerCase().replace( /[- \\/]/g, '_' );
	names.underscoreUc = names.theme_name.replace( /[- \\/]/g, '_' );

	return names;
}

/**
 * Replace strings in theme files for new theme name.
 * @param {array} names Prepared combinations of theme name.
 */
function renameTheme( names ) {
	const options = {
		files: [
			'./**/*.php',
			'./assets/build/*.json',
			'./*.css',
			'./*.json'
		],
		from: [
			/'oax-ohpardon'/g,
			/oax_ohpardon_/g,
			/Text Domain: oax-ohpardon/g,
			/package oax_ohpardon/g,
			/ Oax OhPardon/g,
			/oax-ohpardon-/g,
			/oax-ohpardon/g
		],
		to: [
			`'${names.theme_slug}'`,
			`${names.underscoreLc}_`,
			`Text Domain: ${names.theme_slug}`,
			`package ${names.underscoreUc}`,
			` ${names.theme_name}`,
			`${names.theme_slug}-`,
			names.theme_slug,
			names.theme_url
		],
	};
	replace( options );
}

/*
 * Setup CLI prompt for theme name and theme slug input.
 */
const inquirer = require( 'inquirer' ),
	installType = [
		{
			type: 'input',
			name: 'theme_name',
			message: 'What is the theme name?',
			default() {
				return 'My Amazing Theme';
			}
		},
		{
			type: 'input',
			name: 'theme_slug',
			message: 'What is the theme slug?',
			default( answers ) {
				return answers.theme_name.toLowerCase().replace( /[ _\\/]/g, '-' );
			},
			validate( value ) {
				if ( value.match( /^[-a-z0-9]*$/ ) ) {
					return true;
				}

				return 'Theme slug should contain only lowercase letters and dashes';
			}
		}
	];

inquirer.prompt( installType ).then( ( answers ) => {
	const themeName = prepareThemeName( answers );
	renameTheme( themeName );
} );
