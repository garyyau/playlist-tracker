var dest = './';
var src = './src';


module.exports = {
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
