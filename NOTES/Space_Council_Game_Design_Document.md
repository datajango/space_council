# Space Council Game Design Document

## 1. Overview

- **Game Concept:** Players manage a burgeoning space agency, overseeing mission planning, launches, station construction, crew management, research, and off-world base development.
- **Target Audience:** Strategy and management game enthusiasts, sci-fi fans, casual and mid-core browser gamers.
- **Platform:** Web-based (desktop-first, responsive design for tablets).

## 2. Core Gameplay Modules

1. **Space Mission Planning**: Define objectives, select mission profile, allocate budget and resources.
2. **Launch Operations**: Simulate countdown, stage separations, and booster management in real time or accelerated mode.
3. **Space Station Construction**: Place modules, connectors, life support; manage station integrity and upgrades.
4. **Crew Selection & Management**: Recruit astronauts with unique skills, assign roles, monitor health and morale.
5. **Technology Research & Development**: Unlock new modules, propulsion, life-support and mining tech via a tech tree.
6. **Moon Base Establishment & Expansion**: Place habitats, labs, power systems; manage lunar-specific challenges.
7. **Mars Base Establishment & Expansion**: Similar to moon base but with higher difficulty, terraforming potential.
8. **Asteroid Belt Mining Operations**: Deploy mining rigs, manage resource extraction, transportation risks.
9. **Resource & Supply Chain Management**: Track materials, fuel, food, crew supplies, and logistics between bases.

## 3. Gameplay Flow

- **Strategic Phase:** Plan missions, assign research, allocate budgets.
- **Operational Phase:** Execute launches, station builds, and base expansions with interactive UIs.
- **Management Phase:** Monitor resources, crew well-being, and base statuses; respond to random events.

## 4. UI/UX Considerations

- **Dashboard Overview:** High-level status of agency, resources, ongoing missions.
- **Module Panels:** Detailed screens for planning, construction, research and crew.
- **Drag-and-Drop Construction:** Intuitive placement of station modules and base structures.
- **Tech Tree Visualization:** Collapsible tree with tooltips showing prerequisites and benefits.
- **Crew Roster UI:** Profile cards for each astronaut with stats and assignment controls.
- **Interactive Map:** Solar system view to navigate between Earth, Moon, Mars, and asteroids.

## 5. Technical Architecture

- **Frontend:** React (JavaScript) with Redux for state management; Three.js or PixiJS for 3D/base-building scenes.
- **Backend:** Node.js + Express for REST APIs; WebSocket server for real-time updates.
- **Database:** PostgreSQL for relational data (missions, crew, tech) and Redis for session/state caching.
- **API Layer:** REST endpoints for CRUD operations, WebSocket channels for live game states.
- **Hosting/Deployment:** Docker containers orchestrated by Kubernetes on AWS/GCP.
- **Authentication:** OAuth2 or JWT-based user accounts with role-based access for admins.

## 6. Game Data Models

- **MissionPlan:** objectives, start/end dates, required assets.
- **StationModule:** type, integrity, power usage.
- **CrewMember:** name, skills, health, morale.
- **TechNode:** id, name, prerequisites, research cost.
- **Base:** location, structures\[], resourceStockpiles.
- **MineSite:** asteroidId, extractionRate, operationalStatus.

## 7. Progression & Balancing

- Experience/Research Points gained per activity.
- Unlockable modules and upgrades tied to milestone achievements.
- Difficulty scaling via resource scarcity and environmental hazards.
- Random events (solar flares, micrometeorites) to add unpredictability.

## 8. MVP Scope

- Core mission planning and a single-launch operation mode.
- Basic station construction with two module types.
- Simple crew selection with three astronaut profiles.
- Tech tree with three initial research branches.
- Prototype moon base with habitat placement.
- Minimal resource tracking dashboard.

## 9. Next Steps

- **Wireframes & Mockups:** Sketch UI layouts for key screens (see Section 10).
- **Define Metrics:** Resource values, upgrade costs, event probabilities.
- **Backend Prototype:** Set up database schema and basic API routes.
- **Frontend Scaffold:** Initialize React app, routing, basic components.
- **User Testing:** Validate core loop and UI flow with a small focus group.

## 10. Wireframes & Mockups

### 10.1 Key Screens & Objectives

1. **Agency Dashboard**

   - **Goal:** Provide at-a-glance metrics (funds, resources, active missions).
   - **Elements:** Top nav (logo, settings), sidebar navigation, resource summary cards, mission overview panel, quick-action buttons.

2. **Space Mission Planning**

   - **Goal:** Define new missions with objectives, timeline, and budgets.
   - **Elements:** Objectives list (left), timeline widget (center), resource sliders (right), "Launch Plan" button.

3. **Launch Operations**

   - **Goal:** Execute and monitor launch sequences.
   - **Elements:** Countdown timer, stage separation diagram, fuel gauge, action log, abort/hold controls.

4. **Station Construction**

   - **Goal:** Assemble and upgrade space station modules.
   - **Elements:** 3D canvas, module palette (left), properties panel (right), undo/redo toolbar.

5. **Crew Management**

   - **Goal:** Recruit and assign astronauts to missions or stations.
   - **Elements:** Crew roster grid, profile cards with stats, role assignment dropdowns, health/morale bars.

6. **Tech Tree**

   - **Goal:** Unlock technologies and view dependencies.
   - **Elements:** Collapsible tree view, node tooltips, research queue sidebar, tech details overlay.

7. **Base Builder (Moon/Mars)**

   - **Goal:** Place base structures and manage environmental challenges.
   - **Flow:**

     1. Display an empty terrain canvas representing available land.
     2. Prompt user to select the **Admin Building** placement location.
     3. Upon placement, transition to an interior view: show a floorplan grid for the Admin Building.
     4. Let user assign interior rooms: offices, meeting rooms, and **Mission Control Stations**.
     5. Mission Control roles to choose (with iconography and tooltips):

        - **BOOSTER** – Booster Systems Engineer
        - **CONTROL** – Control Officer
        - **EECOM** – Electrical, Environmental, and Consumables Manager
        - **FLIGHT** – Flight Director
        - **FAO** – Flight Activities Officer
        - **FDO (FIDO)** – Flight Dynamics Officer
        - **GUIDANCE (GUIDO)** – Guidance Officer
        - **GNC** – Guidance, Navigation, and Controls Systems Engineer
        - **INCO** – Integrated Communications Officer
        - **NETWORK** – Network Supervisor (ground-station network)
        - **O\&P** – Organization & Procedures Officer
        - **RETRO** – Retrofire Officer
        - **TELMU** – Telemetry, Electrical & EVA Mobility Unit Officer
        - **ACO** – Assembly & Checkout Officer / Payloads

     6. After configuring Admin Building interior, return to terrain canvas to place additional structures.

   - **Elements:** Terrain canvas (drag/zoom), placement ghost preview, interior modal (grid + selection panel), role icons panel.
   - **Initial Empty Canvas & Building Palette:** On first entering the Base Builder, display a blank terrain grid with coordinate markers alongside a palette of all constructible buildings.
   - **Available Buildings:** Admin Building, Launch Pad, Research Laboratory, Habitat Module, Power Generator, Communications Array, Vehicle Hangar, Storage Depot, Greenhouse, Solar Farm, Training Facility, Medical Center, Engineering Bay, Observatory Tower.
   - **Placement Flow:** Player clicks a building in the palette to attach a ghost outline to the cursor, positions it on the terrain, and clicks to confirm placement. Placed buildings become interactive for upgrades or interior configuration.

8. **Asteroid Mining Ops**

   - **Goal:** Deploy and manage mining rigs in the belt.
   - **Elements:** Asteroid field map, rig status overlays, resource flow graph, transport logistics panel.

9. **Solar System Map**

   - **Goal:** Navigate between Earth, Moon, Mars, and mining sites.
   - **Elements:** Stylized system map, clickable body icons, travel time estimates, mission markers.

### 10.2 Mockup Guidelines

- **Low-Fidelity Sketches:** Use grayscale wireframes to validate layout before adding visual polish.
- **Annotation:** Label all UI elements (buttons, panels, charts) to clarify interactions.
- **Consistency:** Maintain a universal header/sidebar across screens for seamless navigation.
- **Responsive States:** Define layouts for desktop (3-column) and tablet (2-column) breakpoints.

### 10.3 Next Steps for Wireframes

1. **Sketch Rough Layouts:** Hand‑drawn or digital (e.g., Figma) roughs for each of the nine key screens.
2. **Review & Feedback:** Iterate on placement, hierarchy, and navigation flows.
3. **High‑Fidelity Mockups:** Apply brand colors, typography, and basic iconography in Figma or Sketch.
4. **Prototype Interactions:** Link screens to demonstrate navigation flow and basic interactions.

### 10.4 Campus Layout Map

- **Goal:** Provide an isometric or top‑down view of the Earth‑side campus showing roads, landscaping, and lots for all possible buildings.
- **Elements:**

  - **Base Grid & Paths:** Roads and pedestrian walkways connecting all foundation pads.
  - **Landscape:** Trees, lawns, decorative planters, and small water features for campus aesthetics.
  - **Foundation Pads:** Clearly marked empty lots for each building type—use subtle raised concrete outlines.
  - **Building Labels & Icons:** Placeholder icons or labels indicating which building (Admin, Launch Pad, etc.) goes on each pad.
  - **Interactive Hotspots:** Each pad can be clicked to view building details or start placement flow.

- **Mockup Guidelines:**

  1. **Low‑Fidelity:** Simple grayscale map with pad outlines and numbered labels for each building.
  2. **High‑Fidelity:** Full‑color isometric render with textures, shadows, and UI overlay for interactive hotspots.
  3. **Annotation:** Number or icon each pad and include a legend to map numbers to building names.
  4. **Scale & Orientation:** Include a small compass and scale bar to orient users (North, grid coordinates).

---

## 11. Style Guide Style Guide

### 11.1 Color Palette

- **Primary:** Astro Blue – #1B2A49 (used for header, primary buttons, highlighted panels)
- **Secondary:** Orbital Teal – #37B3A9 (accent elements: toggles, sliders, icons)
- **Highlight:** Solar Gold – #F2C94C (call-to-action buttons, badges, notifications)
- **Background Light:** Nebula White – #F5F7FA (page backgrounds, card surfaces)
- **Background Dark:** Deep Space – #0D0F19 (sidebars, footers, modals)
- **Text Primary:** Stardust Gray – #333A56 (headings, body copy)
- **Text Secondary:** Comet Light – #7A8094 (subtext, disabled states)

### 11.2 Visual Metaphors & Themes

- **Command Deck HUD:** UI panels resemble spaceship control consoles with subtle grid overlays and beveled edges.
- **Blueprint Aesthetic:** Module-placement screens use light blueprint lines and dimension labels to evoke engineering schematics.
- **Holographic Overlays:** Pop‑ups and tooltips have slight glow and transparency to simulate hologram effects.
- **Minimal Sci‑Fi:** Clean geometry, rounded–square cards, and iconography inspired by NASA instrumentation.

### 11.3 UI Container Layout

- **Global Shell:**

  - **Header (60px height):** Logo on left, global actions (notifications, user menu) on right.
  - **Sidebar (240px width):** Collapsible, icons + labels for major modules. Active state uses Solar Gold border.
  - **Main Content:** Flexible grid; default 3‑column layout on wide, 2‑column on tablet breakpoints.
  - **Footer (optional):** Agency status ticker with resource scrolling marquee.

### 11.4 Page Layouts

- **Dashboard:** 3 columns—(1) Resource summary cards, (2) Mission timeline and quick actions, (3) Recent events log.
- **Mission Planning:** 2 columns—(left) Objectives list, (right) timeline + budget sliders. Full‑width footer for confirm/cancel.
- **Construction & Base Builders:** 1 large canvas area (70% width) + 30% sidebar for tools and properties.
- **Tech Tree & Map:** Full‑screen interactive canvas with collapsible sidebars for filters and details.

### 11.5 UI Elements & Components

- **Buttons:** Rounded corners (8px), primary (filled Astro Blue), secondary (outline Orbital Teal), disabled (gray, low opacity).
- **Cards:** Soft shadows, Nebula White background, 2xl rounded corners, 16px padding. Hover elevates shadow.
- **Sliders & Toggles:** Orbital Teal track, Solar Gold thumb on hover, smooth transition on toggle.
- **Dropdowns & Selects:** Compact, with search support; dropdown backgrounds use Nebula White with subtle border.
- **Modals:** Centered, Deep Space backdrop overlay (80% opacity), modal card uses Nebula White with slight glow.
- **Tooltips:** Holographic style: semi‑transparent Deep Space with Solar Gold pointer. Delay 300ms, fade in/out 150ms.

### 11.6 Common UI Behaviors

- **Consistent Feedback:** All interactive elements have hover (scale 1.02), active (scale 0.98) states.
- **Drag‑and‑Drop:** Modules and base pieces show ghost preview, snap‑to‑grid feedback, and placement highlight.
- **Responsive Transitions:** Layouts animate smoothly when resizing: sidebars collapse/expand with 200ms ease.
- **Accessibility:** High‑contrast mode toggle, ARIA labels for icons, keyboard navigation (tab order, space/enter activation).

---

## 12. Building Descriptions

A summary of each structure’s purpose and in-game function:

- **Admin Building:** The central headquarters where agency leadership reviews finances, allocates budgets, hires staff, and monitors high‑level metrics.
- **Launch Pad:** A rocket assembly and launch complex. Handles pre‑launch checklists, maintenance scheduling, and supports multiple launch vehicle types.
- **Research Lab:** A scientific facility for conducting experiments and R\&D. Unlocks new technologies, accelerates research points, and houses specialized equipment.
- **Habitat Module:** Crew living quarters providing shelter, rest, and recreational space. Impacts crew health, morale, and maximum population capacity.
- **Power Generator:** The primary energy source for the campus. Can be customized between fuel‑powered or nuclear variants, affecting output, fuel consumption, and maintenance.
- **Communications Array:** A high‑gain antenna network improving data throughput and communication range. Essential for deep‑space missions and remote operations.
- **Vehicle Hangar:** Storage and maintenance bay for rovers, shuttles, and support vehicles. Manages vehicle deployment, refueling, and repair cycles.
- **Storage Depot:** A warehousing facility for raw materials and supplies. Increases resource capacity, manages stockpiles, and automates distribution to other structures.
- **Greenhouse:** An agricultural dome that produces food and oxygen. Supports life‑support systems and reduces dependence on supply shipments.
- **Solar Farm:** An array of photovoltaic panels generating renewable energy. Provides sustainable power, lowers fuel generator usage, and scales with expansion.
- **Training Facility:** A specialized center for crew training and simulations. Improves astronaut skill levels, unlocking advanced roles and reducing mission failure risks.
- **Medical Center:** A hospital unit for treating injuries, illnesses, and radiation exposure. Maintains overall crew health and recovers injured personnel more quickly.
- **Engineering Bay:** A workshop for constructing, repairing, and upgrading equipment and modules. Increases maintenance efficiency and enables field repairs.
- **Observatory Tower:** A telescopic station for space observation and scientific surveys. Boosts research yield on astronomy projects and reveals new mission opportunities.

## 13. Location-Based Building Summary

Organizing the full building roster by installation:

### 13.1 Earth Space Control Campus

- Admin Building
- Launch Pad
- Research Lab
- Habitat Module
- Power Generator
- Communications Array
- Vehicle Hangar
- Storage Depot
- Greenhouse
- Solar Farm
- Training Facility
- Medical Center
- Engineering Bay
- Observatory Tower

### 13.2 Moon Base Installation

- Habitat Module
- Research Lab
- Power Generator (ruggedized lunar variant)
- Communications Array (lunar relay)
- Greenhouse (sealed dome)
- Solar Farm (low‑angle panels)
- Storage Depot
- Engineering Bay
- Medical Center

### 13.3 Mars Base Installation

- Habitat Module (pressurized colony units)
- Research Lab
- Power Generator (nuclear RTG option)
- Communications Array (Mars orbit relay)
- Greenhouse (hydroponics farm)
- Solar Farm (dust‑resistant panels)
- Storage Depot
- Engineering Bay
- Medical Center
- Observatory Tower (atmo‑filtered telescopes)

---

## 14. 3D Base Building User Interface

Designing an immersive 3D construction interface for each installation (Earth Campus, Space Station, Moon Base, Mars Base, Asteroid Ops). This section outlines common controls, context-specific variations, and UI components.

### 14.1 Core 3D Controls & Navigation

- **Camera Modes:**

  - **Orbital View:** Rotate, pan, and zoom around the entire base for strategic placement.
  - **Ground-Level View:** Walk or fly through the environment for detailed interior/exterior editing.

- **Zoom & Pan:** Mouse wheel (zoom), click‑drag (pan/orbit), right-click drag (tilt).
- **Hotkeys & Shortcuts:**

  - Orbit: Alt + Left Mouse
  - Pan: Middle Mouse
  - Zoom: Scroll or Ctrl + Right Mouse
  - Reset Camera: Home key

- **Mini‑Map Overlay:**

  - Shows top‑down footprint, highlights camera frustum, click to reposition.

### 14.2 Build Palette & Drag‑and‑Drop

- **3D Build Palette:** A floating, collapsible carousel of building models with thumbnails and drag handles.
- **Ghost Preview:** Semi‑transparent model follows cursor, snapping to foundation pads or grid when near valid placement zones.
- **Smart Snap:** Auto-align modules to roads, utility grid, or adjacent structures.
- **Rotate & Scale Handles:** On ghost model, provide onscreen gizmos (rotate rings, scale cubes) for fine adjustments.

### 14.3 Contextual Environment Layers

- **Earth Campus:**

  - Terrain: Grass, concrete pathways, parking.
  - Utility Grid: Toggle display of underground pipes/power lines.
  - Weather Overlay: Day/Night cycle, rain/fog toggles.

- **Space Station:**

  - Module Grid: 6‑axis docking nodes, magnetic latches visualization.
  - Zero‑G Ghosts: Transparent extensions showing connection axes.
  - Systems Map: Toggle life‑support, power flow, data lines.

- **Moon/Mars Base:**

  - Surface Topography: Highlight craters, slopes, and regolith depth.
  - Environmental Hazards: Show radiation zones and dust accumulation predicted areas.
  - Habitat Integrity: Overlay pressure shells and structural stress heatmap.

- **Asteroid Ops:**

  - Zero‑Gravity Anchors: Display tether points and thruster vectors.
  - Resource Veins: Subsurface ore deposits shown as ghost volumes.
  - Conveyor Routes: Designate resource transport tubes with flow arrows.

### 14.4 Module Properties & Details Panel

- **Selection Feedback:** Clicking a placed building opens a side panel displaying:

  - **Name & Icon**
  - **Status Indicators:** health, power usage, crew assigned
  - **Upgrade Buttons:** level up, add extensions, customize facade
  - **Interior Access:** button to switch into interior editing mode.

- **Panel Tabs:**

  - **Overview** (metrics, status)
  - **Upgrades** (available modules/components)
  - **Logistics** (incoming/outgoing resource flows)

### 14.5 Interactive Feedback & Validation

- **Placement Validation:**

  - Green highlight for valid zones, red for invalid
  - Tooltip guidance when hovering over conflicts (e.g., “Insufficient power grid capacity”).

- **Real‑Time Effects:**

  - When placing power generators, nearby icons pulse to show expanded power radius.
  - Environmental overlays animate (e.g., dust storms on Mars).

### 14.6 Workflow Examples

1. **Earth Campus – Admin Building:**

   - Switch to Orbital View, open Build Palette, drag Admin model onto highlighted foundation pad, rotate as needed, click to place.
   - Auto‑open Properties Panel to configure staff offices and budgets.

2. **Space Station – Module Docking:**

   - In Module Grid view, select a Life‑Support module, drag to docking node, ghost snaps to axis, confirm placement.
   - Systems Map overlay updates power and O₂ flows.

3. **Lunar Base – Greenhouse:**

   - In Surface Topography mode, select greenhouse, place on leveled regolith zone, ghost warns if slope >5°.
   - After placement, open Overlays to toggle interior oxygen maps.

---

_Next: Let’s wireframe the 3D build palette and camera controls UI—shall we start with the Earth Campus view?_
