import extend from 'just-extend'
import {insert} from '../utils/dom'

export default (pluginOptions) => {
	if(!pluginOptions.regex) {
		throw new ReferenceError('regex is not passed in options.')
	}
	if (!pluginOptions.template) {
		throw new ReferenceError('template is not passed in options.')
	}

	const {regex, template} = pluginOptions
	return {
		transform(options) {
			return Promise.resolve(
				extend({}, options, insert(regex, template, options, pluginOptions))
			)
		}
	}
}
