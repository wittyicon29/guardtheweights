> Design the UI for **"Echoes of Aethermoor"** — a dark fantasy mystery game. Use the attached screenshot as the **exact structural wireframe**. Do not alter column count, panel positions, or information hierarchy. Only transform the visual language into a rich, lore-authentic dark fantasy aesthetic.
>
> ---
>
> ### 🌌 GLOBAL ATMOSPHERE & BACKGROUND
>
> - Background: A **deep cosmic void** in midnight navy-black (#06080f) with a faint, slow-drifting **celestial star map** — thin constellation lines connecting stars, like the Celestial Architects mapped the heavens before building Aethermoor. Stars are tiny, sparse, off-white with occasional teal pulses
> - Between the 4 panels, leave slim gaps that reveal this starfield background — the panels feel like **floating obsidian slabs** hovering over the cosmos
> - A very faint **topographic/ley line grid** overlays the background — ancient energy pathways across the land of Aethermoor, barely visible, in deep teal (#00f5c420 opacity)
> - Subtle animated mist/fog drifts upward from the bottom edge of the screen — referencing **The Forgotten Rift**, a cosmic wound beneath the world
> - The page title area above all panels reads *"Echoes of Aethermoor"* in tall, weathered serif lettering with a cracked golden underline — flanked left and right by **two opposing elemental sigils**: a flame rune (fire guardian) on the left, a snowflake glyph (ice guardian) on the right
>
> ---
>
> ### 🎨 GLOBAL DESIGN LANGUAGE
>
> - **Panel material**: All 4 panels are dark stone slabs — #0e1020 base with a very subtle stone-crack texture overlay at low opacity. Panels have 2px borders in aged bronze (#6b4f2a) with corner flourishes — small **four-pointed star glyphs** at each corner (referencing the four elemental guardians: fire, ice, earth, air)
> - **Typography**: Cinzel Decorative or Trajan Pro for all headings. EB Garamond or Cormorant Garamond for narrator body text (feels ancient, literary). JetBrains Mono in small caps for data labels (entropy %, timestamps, counters)
> - **Color palette**:
>   - Background void: #06080f
>   - Panel stone: #0e1020
>   - Bronze border: #6b4f2a
>   - Ethereal teal (active/glow): #00f5c4
>   - Celestial gold (unlock/rank): #c9a84c
>   - Obsidian purple (mid-tone UI): #2a1f4e
>   - Parchment text: #e8dfc0
>   - Cold/locked state: #3a6b8a
>   - Warm/close state: #d4621a
> - Every interactive element has a **soft inner glow** on hover — teal for neutral actions, gold for unlock/confirm actions
>
> ---
>
> ### 🏛️ COLUMN 1 — THE SEEKER'S CODEX (Left Sidebar)
>
> **Rank Badge — Top Section:**
> - Replace the plain "Apprentice" header with an **illuminated manuscript rank badge**: a circular or shield-shaped emblem with an ornate knotwork border in gold
> - Inside: the rank icon (📖) rendered as an actual illustrated glyph — an open tome with teal light spilling from its pages
> - Rank name "APPRENTICE" in Cinzel, letter-spaced, with a subtitle in italic parchment text: *"Learning the deeper truths"*
> - Below the badge: a thin horizontal **ley line divider** — a glowing teal line that tapers at both ends into small rune dots
>
> **Secrets Progress — 7 Rune Seals:**
> - Replace the progress bar with **7 individual rune seal icons** arranged in a horizontal row, each representing one of the 7 secrets:
>   - 🔥 The First Age — flame pillar rune
>   - 🌀 The Elemental Covenant — four-element mandala
>   - ⛰️ The Obsidian Vault — mountain-with-gate rune
>   - 🌑 The Silence — void/eclipse glyph
>   - 🌅 The Awakening — rising sun with rays rune
>   - 🌀 The Forgotten Rift — cracked circle glyph
>   - 🪞 The Eternal Mirror — mirror/infinity rune
> - Unlocked seals glow in **celestial gold** with a pulse animation. Locked seals are dark stone with a faint outline only
> - Below: small text "2 / 7 Secrets · Next Rank: Journeyman (+1 secret)" in mono font
>
> **"What to Look For" Guidance Box:**
> - Style this as an **ancient scroll pinned to a stone wall** — slightly yellowed parchment texture, torn top and bottom edges, held by two small iron tack pins at the corners
> - The title "WHAT TO LOOK FOR" in small caps bronze lettering
> - The guidance question in italic garamond: *"What lies beneath the peaked guardians? What treasures sleep?"*
> - A thin teal quill-stroke underline separates the question from hints below
>
> **Hint Slots — 3 Stone Tiles:**
> - Each hint is a **carved stone tile**, like tablets unearthed from ruins
> - Hint 1 (unlocked): Glowing teal border, parchment background, hint text visible with a small flame icon to the left
> - Hint 2 (locked): Dark obsidian tile, text replaced with **Aethermoorian script** (decorative unreadable glyphs), a small padlock rune in the corner, cold blue tint
> - Hint 3 (locked): Same as Hint 2 but even darker — slightly smaller opacity, implying it's deeper/harder to reach
> - Below all tiles: italic micro-text *"Hints unlock as you draw closer to the truth... (18%)"* in cold blue
>
> **Discovered Secrets Accordion — Bottom:**
> - Header bar styled as a **vault door handle bar** — heavy dark metal texture, rivets on the left, "DISCOVERED SECRETS" in bronze lettering, "2/7" counter in a glowing teal badge
> - Each unlocked secret is a **parchment card** that slides out — with the secret's specific rune icon on the left, title in gold, and a right-facing arrow styled as an ancient compass needle
> - Locked secret slots are black void cards with only a question mark glyph and a padlock
>
> ---
>
> ### 📜 COLUMN 2 — THE NARRATOR'S CHAMBER (Chat Panel)
>
> **Panel Identity:**
> - This panel has a unique atmosphere — it should feel like the **interior of an oracle's chamber**. Add a very faint background illustration: a ghostly hooded figure (the narrator) seated at a desk, barely visible at 8% opacity, centered behind the chat content
> - Top of the panel: an arched stone header with carved text **"CHAMBER OF ECHOES"** and two small gargoyle/rune-guardian faces at the arch corners
>
> **Narrator Messages:**
> - Each narrator message is wrapped in a **scroll-style container**: slightly yellowed, with a decorative top and bottom edge (torn parchment or wax-sealed ribbon)
> - A thick teal left-border accent — like an illuminated manuscript margin
> - Timestamp in tiny mono font below each message in muted bronze
> - The narrator label "NARRATOR" appears above each message in small caps with a small eye-of-truth glyph (👁) prefix
>
> **Player Messages:**
> - Minimal dark floating bubbles — dark obsidian (#1a1a2e) with a thin teal border, text in clean parchment white
> - Aligned to the right side
>
> **Input Area — The Inscription Stone:**
> - The question input field is styled as a **flat stone slab** — dark grey stone texture, engraved border, placeholder text *"Speak your question into the Rift..."* in italic faded parchment
> - The **ASK button** is a large arcane seal — circular or wide rectangular, with a central **@** replaced by a custom rune symbol (an eye or flame), gold border that pulses slowly, text "INVOKE THE NARRATOR" in small caps
> - Below: character counter "0/500" styled as a sand-in-hourglass style indicator — tiny hourglass icon + counter in mono
>
> ---
>
> ### ⚗️ COLUMN 3 — THE EXTRACTION ALTAR (Extract Panel)
>
> **Panel Identity:**
> - Header: **"EXTRACTION ALTAR"** with a small mortar-and-pestle or alembic alchemical glyph
> - Background hint: faint illustration of an **alchemist's ritual circle** (geometric, arcane) at very low opacity behind the content
>
> **Extraction Text Area:**
> - Styled as a **stone writing tablet** — slightly rougher texture than the panel, with carved boundary lines like ruled lines on a tablet
> - Placeholder: *"Transcribe what truth you have extracted from the Narrator's words..."*
> - A small quill icon in the top-right corner of the text area
>
> **Validate Answer Button:**
> - Large, prominent — styled as an **arcane binding seal**: hexagonal or circular shape with geometric interior line art (like a summoning circle), text "BIND THE TRUTH" in Cinzel
> - Default state: teal glow border, dark fill
> - Active/hover: the interior circle art slowly rotates, gold glow intensifies
>
> **Secret Unlocked Card — Dramatic Reveal:**
> - When triggered, this card should feel like a **stone sarcophagus lid sliding open** — heavy dark panel with gold trim
> - Header: ✨ **"SECRET UNLOCKED"** in large gold Cinzel, with a radiant starburst behind it
> - The secret's specific rune seal (e.g., the four-element mandala for The Elemental Covenant) displayed prominently, glowing
> - Secret title in large gold text: **"The Elemental Covenant"**
> - Lore description text partially visible — some words are **blurred/obscured** as if still being deciphered (a redaction effect using a soft Gaussian blur on certain phrases)
> - Reward line: a small gift/scroll icon + *"Reward: Learn Elemental Magic"* in teal italic
> - The card border pulses gold slowly — like it's breathing
>
> ---
>
> ### 🔮 COLUMN 4 — THE ETHER COMPASS (Response Analysis)
>
> **Panel Identity:**
> - Header: **"ETHER COMPASS"** or **"RESONANCE ANALYSIS"** with a compass rose glyph
> - This panel's background has a very faint **star compass rose** illustration at low opacity — a large circular navigation chart centered behind all content
>
> **Closeness Score Display:**
> - Replace the simple "18%" text with a **circular arcane compass/astrolabe** — an ornate circular dial with rotating outer ring, inner needle pointing to the closeness percentage
> - The dial face is divided into zones: Cold (blue, 0–25%), Warming (purple, 25–50%), Revealed (amber, 50–75%), Burning Truth (gold, 75–100%)
> - The percentage "18%" sits in the center of the dial in large Cinzel numerals
> - Label above: *"KEEP SEARCHING"* in small cold-blue caps with a 🔍 rune glyph
>
> **Entropy Metric:**
> - Displayed as a **runic thermometer**: a tall vertical crystal column, glowing from the bottom
> - Cold/low: icy blue at the base with frost crack texture
> - Mid: purple aurora glow
> - High: molten gold erupting from the top
> - Label "ENTROPY: 93%" beside it — with a tooltip-style description box styled as a small aged note card pinned with a tack
>
> **Status Explanation Box — "What This Means":**
> - Styled as a **torn page from an ancient field journal** — slightly rotated 1–2 degrees, parchment texture, handwritten-style font for the explanation text
> - Title "JUST BEGINNING" with 🔴 replaced by a wax seal stamp icon
> - "CURRENT STATUS", "WHAT THIS MEANS FOR YOU" as carved subheadings
>
> **Closeness Progress Bar:**
> - Replace with a **horizontal ley line** that fills left to right — the line itself looks like flowing energy/electricity, not a plain bar
> - At the end of the current fill, a small **traveling rune** marker (like a cursor on a map)
> - Below: *"18% to Maximum"* in mono cold-blue
>
> **Hint Milestone Markers:**
> - Three small rune markers along the ley line at 25%, 50%, 75% — each is a small locked glyph tile that lights up as the player crosses that threshold
> - Below: *"Hints will unlock as you reach 25%, 50%, and 75% closeness"* in small italic parchment text
>
> **New Game Button:**
> - A **heavy stone tablet button** at the bottom — wide, dark stone texture, bronze border with corner rune flourishes
> - Icon: a broken hourglass or reset rune
> - Text: **"BEGIN ANEW"** in Cinzel gold
> - Hover: the stone cracks slightly and a teal light seeps through the cracks
>
> ---
>
> ### 🌟 LORE-SPECIFIC DECORATIVE ELEMENTS
>
> Scatter these throughout the UI as micro-details:
>
> - **The Four Elemental Guardians** — small guardian icons appear in the four outer corners of the full screen: 🔥 Fire (top-left), ❄️ Ice (top-right), 🌍 Earth (bottom-left), 💨 Air (bottom-right). Each subtly animated — flame flickers, ice crystallizes, etc.
> - **The Eternal Mirror** — the Response Analysis panel's compass dial has a subtle mirror-reflection effect: whatever glow appears on one side is subtly mirrored on the opposite side, referencing the artifact that shows truth and possibility
> - **The Forgotten Rift** — a thin, jagged crack-line decoration runs along the very bottom of the screen, glowing faintly purple from within, as if the cosmic wound is just beneath
> - **The Celestial Architects** — tiny constellation dot patterns are embedded in panel borders, like the builders left their star-language in the stonework
> - **The Obsidian Vault** — the Discovered Secrets section has a faint Blackpeak Mountain silhouette in its background at very low opacity, as if the vault lies beneath
> - **The Silence** — locked/void secret cards have an eerie **absolute darkness** treatment — no texture, no grain, just pure void with a barely visible collapsed empire skyline silhouette
> - **The Awakening** — the rank progression rune strip has a faint sunrise gradient beneath it, as if the Architects' return grows nearer with each secret unlocked
>
> ---
>
> **Reference aesthetics**: *Hades UI*, *Slay the Spire*, *Disco Elysium*, *Hollow Knight*, *Elden Ring menu screens*. The feeling: consulting an ancient oracle inside a ruined celestial observatory at the edge of the world. Every pixel should whisper *"something ancient was here."*

