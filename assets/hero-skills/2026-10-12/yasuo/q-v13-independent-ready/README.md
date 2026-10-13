# Independent Q3 readiness VFX study

New skill-generated animation, using the existing wind-only still design as the first frame. No EQ artwork and no newly generated character animation.

- Transparent 143×96, eight 100 ms frames, 800 ms loop; alpha and all frame bounds checked, no edge contacts.
- Existing selected eight-direction walk/idle atlases remain unchanged.
- Independent body and wind clocks; motion/facing changes never reset the wind clock. Body-only pause leaves the wind running.
- Wind position follows the character ground anchor. Rear/front display regions sandwich the character; these are runtime draw passes, not separate generated art files.
- Body patrol and idle controls demonstrate positional following. Hiding wind has no effect on body animation.
- Browser-checked north idle and southeast walking, and body-only pause while the wind frame advances. Production build passed.
- Standalone preview only; main game and Q3 mechanics unchanged.
