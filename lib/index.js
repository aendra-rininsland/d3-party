/**
 * @file
 * Mo'effin' D3 Party!
 */

import {select} from 'd3-selection';

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
	const el = /SVG.*Element/.test(node.toString()) ? node : node.node();
	return el.tagName.toLowerCase() === 'svg'
		? el
		: findRootSvg(node.parentElement);
};

/**
 * Generates a colour loop from an array of colours, offset by the initial value.
 * @param  {number} idx                              Index of current color
 * @param  {string[]} colourRamp                    Array of colours to loop through
 * @return {string}                                  Semicolon-separated cyclical value string
 */
export const generateRamp = (idx, colourRamp = partyParrotColors) =>
	[...colourRamp.slice(idx), ...colourRamp.slice(0, idx + 1)].join('; ');

/**
 * Creates a `defs` object containing an animated gradient.
 * @param  {D3Seletion} selection Selection to traverse to root SVG node
 * @param  {object} config Object containing speeds and colors
 * @return {object} Object containing the `stop` and `animation` elements.
 */
export const createGradient = (selection, {speed, colors}) => {
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
		.attr('values', (d, i) => generateRamp(i, colors))
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
		speed: 500,
		gradient: partyParrotColors
	}
) {
	if (!svgSelection) throw new Error('Please supply a selection');

	const root = select(findRootSvg(svgSelection.node()));
	let {speed, gradient} = config;
	let stops = root.select('defs > #party').size()
		? root.select('defs > #party > stop')
		: createGradient(root, {speed, gradient});

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

	party.gradient = newColors => {
		if (newColors !== undefined) {
			gradient = newColors;
			return party;
		}

		return gradient;
	};

	party.speed = newSpeed => {
		if (newSpeed !== undefined) {
			speed = newSpeed;
			return party;
		}

		return speed;
	};

	return party;
}
