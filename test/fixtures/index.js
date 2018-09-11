/**
 * @file
 * Test fixtures for d3-party
 */

import d3 from 'd3';
import party from '../..';

d3.selectAll('#chart rect').call(party(d3.select('svg')));
