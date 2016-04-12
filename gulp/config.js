var dest = './deploy';
var src = './src';


module.exports = {
	jade: {
		src: [
			`${src}/jade/**/*.jade`,
		],
		dest: `${dest}/`,
	},
	sass: {
		src: [
			`${src}/scss/**/*.scss`,
		],
		outputName: 'style.css',
		dest: `${dest}/css/`,
	},
	js: {
		main: `${src}/js/app.js`,
		outputName: 'bundle.js',
		dest: `${dest}/js/`,
	},
	jslibs: {
		outputName: 'libs.js',
		dest: `${dest}/js/`,
	},
};
