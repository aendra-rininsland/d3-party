/**
 * @file
 * Test fixtures for d3-party
 */

import party from "../../index.js";
import d3 from "d3";

d3.selectAll("#chart rect").call(party(d3.select("svg")));
