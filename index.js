/**
 * @file
 * Mo'effin' D3 Party!
 */

import d3 from 'd3';

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
 * D3 party constructor
 * @param  {d3Selection} svgSelection Selection containing a SVG parent node
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

function findRootSvg(node) {
	const el = node.toString() === '[object SVGSVGElement]' ? node : node.node();
	return el.tagName.toLowerCase() === 'svg'
		? el
		: findRootSvg(node.parentElement);
}

const generateRamp = (color, idx) =>
	[
		...partyParrotColors.slice(idx),
		...partyParrotColors.slice(0, idx + 1)
	].join('; ');

function createGradient(selection, speed) {
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

	stops
		.append('animate')
		.attr('attributeName', 'stop-color')
		.attr('values', generateRamp)
		.attr('dur', `${speed / 1000}s`)
		.attr('repeatCount', 'indefinite');
}
