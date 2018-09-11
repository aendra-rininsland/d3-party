/**
 * @file
 * Mo'effin' D3 Party!
 */

import d3 from 'd3';

/**
 * The classic Cult of The Party Parrot colour ramp
 * @type {string[]}
 */
export const partyParrotColors = [
	'#FD8E8D',
	'#FDD58E',
	'#8CFD8E',
	'#8CFFFE',
	'#8DB6FB',
	'#D690FC',
	'#FD90FD',
	'#FD6EF4',
	'#FC6FB6',
	'#FD6A6B'
];

/**
 * Recursively traverses the given node or selection to find the root SVG element.
 * @param  {HTMLElement|D3Selection} node Target node or selection
 * @return {HTMLElement}     Root SVG element.
 */
export const findRootSvg = node => {
	const el = node.toString().includes('SVGElement') ? node : node.node();
	return el.tagName.toLowerCase() === 'svg'
		? el
		: findRootSvg(node.parentElement);
};

/**
 * Generates a colour loop from an array of colours, offset by the initial value.
 * N.b., this is meant to be supplied to a D3 accessor or Array.prototype callback.
 * @param  {string} color                            Color string
 * @param  {number} idx                              Index of current color
 * @param  {string[]} [colorList=partyParrotColors]  Array of values, defaulting to Parrot
 * @return {string}                                  Semicolon-separated cyclical value string
 */
export const generateRamp = (color, idx, colorList = partyParrotColors) =>
	[...colorList.slice(idx), ...colorList.slice(0, idx + 1)].join('; ');

/**
 * Creates a `defs` object containing an animated gradient.
 * @param  {D3Seletion} selection Selection to traverse to root SVG node
 * @param  {number} speed Animation cycle speed in milliseconds
 * @return {object} Object containing the `stop` and `animation` elements.
 */
export const createGradient = (selection, speed) => {
	const defs = selection.select('defs').size()
		? selection.select('defs')
		: selection.append('defs');

	const gradient = defs.append('linearGradient').attr('id', 'party');

	const stops = gradient
		.selectAll('stop')
		.data(partyParrotColors)
		.enter()
		.append('stop')
		.attr('offset', (d, i, a) => `${(i / (a.length - 1)) * 100}%`)
		.attr('style', d => `stop-color: ${d}`);

	const animates = stops
		.append('animate')
		.attr('attributeName', 'stop-color')
		.attr('values', generateRamp)
		.attr('dur', `${speed / 1000}s`)
		.attr('repeatCount', 'indefinite');

	return {stops, animates};
};

/**
 * D3 party constructor
 * @param  {D3Selection} svgSelection Selection containing a SVG parent node
 * @param {object} config Configuration object
 * @returns {function} party
 */
export default function(
	svgSelection,
	config = {
		speed: 500
	}
) {
	if (!svgSelection) throw new Error('Please supply a selection');

	const root = d3.select(findRootSvg(svgSelection.node()));
	const {speed} = config;
	let stops = root.select('defs > #party').size()
		? root.select('defs > #party > stop')
		: createGradient(root, speed);

	const party = (selection, opts = {mode: 'fill'}) => {
		selection.attr(opts.mode, `url(#party)`);
	};

	party.stops = newStops => {
		if (newStops !== undefined) {
			stops = newStops;
			return party;
		}

		return stops;
	};

	return party;
}
