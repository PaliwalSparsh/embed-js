const utils = require('../utils.es6');

if(build.HIGHLIGHTCODE) var Highlight = require('./highlight.es6');
if(build.IDEONE)        var Ideone    = require('./ideone.es6');
if(build.PLUNKER)       var Plunker   = require('./plunker.es6');
if(build.JSBIN)         var JsBin     = require('./jsbin.es6');
if(build.CODEPEN)       var CodePen   = require('./codepen.es6');
if(build.JSFIDDLE)      var JsFiddle  = require('./jsfiddle.es6');
if(build.GIST)          var Gist      = require('./gist.es6');

class Code {
	constructor(input, output, options, embeds) {
		this.input = input;
		this.output = output;
		this.options = options;
		this.embeds = embeds;
	}

	process() {
		try {
			let output = this.output;
			let embeds = this.embeds;
			let options = this.options;
			output = options.highlightCode && build.HIGHLIGHTCODE ? (new Highlight(output, options).process()) : output;
			embeds = utils.ifEmbed(options, 'ideone') && build.IDEONE ? (new Ideone(this.input, options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(options, 'plunker') && build.PLUNKER ? (new Plunker(this.input, options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(options, 'jsbin') && build.JSBIN ? (new JsBin(this.input, options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(options, 'codepen') && build.CODEPEN ? (new CodePen(this.input, options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(options, 'jsfiddle') && build.JSFIDDLE ? (new JsFiddle(this.input, options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(options, 'gist') && build.GIST ? (new Gist(this.input, options,embeds).process()) : embeds;

			return [output, embeds];
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Code;
