/**
 * @file
 * Mo'effin' D3 Party!
 */

export const partyParrotColors = [
  "#FD8E8D",
  "#FDD58E",
  "#8CFD8E",
  "#8CFFFE",
  "#8DB6FB",
  "#D690FC",
  "#FD90FD",
  "#FD6EF4",
  "#FC6FB6",
  "#FD6A6B",
  "#FD8E8D"
];

/**
 * d3 party constructor
 * @param  {d3Selection} svgSelection Selection containing a SVG parent node
 */
export default function(
  svgSelection,
  config = {
    speed: 500,
    direction: "normal"
  }
) {
  if (!svgSelection) throw new Error("Please supply a selection");

  const root = findRootSvg(svgSelection.node());
  const stops = root.select("defs > #party").size()
    ? root.select("defs > #party")
    : root.call(createGradient);

  let { speed, direction } = config;
  let start = false;

  const party = (selection, opts = { mode: "fill" }) => {
    selection.attr(opts.mode, `url(#party)`);
    window.requestAnimationFrame(party.animate);
  };

  party.animate = ts => {
    if (!start) start = ts;
    const delta = ts - start;
    if (delta >= 100) {
      stops.attr("offset", (d, i, a) => `${(i / a.length) * delta}%`);
    } else {
      start = ts;
    }

    window.requestAnimationFrame(party.animate);
  };

  return party;
}

function findRootSvg(node) {
  return node.tagName === "SVG" ? node : findRootSvg(node.parentElement);
}

function createGradient(selection) {
  const defs = selection.select("defs").size()
    ? svg.select("defs")
    : svg.append("defs");

  return defs
    .append("linearGradient")
    .selectAll("stop")
    .data(partyParrotColors)
    .enter()
    .append("stop")
    .attr("offset", (d, i, a) => `${(i / a.length) * 1}%`)
    .attr("style", d => `stop-color: ${d}`);
}
