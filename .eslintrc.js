// http://eslint.org/docs/user-guide/configuring
// eslint:defaults = https://github.com/eslint/eslint/blob/master/conf/eslint.json
// Severity should be one of the following: 0 = off, 1 = warning, 2 = error
module.exports = {
	'extends': 'defaults',
	'rules': {
		'no-unused-vars': 0,
		'no-undef': 0
	},
	'env': {
		'browser': true,
		'amd': true,
		'node': true
	},
	'globals': {
		'$': true,
		'Hammer': true,
		'jails': true,
		'require': true,
		'define': true,
		'riot': true
	}
};
