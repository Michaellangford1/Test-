import type { ProfileData } from '../types/schema';
import type { GuideRecord, ReferenceRecord } from './db';

// Raw guide content (without book-keeping fields, which are stamped on insert).
export type SeedGuide = Omit<GuideRecord, 'source' | 'createdAt' | 'updatedAt'>;
export type SeedReference = Omit<ReferenceRecord, 'photoIds' | 'updatedAt'>;

export const SEED_PROFILE: ProfileData = {
  areaAndClimate:
    'Longlevens, Gloucester, UK. Frost-prone winters; plan for pipe insulation and autumn gutter clearing.',
  property: {
    type: '[TODO: e.g. 1930s semi-detached, cavity walls]',
    recentWorks: [
      'Load-bearing wall removed and replaced with steel beams',
      'Garage converted to habitable space',
      'Full kitchen replacement (in progress)',
      'Bath waste pipework currently exposed during the remodel — blockage investigation in progress',
    ],
  },
  utilities: {
    waterStopcock: '[TODO: location + photo in Reference]',
    electricity:
      'New consumer unit with per-circuit RCBOs and surge protection (SPD). 80A supply fuse confirmed with the DNO. Circuit labels: [TODO]',
    gas: '[TODO: emergency control valve location, or "no mains gas"]',
    heating:
      '[TODO: boiler make/model + filling loop location]. Wet underfloor heating loops considered/laid for the kitchen-diner but NOT commissioned — do not fill or pressurise. [TODO: confirm status]',
  },
  knownIssues: [
    'Stepped crack on the rear external wall — under an agreed monitoring plan (fixed-position photos + width log)',
  ],
  appliances: [
    {
      name: 'EcoAir Apollo 10 MK2 portable air conditioner',
      notes:
        'R290 (propane) refrigerant — no DIY refrigerant work; keep upright; ventilate the room if the circuit is ever damaged.',
    },
  ],
  decorAndFinishes: {
    paintCodes: '[TODO: room by room]',
    kitchenFloor: '[TODO: final choice — shortlist was waterproof cork / LVT / cushioned vinyl]',
  },
  outdoors: 'Greenhouse, pallet-collar raised beds, container growing areas, outdoor tap.',
  household:
    'Young children at home — favour child-safe methods, anchor heavy furniture, cure times matter before rooms are back in use, store chemicals locked away.',
  freeformNotes: '',
};

export const SEED_REFERENCE: SeedReference[] = [
  {
    id: 'water-stopcock',
    title: 'Water stopcock & isolation valves',
    category: 'Utilities',
    body: '[TODO: add location + photo]',
    tags: ['water', 'stopcock', 'emergency'],
  },
  {
    id: 'consumer-unit-map',
    title: 'Consumer unit circuit map',
    category: 'Utilities',
    body: '[TODO: photograph the unit and label each RCBO]',
    tags: ['electrics', 'consumer unit', 'circuits'],
  },
  {
    id: 'pipe-cable-runs',
    title: 'Pipe & cable runs (renovation record)',
    category: 'Structure & Monitoring',
    body: "Photograph all exposed services before they're boarded over: bath waste run, new kitchen supplies, steel-beam area, any UFH loops.",
    tags: ['renovation', 'pipes', 'cables', 'record'],
  },
  {
    id: 'boiler-heating-details',
    title: 'Boiler & heating details',
    category: 'Utilities',
    body: '[TODO: make, model, filling loop photo, last service date]',
    tags: ['boiler', 'heating', 'service'],
  },
  {
    id: 'paint-codes',
    title: 'Paint codes & finishes',
    category: 'Decor & Finishes',
    body: '[TODO: room by room]',
    tags: ['paint', 'decor', 'finishes'],
  },
  {
    id: 'appliance-models',
    title: 'Appliance models & manuals',
    category: 'Appliances & Manuals',
    body: '## EcoAir Apollo 10 MK2 portable air conditioner\n\n- Refrigerant: **R290 (propane)** — no DIY refrigerant work. Keep the unit upright; ventilate the room if the circuit is ever damaged.\n- [TODO: serial number, purchase date, manual PDF location]\n\n## Other appliances\n\n[TODO: add make, model and serial for each — kitchen appliances once the remodel is finished]',
    tags: ['appliances', 'manuals', 'ecoair'],
  },
];

export const SEED_GUIDES: SeedGuide[] = [
  {
    id: 'emergency-shutoffs',
    title: 'Turn off water, electricity and gas in an emergency',
    category: 'Safety & Monitoring',
    difficulty: 'Easy',
    timeEstimate: '5–10 min to learn; seconds in an emergency',
    tools: ['Torch (kept near the stopcock)', 'Phone'],
    materials: [],
    safety: [
      'If you smell gas: do not touch any electrical switches, open windows, get everyone out, then call the National Gas Emergency line on 0800 111 999 from outside.',
      'Water and electricity together are dangerous — if water is near the consumer unit, switch off the main electricity before touching anything wet.',
      'Stop and call a professional if you cannot locate or operate a shut-off, or if a leak continues after isolating.',
    ],
    houseNotes:
      'Water stopcock: [TODO: location + photo — see the "Water stopcock" reference item]. Consumer unit: new unit with per-circuit RCBOs and an isolating main switch — see the "Consumer unit circuit map" reference. Gas: [TODO: emergency control valve location, or confirm "no mains gas"].',
    steps: [
      {
        text: 'Learn these three shut-offs before you ever need them, and make sure another adult in the house knows them too.',
        note: 'Practising once calmly is worth more than reading this in a panic.',
        photoIds: [],
      },
      {
        text: 'Water: find the internal stopcock (often under the kitchen sink, in a downstairs cupboard, or near where the main enters the house).',
        note: 'Add its exact location and a photo to the Reference section so anyone can find it fast.',
        photoIds: [],
      },
      {
        text: 'Turn the stopcock clockwise (righty-tighty) to close it. If it is stiff, do not force it — see the notes on seized stopcocks.',
        note: 'A stopcock that has not been turned in years can seize; exercising it gently twice a year keeps it working.',
        photoIds: [],
      },
      {
        text: 'Open a cold tap to confirm the water slows to a stop — this proves you closed the right valve.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Locate any local isolation valves (small screwdriver-slot valves on pipes to the toilet, taps and washing machine) so you can isolate one fitting without killing the whole house.',
        note: 'A quarter-turn with a flat screwdriver closes most of these.',
        photoIds: [],
      },
      {
        text: 'Electricity: go to the consumer unit and identify the big main switch (usually a larger switch, often at one end).',
        note: 'Your unit has per-circuit RCBOs, so you can also switch off just the affected circuit.',
        photoIds: [],
      },
      {
        text: 'Flip the main switch to OFF to cut all power; or flip a single circuit RCBO if you only need to isolate one area.',
        note: 'Keep a torch near the unit — cutting power kills the lights too.',
        photoIds: [],
      },
      {
        text: 'Gas: if you have mains gas, find the emergency control valve at the meter and turn the lever a quarter-turn so it sits across (at 90° to) the pipe — that is off.',
        note: 'If the profile says "no mains gas", this step is not applicable — mark it done and move on.',
        photoIds: [],
      },
      {
        text: 'After any gas isolation, do not turn it back on yourself if you suspect a leak — wait for a Gas Safe registered engineer.',
        note: 'Relighting appliances after a gas emergency is not a DIY job.',
        photoIds: [],
      },
      {
        text: 'Save the emergency numbers in your phone now: 999 for fire, 0800 111 999 for gas, and your water supplier and electricity distributor (DNO) numbers.',
        note: '',
        photoIds: [],
      },
    ],
    tags: ['emergency', 'water', 'electricity', 'gas', 'stopcock', 'safety'],
  },
  {
    id: 'consumer-unit-basics',
    title: 'What tripped? Using the new consumer unit',
    category: 'Electrics',
    difficulty: 'Easy',
    timeEstimate: '10–20 min',
    tools: ['Torch', 'Phone camera (to log which circuit tripped)'],
    materials: [],
    safety: [
      'Only reset a tripped device once. If it trips again immediately, leave it off and investigate — repeated tripping means a fault.',
      'Never poke inside the consumer unit or remove its cover — the terminals are live even with switches off.',
      'Stop and call a Part P-registered electrician if a circuit keeps tripping, if there is any burning smell or scorching, or if the main switch itself trips.',
    ],
    houseNotes:
      'This is a modern unit with per-circuit RCBOs (each circuit has its own combined breaker + RCD) plus a surge protection device (SPD). The property is on an 80A supply fuse confirmed with the DNO, so the whole installation has generous headroom. Circuit labels: [TODO: label each RCBO — see the "Consumer unit circuit map" reference item].',
    steps: [
      {
        text: 'Open the consumer unit cover flap (do not remove any screws) so you can see the row of switches.',
        note: 'RCBOs are the slim switches in a row; the SPD is a separate module, often at one end.',
        photoIds: [],
      },
      {
        text: 'Find the switch that has flipped to the OFF (or middle) position — that is the circuit that tripped.',
        note: 'With per-circuit RCBOs, only the faulty circuit drops out, so the rest of the house stays on.',
        photoIds: [],
      },
      {
        text: 'Photograph the unit showing which switch tripped, then note what you were doing at the time.',
        note: 'Pattern-spotting (e.g. "always when the kettle and toaster run together") helps diagnose the cause.',
        photoIds: [],
      },
      {
        text: 'Unplug or switch off whatever appliance was in use on that circuit before resetting.',
        note: 'A faulty appliance is the most common cause of a trip.',
        photoIds: [],
      },
      {
        text: 'Push the tripped switch firmly back to ON. Some need pushing fully OFF first, then ON.',
        note: '',
        photoIds: [],
      },
      {
        text: 'If it holds, reconnect appliances one at a time to find the culprit. If one makes it trip again, that appliance is faulty.',
        note: 'Stop using a faulty appliance until it is repaired or replaced.',
        photoIds: [],
      },
      {
        text: 'If the switch trips again the instant you reset it with nothing plugged in, leave it OFF — the fault is in the fixed wiring.',
        note: 'This is where you stop and call an electrician.',
        photoIds: [],
      },
      {
        text: 'Understand the SPD: it silently protects against surges (e.g. nearby lightning). If its indicator window shows red/failed, note it for your electrician.',
        note: '[TODO: record what a healthy vs failed SPD indicator looks like on this specific unit.]',
        photoIds: [],
      },
      {
        text: 'Do the labelling exercise: with a helper, switch off one RCBO at a time and note which lights/sockets go dead, then write clear labels.',
        note: 'Record the finished map in the "Consumer unit circuit map" reference item.',
        photoIds: [],
      },
      {
        text: 'Part P note: this guide is information-only. Any new circuits, alterations to the consumer unit, or work in special locations (bathrooms) must be done by a Part P-compliant electrician and certified.',
        note: '',
        photoIds: [],
      },
    ],
    tags: ['electrics', 'consumer unit', 'rcbo', 'tripped', 'fuse box'],
  },
  {
    id: 'bleed-radiators',
    title: 'Bleed radiators and repressurise the boiler',
    category: 'Heating & Cooling',
    difficulty: 'Easy',
    timeEstimate: '20–30 min',
    tools: ['Radiator bleed key', 'Cloth', 'Small bowl'],
    materials: [],
    safety: [
      'Radiator water may be very hot — do this with the heating off and cooled.',
      'Do NOT fill or pressurise any underfloor heating — the kitchen-diner UFH loops are laid but NOT commissioned.',
      'Stop and call a heating engineer if the boiler pressure will not hold after repressurising, or if you cannot find the filling loop.',
    ],
    houseNotes:
      'Boiler: [TODO: make/model — record in the "Boiler & heating details" reference]. Filling loop: [TODO: location — usually a silver braided hose with a valve under or near the boiler]. IMPORTANT: wet UFH loops for the kitchen-diner are laid but not commissioned — do not attempt to fill or pressurise them. [TODO: confirm UFH status before any heating work.]',
    steps: [
      {
        text: 'Turn the heating off and let the radiators cool fully — at least an hour.',
        note: 'Bleeding hot radiators risks scalding and gives a false reading.',
        photoIds: [],
      },
      {
        text: 'Feel each radiator top-to-bottom. Cold at the top with a warm bottom means trapped air that needs bleeding.',
        note: 'Cold at the bottom instead usually means sludge, not air — a different job.',
        photoIds: [],
      },
      {
        text: 'Starting with the radiator furthest from the boiler (and downstairs before upstairs), fit the bleed key to the square valve at the top corner.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Hold a cloth and bowl under the valve, then turn the key slowly anticlockwise a quarter to half turn until you hear a hiss of escaping air.',
        note: 'Only crack it open — a small turn is enough.',
        photoIds: [],
      },
      {
        text: 'Wait until the hissing stops and a steady dribble of water appears, then close the valve firmly (clockwise). Do not over-tighten.',
        note: 'Water = all the air is out.',
        photoIds: [],
      },
      {
        text: 'Wipe up any drips and move to the next radiator, working back towards the boiler.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Check the boiler pressure gauge. Cold system pressure should sit around 1.0–1.5 bar.',
        note: '[TODO: confirm the normal cold pressure marked/recommended for this specific boiler.]',
        photoIds: [],
      },
      {
        text: 'If pressure is low, locate the filling loop (silver braided hose) and open both its valves slowly to let mains water in.',
        note: 'Do this gently — watch the gauge the whole time.',
        photoIds: [],
      },
      {
        text: 'Close both filling-loop valves as soon as the gauge reaches about 1.2 bar.',
        note: 'Overfilling above ~2 bar can trip the pressure relief — let some out by briefly bleeding a radiator if you overshoot.',
        photoIds: [],
      },
      {
        text: 'Turn the heating back on, let it warm up, then feel the radiators again for even heat top-to-bottom.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Recheck the pressure once hot (it rises a little) and again when next cold. A pressure that keeps dropping points to a leak — call an engineer.',
        note: '',
        photoIds: [],
      },
    ],
    tags: ['radiator', 'boiler', 'pressure', 'heating', 'bleed', 'ufh'],
  },
  {
    id: 'unblock-bath-waste',
    title: 'Unblock the bath waste',
    category: 'Plumbing',
    difficulty: 'Moderate',
    timeEstimate: '30–60 min',
    tools: [
      'Rubber gloves',
      'Bucket or bowl',
      'Cup plunger',
      'Old towels',
      'Torch',
      'Adjustable spanner or grips',
      'Drain rods or a plumber’s snake (optional)',
    ],
    materials: ['Bicarbonate of soda', 'White vinegar', 'Fresh trap washers (in case)'],
    safety: [
      'Avoid caustic chemical drain cleaners on this job — the waste is partly dismantled/exposed and the fumes and splashback are hazardous, especially with children around.',
      'Wear gloves; standing bath water carries bacteria.',
      'Stop and call a plumber if the blockage is beyond the trap, if a joint leaks after refitting, or if waste backs up from multiple fittings (a shared drain problem).',
    ],
    houseNotes:
      'The bath waste pipework is currently exposed during the remodel — a real advantage: you can inspect every joint and the pipe falls directly. Check the "Pipe & cable runs (renovation record)" reference for photos, and photograph the run before it is boarded back over. [TODO: note the trap type and pipe diameter once seen.]',
    steps: [
      {
        text: 'Clear the bath and lift out any hair catcher or plug grate, then remove visible hair and gunk from the outlet.',
        note: 'Most bath blockages are hair and soap right at the top.',
        photoIds: [],
      },
      {
        text: 'Bail or let out standing water so you can work, keeping a bucket handy.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Try a cup plunger first: smear a little petroleum jelly on the rim, cover the overflow with a wet cloth, and plunge firmly a dozen times.',
        note: 'Blocking the overflow makes the plunger actually pull on the blockage.',
        photoIds: [],
      },
      {
        text: 'If that fails, use the exposed pipework to your advantage: place a bowl under the trap and hand-loosen the trap’s union nuts.',
        note: 'The trap is the U/bottle-shaped section that holds standing water.',
        photoIds: [],
      },
      {
        text: 'Remove the trap, tip its contents into the bucket, and clean out the hair and sludge inside.',
        note: 'Check the seals/washers for damage while it is apart.',
        photoIds: [],
      },
      {
        text: 'While the trap is off, shine a torch along the exposed waste run and check the falls — the pipe should slope gently and continuously towards the drain.',
        note: 'A flat or back-falling section causes repeat blockages; note it for the remodel.',
        photoIds: [],
      },
      {
        text: 'If the blockage is further along, feed a plumber’s snake or drain rods gently into the pipe and work it through — do not force sharp bends.',
        note: 'Rod towards the drain, turning steadily.',
        photoIds: [],
      },
      {
        text: 'Refit the trap: seat the washers correctly and hand-tighten the union nuts, then nip up just a little more with grips — do not overtighten plastic threads.',
        note: 'Overtightening cracks plastic nuts and causes leaks.',
        photoIds: [],
      },
      {
        text: 'For lingering smells or slow drainage, pour bicarbonate then vinegar down the outlet, wait 15 minutes, then flush with a kettle of hot (not boiling) water.',
        note: 'A gentle, child-safe alternative to caustic cleaners.',
        photoIds: [],
      },
      {
        text: 'Leak-check: fill the bath a few inches, then release it in one go while watching every joint on the exposed run with the torch.',
        note: 'A full bath’s weight of water is the real test, not a trickle.',
        photoIds: [],
      },
      {
        text: 'Dry the pipes and check again after ten minutes for any weeping joints before the pipework is boarded back in.',
        note: 'Photograph the finished, dry run for the renovation record.',
        photoIds: [],
      },
    ],
    tags: ['plumbing', 'bath', 'waste', 'blockage', 'trap', 'drain'],
  },
  {
    id: 'fix-running-toilet',
    title: 'Fix a running or constantly filling toilet',
    category: 'Plumbing',
    difficulty: 'Moderate',
    timeEstimate: '30–90 min',
    tools: ['Rubber gloves', 'Adjustable spanner', 'Flat screwdriver', 'Old towels', 'Bowl'],
    materials: [
      'Replacement fill valve (if faulty)',
      'Replacement flush valve / flapper seal (if faulty)',
      'Universal washers',
    ],
    safety: [
      'Turn off the water to the toilet before opening the cistern to avoid a flood.',
      'Cistern water is clean but the parts may be scaled — wear gloves.',
      'Stop and call a plumber if the isolation valve will not close, if the cistern is cracked, or if water leaks from the pan or supply after the repair.',
    ],
    houseNotes:
      'Use the toilet’s isolation valve (a small screwdriver-slot valve on the supply pipe behind or below the cistern) so you do not have to shut off the whole house. [TODO: confirm the cistern type — close-coupled vs concealed — and the fill/flush valve makes.]',
    steps: [
      {
        text: 'Listen and look: a toilet that hisses or trickles into the pan continuously has either a fill valve that will not shut off or a flush valve that leaks.',
        note: 'A dye or a square of toilet paper on the back of the pan shows a slow flush-valve leak.',
        photoIds: [],
      },
      {
        text: 'Turn the isolation valve on the supply pipe a quarter-turn to off (slot across the pipe).',
        note: 'If there is no isolation valve, close the main stopcock instead.',
        photoIds: [],
      },
      {
        text: 'Flush to empty the cistern, then mop out the last inch with a towel.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Lift off the cistern lid carefully and set it flat somewhere safe (they crack easily).',
        note: '',
        photoIds: [],
      },
      {
        text: 'Diagnose the fill valve: if the water was overflowing into the central overflow/standpipe, the fill valve is not shutting off.',
        note: 'Try adjusting the float height down first — often the water level is simply set too high.',
        photoIds: [],
      },
      {
        text: 'Diagnose the flush valve: if the cistern slowly empties into the pan and refills, the flush valve seal (flapper/diaphragm) is worn.',
        note: 'This is the seal at the bottom centre of the cistern.',
        photoIds: [],
      },
      {
        text: 'For a fill-valve fault, either clean/adjust it or replace it: disconnect the supply, undo the back nut, lift the old valve out and fit the new one with fresh washers.',
        note: 'Most modern fill valves are height-adjustable and near-universal.',
        photoIds: [],
      },
      {
        text: 'For a flush-valve fault, you usually must remove the cistern from the pan to access the large bottom nut — undo the wing/flush handle linkage first.',
        note: 'On a close-coupled toilet this means lifting the cistern off; take photos as you go.',
        photoIds: [],
      },
      {
        text: 'Fit the new part, reassemble with new washers, and set the water level to the marked line (usually ~10–15 mm below the overflow).',
        note: '',
        photoIds: [],
      },
      {
        text: 'Open the isolation valve slowly and let the cistern fill while watching for leaks at every joint.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Do several test flushes and check again after ten minutes — a good repair is silent between flushes.',
        note: 'Wipe the floor dry so any new drip is obvious.',
        photoIds: [],
      },
    ],
    tags: ['plumbing', 'toilet', 'cistern', 'fill valve', 'flush valve', 'running'],
  },
  {
    id: 'resilicone-bath',
    title: 'Cut out and re-silicone a bath or shower seal',
    category: 'Walls & Decorating',
    difficulty: 'Moderate',
    timeEstimate: '1–2 hours work + 24 hours curing',
    tools: [
      'Sealant remover tool or sharp trimming knife',
      'Old flat screwdriver',
      'Sealant gun',
      'Masking tape',
      'Cloths',
      'Silicone smoothing tool or a lolly stick',
    ],
    materials: [
      'Mould-resistant sanitary silicone sealant',
      'Methylated spirit or sealant-remover solvent',
      'Kitchen roll',
    ],
    safety: [
      'Ventilate the room — solvent and fresh silicone give off fumes.',
      'Keep blades and solvents away from children, and keep the room out of use until fully cured.',
      'Stop and call a professional if there is soft or rotten material behind the seal, or persistent water damage below — that is more than a re-seal.',
    ],
    houseNotes:
      'Use a mould-resistant SANITARY silicone (not a general-purpose or acrylic frame sealant) so the bathroom stays clean. Cure time matters here: with young children in the house, plan the job so the bath/shower is out of use for the full 24-hour cure before bathtime. [TODO: note the tile/bath colour so replacement sealant matches.]',
    steps: [
      {
        text: 'Run the bath half full of water before you start (leave it while you work) so the bath sits at its loaded, lowest position.',
        note: 'Sealing an unloaded acrylic bath then filling it stretches and splits the new bead.',
        photoIds: [],
      },
      {
        text: 'Slice along both edges of the old silicone with a sharp knife or remover tool, then peel it away in strips.',
        note: 'Take your time — clean removal is 80% of a good finish.',
        photoIds: [],
      },
      {
        text: 'Scrape off every last smear of old sealant; fresh silicone will not stick to old silicone.',
        note: 'A plastic scraper avoids scratching the bath or tiles.',
        photoIds: [],
      },
      {
        text: 'Wipe the whole joint with methylated spirit to remove grease, soap and mould spores, then let it dry completely.',
        note: 'Any moisture left in the gap encourages mould under the new seal.',
        photoIds: [],
      },
      {
        text: 'Mask both sides of the joint with tape, leaving an even gap the width you want the finished bead.',
        note: 'Masking is what gives crisp, straight edges.',
        photoIds: [],
      },
      {
        text: 'Cut the sealant nozzle at 45° to roughly the joint width and load the gun.',
        note: 'A smaller cut is easier to control — you can always trim it wider.',
        photoIds: [],
      },
      {
        text: 'Lay one continuous, steady bead along the joint without stopping, pushing slightly ahead of the nozzle.',
        note: 'Do a whole run in one go for a seamless line.',
        photoIds: [],
      },
      {
        text: 'Smooth the bead once with a wetted smoothing tool or soapy finger, pressing it into the joint in a single pass.',
        note: 'Wipe excess onto kitchen roll between passes.',
        photoIds: [],
      },
      {
        text: 'Peel the masking tape away immediately while the silicone is wet, pulling up and away from the bead.',
        note: 'Removing tape after it skins over drags the edge.',
        photoIds: [],
      },
      {
        text: 'Leave to cure fully — usually 24 hours — before draining the bath and before anyone uses it.',
        note: 'Check the tube; some sanitary silicones want longer. Keep the room out of use meanwhile.',
        photoIds: [],
      },
      {
        text: 'Once cured, drain the bath and check the seal is continuous with no gaps at the corners.',
        note: 'Corners are where seals fail first — dab in a little extra if needed and re-cure.',
        photoIds: [],
      },
    ],
    tags: ['bathroom', 'silicone', 'sealant', 'bath', 'shower', 'mould'],
  },
  {
    id: 'patch-plasterboard',
    title: 'Patch and repaint small plasterboard damage',
    category: 'Walls & Decorating',
    difficulty: 'Moderate',
    timeEstimate: '1 hour work spread over 2–3 days (drying)',
    tools: [
      'Filling knife / putty knife',
      'Sanding block with fine paper',
      'Dust sheet',
      'Small paintbrush and mini roller',
      'Handsaw or padsaw (for larger holes)',
      'Dust mask',
    ],
    materials: [
      'Ready-mixed filler (for dents/cracks)',
      'Plasterboard offcut and repair patch or self-adhesive mesh (for holes)',
      'Fine surface filler',
      'Matching emulsion + primer/mist coat',
    ],
    safety: [
      'Before drilling or cutting into any wall, check for hidden cables and pipes — the kitchen area was recently rewired.',
      'Wear a dust mask when sanding filler; keep dust away from children.',
      'Stop and call a professional if the "damage" is actually a spreading crack, a bulging/damp patch, or anything structural — see the crack-monitoring guide.',
    ],
    houseNotes:
      'The walls are freshly finished after the renovation, so match the existing paint carefully. This is the perfect prompt to record your paint colours: add the room, brand, colour name and finish to the "Paint codes & finishes" reference item now, while you know them. [TODO: paint codes room by room.]',
    steps: [
      {
        text: 'Lay a dust sheet and check what is behind the wall — for anything more than a shallow dent, use a detector to confirm no cables or pipes run behind the repair area.',
        note: 'Fresh cable runs from the rewire may sit where you least expect; check the renovation photos in Reference.',
        photoIds: [],
      },
      {
        text: 'For dents, chips and hairline cracks: rake out any loose material and lightly widen a crack so filler can key in.',
        note: 'Filler needs a slight gap to grip; a hairline crack filled flush often reopens.',
        photoIds: [],
      },
      {
        text: 'Press ready-mixed filler firmly into the damage with the filling knife, slightly proud of the surface.',
        note: 'Filler shrinks slightly as it dries, so leaving it proud saves a second coat.',
        photoIds: [],
      },
      {
        text: 'For a small hole (up to golf-ball size), cover it with self-adhesive scrim mesh, then skim filler over the mesh.',
        note: 'The mesh bridges the hole so filler has something to hold.',
        photoIds: [],
      },
      {
        text: 'For a larger hole, cut a neat rectangle, fit a plasterboard patch or offcut behind it, then scrim and fill over the joins.',
        note: 'Cut the hole square first — irregular holes are hard to patch.',
        photoIds: [],
      },
      {
        text: 'Let each coat dry fully (check the tub — often several hours), then apply a thin second coat to fill shrinkage.',
        note: 'Two thin coats beat one thick one.',
        photoIds: [],
      },
      {
        text: 'Sand smooth with fine paper, feathering the edges into the surrounding wall until you cannot feel the repair.',
        note: 'Run your hand over it with eyes closed — fingertips find ridges the eye misses.',
        photoIds: [],
      },
      {
        text: 'Wipe off dust, then prime the bare filler (a mist coat or primer) so paint soaks in evenly.',
        note: 'Bare filler is more absorbent than the wall and will "flash" (look patchy) if painted directly.',
        photoIds: [],
      },
      {
        text: 'Paint the repair with your matched emulsion, feathering out into the wall; apply a second coat once dry.',
        note: 'Roll rather than brush the surrounding area so the texture matches.',
        photoIds: [],
      },
      {
        text: 'Record the paint used (brand, colour, finish, room) in the Reference section so the next touch-up is effortless.',
        note: '',
        photoIds: [],
      },
    ],
    tags: ['walls', 'plasterboard', 'filler', 'painting', 'repair', 'decorating'],
  },
  {
    id: 'wall-fixings',
    title: 'Drill and fix into walls safely (and anchor furniture)',
    category: 'Fixings & Furniture',
    difficulty: 'Moderate',
    timeEstimate: '30–60 min per fixing',
    tools: [
      'Cable/pipe/stud detector',
      'Cordless drill/driver',
      'Masonry and HSS drill bits',
      'Spirit level',
      'Pencil',
      'Screwdriver',
      'Vacuum',
      'Safety glasses',
    ],
    materials: [
      'Wall plugs (masonry) and plasterboard fixings (toggle / expanding)',
      'Screws to suit',
      'Furniture anti-tip straps or brackets',
    ],
    safety: [
      'Always scan with a detector before drilling — the property was recently rewired and re-plumbed, so new cables and pipes run in places old habits would not expect.',
      'Wear safety glasses; masonry dust and drill swarf damage eyes.',
      'Stop and call a professional if you are unsure whether a wall is load-bearing, or if you hit a cable, pipe or the steel beam area — do not keep drilling.',
    ],
    houseNotes:
      'A load-bearing wall was removed and replaced with steel beams, and the house was recently rewired — before drilling anywhere near the kitchen-diner or beam area, check the "Pipe & cable runs (renovation record)" reference photos first. With young children at home, anchoring bookcases, drawers and the TV to the wall is a priority, not an option. [TODO: mark on a plan where the steel beams and main cable runs sit.]',
    steps: [
      {
        text: 'Decide exactly where the fixing goes and mark it in pencil, using a spirit level for anything that must sit straight.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Scan the area with a detector, checking a generous margin around the mark for cables, pipes and studs.',
        note: 'Cables usually run vertically or horizontally from sockets and switches — avoid those zones.',
        photoIds: [],
      },
      {
        text: 'Cross-check against the renovation photos in Reference for any services buried during the works.',
        note: 'Detectors can miss deep or plastic pipes; photos taken before boarding are your ground truth.',
        photoIds: [],
      },
      {
        text: 'Identify the wall type: tap it. A hollow sound and easy pin-push means plasterboard; a dull solid sound means masonry.',
        note: 'The wall type decides the fixing — this is the key choice.',
        photoIds: [],
      },
      {
        text: 'For masonry, drill with a masonry bit on hammer setting to the plug depth, insert the wall plug flush, then drive the screw.',
        note: 'Wrap tape on the bit as a depth marker so you do not go too deep.',
        photoIds: [],
      },
      {
        text: 'For plasterboard, either screw into a stud (strongest) or use a proper plasterboard fixing — expanding, toggle or self-drive — rated for the load.',
        note: 'A plain wall plug in plasterboard will pull straight out under load.',
        photoIds: [],
      },
      {
        text: 'For heavy items, always try to hit a stud; use the detector to find studs (usually ~400–600 mm apart) and screw into those.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Vacuum the dust as you drill (hold the nozzle under the hole) to keep fine dust out of the room.',
        note: 'Better for little lungs, and it keeps the wall clean for marking.',
        photoIds: [],
      },
      {
        text: 'Anchoring furniture: fit an anti-tip strap or L-bracket from the top of tall/heavy units into a stud or a masonry-plugged fixing.',
        note: 'Bookcases, chests of drawers and freestanding wardrobes all tip — anchor them all.',
        photoIds: [],
      },
      {
        text: 'For a wall-mounted TV, use a bracket rated above the TV weight, fixed into studs or masonry with the correct bolts — never plasterboard plugs alone.',
        note: '[TODO: record the TV weight and bracket VESA size once known.]',
        photoIds: [],
      },
      {
        text: 'Load-test gently by hand once fitted, and re-check anchored furniture every few months as children grow and climb.',
        note: '',
        photoIds: [],
      },
    ],
    tags: ['fixings', 'drilling', 'wall plugs', 'anchoring', 'furniture', 'child safety'],
  },
  {
    id: 'crack-monitoring',
    title: 'Monitor the rear-wall stepped crack',
    category: 'Safety & Monitoring',
    difficulty: 'Easy',
    timeEstimate: '15 min per check',
    tools: ['Phone camera', 'Ruler or crack-width gauge', 'Tape measure', 'Small spirit level'],
    materials: ['Fixed reference marks (small paint dots or fixed screws)', 'A written/photo log'],
    safety: [
      'Do not attempt structural repairs yourself — this guide is monitoring only.',
      'If a crack widens suddenly, doors/windows start to stick, or new cracks appear, treat it as urgent.',
      'Stop and call a structural engineer (and notify your insurer) if the crack exceeds the agreed threshold, widens quickly, or is accompanied by any movement you can feel.',
    ],
    houseNotes:
      'There is a known stepped crack on the rear external wall, under an agreed monitoring plan (fixed-position photos + a width log). Keep the rear-wall gully and gutters clear — surface water near a monitored crack matters (see the gutters and outdoor-tap guides). [TODO: record the agreed escalation threshold width and the monitoring interval given by your surveyor/engineer.]',
    steps: [
      {
        text: 'Set up repeatable photo positions: pick two or three fixed spots (e.g. mark a paving slab, or note distance and height from a fixed point) so every photo is taken from the same place.',
        note: 'Consistency is everything — you are comparing like with like over months.',
        photoIds: [],
      },
      {
        text: 'Take a wide establishing shot plus close-ups of the crack, including a ruler held flat against the wall across the widest point.',
        note: 'The ruler gives scale so widths are comparable between visits.',
        photoIds: [],
      },
      {
        text: 'Measure the crack width at the same marked point each time, ideally with a crack-width gauge (or ruler to the nearest 0.5 mm).',
        note: 'Mark the exact measuring point with a tiny dot so you always measure the same spot.',
        photoIds: [],
      },
      {
        text: 'Note whether the crack is stepped (following the mortar courses) and record its length top and bottom.',
        note: 'Stepped cracks in brickwork often relate to movement; length change matters as much as width.',
        photoIds: [],
      },
      {
        text: 'Write a dated log entry: date, width, length, weather recently (very wet/dry spells matter), and anything new.',
        note: 'Attach the photos to this guide or the "Pipe & cable runs" style record so it all lives together.',
        photoIds: [],
      },
      {
        text: 'Optionally fit a simple tell-tale (a calibrated crack monitor) across the crack and photograph its reading each visit.',
        note: '[TODO: fit a tell-tale if your surveyor recommends one, and record its start reading.]',
        photoIds: [],
      },
      {
        text: 'Repeat on the agreed schedule (commonly monthly, then quarterly if stable) and keep the log unbroken.',
        note: 'A gap in the record weakens the whole picture for an engineer or insurer.',
        photoIds: [],
      },
      {
        text: 'Compare each new reading against the last and against your baseline; flag any clear widening trend.',
        note: 'A little seasonal movement is common; a steady one-way increase is the concern.',
        photoIds: [],
      },
      {
        text: 'Escalate immediately if the crack passes the agreed threshold, widens suddenly, or is joined by sticking doors/windows or new cracks.',
        note: 'Contact your structural engineer and insurer, and share the log and photos.',
        photoIds: [],
      },
      {
        text: 'Keep surface water away: check the rear gutter, downpipe and gully are clear each autumn, as saturated ground can drive movement.',
        note: '',
        photoIds: [],
      },
    ],
    tags: ['crack', 'monitoring', 'structural', 'rear wall', 'safety', 'log'],
  },
  {
    id: 'service-portable-ac',
    title: 'Service the EcoAir Apollo 10 MK2',
    category: 'Appliances',
    difficulty: 'Easy',
    timeEstimate: '30–45 min',
    tools: ['Soft brush or vacuum with brush head', 'Cloths', 'Small bowl or tray', 'Torch'],
    materials: ['Mild washing-up liquid', 'Fresh water'],
    safety: [
      'Unplug the unit before any cleaning or filter access.',
      'This unit uses R290 (propane) refrigerant — NEVER attempt any refrigerant, sealed-system or gas work; keep the unit upright and away from ignition sources, and ventilate the room if the casing or circuit is ever damaged.',
      'Stop and call a qualified appliance/refrigeration engineer if the unit hisses, smells of gas, leaks refrigerant, or stops cooling despite clean filters — do not open the sealed system.',
    ],
    houseNotes:
      'This is the household’s EcoAir Apollo 10 MK2 portable air conditioner (see the "Appliance models & manuals" reference). Because it is an R290 unit, all servicing is limited to cleaning and airflow — nothing that touches the refrigerant circuit. [TODO: note where the manual PDF and warranty are kept, and the last service date.]',
    steps: [
      {
        text: 'Unplug the unit and move it somewhere you can access all sides, on a surface you do not mind getting a little damp.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Locate and slide out the air filter(s) — portable ACs usually have a mesh filter behind the intake grille.',
        note: 'Check the manual for the exact filter positions on the Apollo 10 MK2.',
        photoIds: [],
      },
      {
        text: 'Vacuum loose dust from the filter, then wash it in lukewarm water with a little washing-up liquid.',
        note: 'A clogged filter is the number-one cause of weak cooling.',
        photoIds: [],
      },
      {
        text: 'Rinse the filter and let it dry FULLY before refitting — never run the unit with a damp filter.',
        note: 'A damp filter breeds mould and can drip into the electrics.',
        photoIds: [],
      },
      {
        text: 'Drain the condensate: find the drain plug(s) at the back/base and empty collected water into a tray.',
        note: 'Some units self-evaporate, but end-of-season draining prevents stagnant water and smells.',
        photoIds: [],
      },
      {
        text: 'Wipe the intake and exhaust grilles and vacuum the internal coils you can reach through the grille with a soft brush.',
        note: 'Do not push anything into the coils — clean only what the brush reaches.',
        photoIds: [],
      },
      {
        text: 'Inspect the exhaust hose and window kit for kinks, splits or a loose connection at the unit.',
        note: 'A kinked or leaky hose dumps hot air back into the room and kills performance.',
        photoIds: [],
      },
      {
        text: 'Wipe the outer casing with a damp cloth and dry it, checking the plug and lead for any damage.',
        note: 'Any damaged cable or scorching means stop and replace — do not use it.',
        photoIds: [],
      },
      {
        text: 'Refit the dry filter, reconnect the hose, plug in and run on cooling for a few minutes to confirm good airflow and no unusual noise or smell.',
        note: '',
        photoIds: [],
      },
      {
        text: 'For end-of-season storage: fully drain, dry, run on fan-only for 30 minutes to dry the insides, then store upright and covered.',
        note: 'Keeping an R290 unit upright in storage is important — never store or transport it on its side.',
        photoIds: [],
      },
    ],
    tags: ['appliance', 'air conditioner', 'ecoair', 'r290', 'filter', 'service'],
  },
  {
    id: 'gutters-drains',
    title: 'Clear gutters and check drainage',
    category: 'Outdoors & Garden',
    difficulty: 'Moderate',
    timeEstimate: '1–2 hours',
    tools: [
      'Sturdy ladder',
      'Gloves',
      'Gutter scoop or trowel',
      'Bucket (hooked to the ladder)',
      'Garden hose',
      'Stiff brush',
      'Safety glasses',
    ],
    materials: ['Bin bags', 'Optional replacement gutter clips/brackets'],
    safety: [
      'Ladder safety: work on firm level ground, keep three points of contact, do not overreach, and ideally have someone foot the ladder.',
      'Never work near overhead power lines, and do not lean the ladder on plastic guttering.',
      'Stop and call a professional (or use a roofer with proper access) if the roof edge is out of safe ladder reach, or if you find damaged fascia, soffit or roofline that needs repair at height.',
    ],
    houseNotes:
      'Keep the REAR gutter, downpipe and gully especially clear — surface water near the monitored rear-wall crack matters, so good drainage there is part of protecting the wall (see the crack-monitoring guide). The area is frost-prone, so clear leaves before winter. [TODO: note how many downpipes there are and where each discharges.]',
    steps: [
      {
        text: 'Choose a dry day after the leaves have fallen (autumn) and set the ladder on firm, level ground.',
        note: 'Clearing before winter stops frozen blockages and overflow.',
        photoIds: [],
      },
      {
        text: 'Hook a bucket to the ladder and, working away from the downpipe, scoop debris out of the gutter into it.',
        note: 'Never drop debris into the downpipe — you will just block it lower down.',
        photoIds: [],
      },
      {
        text: 'Move the ladder often rather than overreaching; keep your hips within the ladder’s stiles.',
        note: 'Most ladder accidents are from stretching sideways.',
        photoIds: [],
      },
      {
        text: 'Once scooped, flush the gutter with a hose from the far end and watch the water run to the downpipe.',
        note: 'Slow-moving or pooling water means a fall problem or a blockage.',
        photoIds: [],
      },
      {
        text: 'Check each downpipe flows freely; if it is blocked, tap it to find the blockage or feed the hose down to clear it.',
        note: 'A blocked downpipe often shows as staining down the wall below.',
        photoIds: [],
      },
      {
        text: 'At the bottom, clear the gully/drain grid where the downpipe discharges of leaves and silt.',
        note: 'The gully is the little grated drain at the base — clear it by hand with gloves.',
        photoIds: [],
      },
      {
        text: 'Give the rear-wall drainage extra attention: confirm water runs cleanly away from the base of the monitored wall, not pooling against it.',
        note: 'Pooling water against the rear wall is exactly what you are trying to avoid.',
        photoIds: [],
      },
      {
        text: 'Check gutter brackets and joints for sag, cracks or leaks while you are up there.',
        note: 'A sagging section holds water and overflows — refit or replace clips as needed.',
        photoIds: [],
      },
      {
        text: 'Consider fitting gutter guards/brushes on the leaf-prone runs to cut down future clearing.',
        note: 'Optional, but helpful under trees.',
        photoIds: [],
      },
      {
        text: 'Bag the debris for compost or the green bin, and note the date so you can keep to a yearly (or twice-yearly) schedule.',
        note: '',
        photoIds: [],
      },
    ],
    tags: ['gutters', 'drainage', 'outdoors', 'downpipe', 'gully', 'autumn'],
  },
  {
    id: 'outdoor-tap-winter',
    title: 'Winterise the outdoor tap and greenhouse',
    category: 'Outdoors & Garden',
    difficulty: 'Easy',
    timeEstimate: '30–45 min',
    tools: ['Flat screwdriver (for the isolation valve)', 'Cloth', 'Torch'],
    materials: [
      'Outdoor tap insulation cover or lagging',
      'Pipe insulation foam',
      'Bubble wrap / horticultural fleece (greenhouse)',
      'Draught tape (greenhouse door)',
    ],
    safety: [
      'Take care on cold, damp ground and when reaching into the greenhouse frame — glass edges can be sharp.',
      'Do not use heat to thaw a frozen pipe with a naked flame — gentle warmth only.',
      'Stop and call a plumber if a pipe has already frozen and split, or if the outdoor tap has no accessible internal isolation valve to drain it.',
    ],
    houseNotes:
      'The area is frost-prone, so this is a genuine yearly job, not optional. There is an outdoor tap plus a greenhouse, raised beds and container growing to protect. [TODO: confirm the outdoor tap has an internal isolation/drain valve and note where it is.]',
    steps: [
      {
        text: 'Find the internal isolation valve that feeds the outdoor tap (usually on the pipe just inside the wall where the tap passes through).',
        note: 'If there is a separate drain-off point, note it too.',
        photoIds: [],
      },
      {
        text: 'Close that isolation valve (quarter-turn, or screw the slot across the pipe) to cut supply to the outside tap.',
        note: 'Isolating indoors is what actually protects the tap from freezing.',
        photoIds: [],
      },
      {
        text: 'Open the outdoor tap fully to drain the water left in the pipe and the tap body, and leave it open over winter.',
        note: 'Water left in the tap is what freezes, expands and splits it.',
        photoIds: [],
      },
      {
        text: 'If there is a drain-off screw on the internal pipe, open it briefly over a cloth to release trapped water, then close it.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Fit an insulated cover over the outdoor tap, or lag the tap and exposed pipe with foam and tape.',
        note: 'Belt and braces: drained AND insulated.',
        photoIds: [],
      },
      {
        text: 'Lag any exposed pipework in unheated spaces (garage, outbuildings) with foam pipe insulation.',
        note: 'Check the converted-garage area for any exposed runs.',
        photoIds: [],
      },
      {
        text: 'Greenhouse: clear out spent plants and debris, then check and clean the glass and clear the greenhouse gutter if it has one.',
        note: 'Clean glass lets in scarce winter light; a clogged greenhouse gutter overflows.',
        photoIds: [],
      },
      {
        text: 'Insulate the greenhouse with bubble wrap fixed to the frame inside, and seal draughts around the door.',
        note: 'Even a few degrees of frost protection saves overwintering plants.',
        photoIds: [],
      },
      {
        text: 'Move tender container plants into the greenhouse or against a sheltered house wall, and raise pots onto feet so they drain and do not sit in ice.',
        note: '',
        photoIds: [],
      },
      {
        text: 'Empty and store hoses and watering cans, and disconnect any hose left on the (now isolated) tap.',
        note: 'A hose left connected traps water right at the tap.',
        photoIds: [],
      },
      {
        text: 'In spring, reverse the job: close the outdoor tap, reopen the isolation valve, remove insulation, and check for any drips or splits before use.',
        note: 'Note the date so both the autumn and spring jobs become routine.',
        photoIds: [],
      },
    ],
    tags: ['outdoor tap', 'winter', 'frost', 'greenhouse', 'garden', 'insulation'],
  },
];
