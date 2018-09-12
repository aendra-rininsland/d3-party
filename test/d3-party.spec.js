/**
 * @file
 * Basic spec for d3-party
 */

import * as party from '../lib';

test('exports as expected', () => {
	expect(party.partyParrotColors).toBeDefined();
	expect(party.findRootSvg).toBeDefined();
	expect(party.generateRamp).toBeDefined();
	expect(party.createGradient).toBeDefined();
	expect(party.default).toBeDefined();
});

test('#generateColorRamp', () => {
	const testArray = [1, 2, 3, 4, 5, 6];
	const output = party.generateRamp(3, testArray);

	expect(output).toEqual('4; 5; 6; 1; 2; 3; 4');
});
