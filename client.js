/**
 * Client half: mirrors the built-in turn navigation rail into the left gutter.
 *
 * The rail itself (ticks, hover preview, click-to-jump, paging history in for
 * turns that are not loaded yet) stays the shipped Chat implementation; only
 * its side changes. Everything here is a stylesheet rendered as a React
 * element, so unloading the plugin removes it again.
 */
window.__ModuleLoader__.load({
  id: '@liubaibuliuyan/dsh-turn-rail-left',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /*
     * The rail's own class names are CSS-module hashes that change between
     * builds, so the rail is identified structurally instead: the named `nav`
     * inside the conversation that holds one `data-index` button per turn.
     * Every selector below runs through this one chain, so a structural change
     * in DSH drops the whole restyle at once and the rail stays on the right
     * rather than moving half-way.
     */
    const RAIL = '[data-conversation-content] nav[aria-label]:has(button[data-index])';

    /*
     * The shipped rail sits 12px inside the scrollport's content edge, which on
     * the right is widened further by the vertical scrollbar; the left edge has
     * no scrollbar, so the same 12px would read as part of the sidebar. Change
     * --turn-rail-left-inset to tune the optical gap.
     */
    const styles = `
${RAIL} {
  --turn-rail-left-inset: 20px;
  right: auto;
  left: var(--turn-rail-left-inset);
}

/* Ticks grow from the outer edge of the rail, as they do on the right. */
${RAIL} button[data-index]::before {
  right: auto;
  left: 0;
  transform-origin: left center;
}

/* Keyboard focus ring hugs the outer edge too. */
${RAIL} button[data-index]:focus-visible::after {
  inset: 0 auto 0 0;
}

/* Hover preview opens towards the transcript, as it does on the right. */
${RAIL} [role="tooltip"] {
  right: auto;
  left: calc(100% + 10px);
}

@media (prefers-reduced-motion: no-preference) {
  /* Enter from the gutter, so the card unfolds from the side it lives on. */
  ${RAIL} [role="tooltip"] {
    animation-name: dsh-turn-rail-left-enter;
  }
}

@keyframes dsh-turn-rail-left-enter {
  from { opacity: 0; transform: translateX(-4px); }
  to { opacity: 1; transform: translateX(0); }
}
`;

    function LeftRailStyles() {
      return h('style', { 'data-plugin': 'dsh-turn-rail-left' }, styles);
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'dsh-turn-rail-left',
          order: 100,
        }, LeftRailStyles));
      },
    };
  },
});
