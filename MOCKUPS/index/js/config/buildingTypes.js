// js/config/buildingTypes.js
const BUILDING_TYPES = {
    earth: [
        { id: 'admin', name: 'Admin Building', desc: 'Central headquarters for agency operations', size: 4, power: 5, capacity: 50 },
        { id: 'launch', name: 'Launch Pad', desc: 'Rocket assembly and launch complex', size: 6, power: 10, capacity: 20 },
        { id: 'research', name: 'Research Lab', desc: 'Scientific R&D facility', size: 3, power: 8, capacity: 30 },
        { id: 'habitat', name: 'Habitat Module', desc: 'Crew living quarters', size: 2, power: 3, capacity: 40 },
        { id: 'power', name: 'Power Generator', desc: 'Primary energy source', size: 3, power: -50, capacity: 5 },
        { id: 'comms', name: 'Communications Array', desc: 'High-gain antenna network', size: 2, power: 4, capacity: 10 },
        { id: 'hangar', name: 'Vehicle Hangar', desc: 'Vehicle storage and maintenance', size: 5, power: 6, capacity: 15 },
        { id: 'storage', name: 'Storage Depot', desc: 'Resource warehousing facility', size: 4, power: 2, capacity: 5 },
        { id: 'greenhouse', name: 'Greenhouse', desc: 'Food and oxygen production', size: 3, power: 4, capacity: 10 },
        { id: 'solar', name: 'Solar Farm', desc: 'Renewable energy array', size: 4, power: -30, capacity: 2 },
        { id: 'training', name: 'Training Facility', desc: 'Crew training center', size: 3, power: 5, capacity: 25 },
        { id: 'medical', name: 'Medical Center', desc: 'Healthcare facility', size: 3, power: 6, capacity: 20 },
        { id: 'engineering', name: 'Engineering Bay', desc: 'Equipment workshop', size: 4, power: 7, capacity: 15 },
        { id: 'observatory', name: 'Observatory Tower', desc: 'Space observation facility', size: 2, power: 5, capacity: 10 }
    ],
    station: [
        { id: 'command', name: 'Command Module', desc: 'Station control center', size: 2, power: 4, capacity: 10 },
        { id: 'lab', name: 'Science Lab', desc: 'Zero-G research facility', size: 2, power: 6, capacity: 15 },
        { id: 'crew', name: 'Crew Quarters', desc: 'Living space for astronauts', size: 2, power: 3, capacity: 20 },
        { id: 'docking', name: 'Docking Port', desc: 'Spacecraft berthing interface', size: 1, power: 2, capacity: 5 },
        { id: 'solar_panel', name: 'Solar Panel Array', desc: 'Power generation system', size: 3, power: -20, capacity: 0 },
        { id: 'storage_module', name: 'Storage Module', desc: 'Supply storage compartment', size: 2, power: 1, capacity: 0 },
        { id: 'cupola', name: 'Observation Cupola', desc: 'Panoramic viewing module', size: 1, power: 2, capacity: 4 },
        { id: 'airlock', name: 'Airlock', desc: 'EVA access point', size: 1, power: 3, capacity: 2 }
    ],
    moon: [
        { id: 'habitat', name: 'Lunar Habitat', desc: 'Pressurized living quarters', size: 3, power: 4, capacity: 30 },
        { id: 'research', name: 'Research Lab', desc: 'Lunar science facility', size: 3, power: 6, capacity: 20 },
        { id: 'power', name: 'Nuclear Reactor', desc: 'Ruggedized power plant', size: 3, power: -40, capacity: 5 },
        { id: 'comms', name: 'Relay Station', desc: 'Earth-Moon communications', size: 2, power: 5, capacity: 5 },
        { id: 'greenhouse', name: 'Sealed Greenhouse', desc: 'Pressurized agriculture', size: 3, power: 5, capacity: 10 },
        { id: 'solar', name: 'Solar Array', desc: 'Low-angle panel system', size: 4, power: -20, capacity: 2 },
        { id: 'storage', name: 'Supply Depot', desc: 'Resource storage', size: 3, power: 2, capacity: 5 },
        { id: 'engineering', name: 'Maintenance Bay', desc: 'Equipment servicing', size: 3, power: 5, capacity: 10 },
        { id: 'medical', name: 'Med Bay', desc: 'Emergency medical facility', size: 2, power: 4, capacity: 10 }
    ],
    mars: [
        { id: 'colony', name: 'Colony Hub', desc: 'Main habitation complex', size: 4, power: 6, capacity: 50 },
        { id: 'research', name: 'Mars Lab', desc: 'Planetary research center', size: 3, power: 7, capacity: 25 },
        { id: 'reactor', name: 'Fusion Reactor', desc: 'High-output power system', size: 4, power: -60, capacity: 8 },
        { id: 'comms', name: 'Deep Space Relay', desc: 'Interplanetary communications', size: 2, power: 6, capacity: 5 },
        { id: 'farm', name: 'Hydroponics Farm', desc: 'Advanced food production', size: 4, power: 6, capacity: 15 },
        { id: 'solar', name: 'Dust-Resistant Solar', desc: 'Hardened solar panels', size: 4, power: -15, capacity: 2 },
        { id: 'storage', name: 'Resource Silo', desc: 'Large-scale storage', size: 3, power: 2, capacity: 5 },
        { id: 'engineering', name: 'Fabrication Plant', desc: 'Manufacturing facility', size: 4, power: 8, capacity: 20 },
        { id: 'medical', name: 'Hospital Module', desc: 'Full medical facility', size: 3, power: 5, capacity: 15 },
        { id: 'observatory', name: 'Mars Observatory', desc: 'Atmospheric research', size: 2, power: 4, capacity: 10 }
    ],
    asteroid: [
        { id: 'mining_rig', name: 'Mining Rig', desc: 'Resource extraction platform', size: 5, power: 15, capacity: 10 },
        { id: 'refinery', name: 'Ore Refinery', desc: 'Material processing plant', size: 4, power: 12, capacity: 15 },
        { id: 'habitat', name: 'Miner Quarters', desc: 'Crew accommodation', size: 2, power: 3, capacity: 20 },
        { id: 'power', name: 'RTG Power Unit', desc: 'Radioisotope generator', size: 2, power: -25, capacity: 3 },
        { id: 'storage', name: 'Ore Storage', desc: 'Raw material depot', size: 4, power: 1, capacity: 0 },
        { id: 'docking', name: 'Transport Dock', desc: 'Cargo ship berth', size: 3, power: 4, capacity: 5 },
        { id: 'comms', name: 'Beacon Tower', desc: 'Navigation and comms', size: 1, power: 3, capacity: 3 },
        { id: 'repair', name: 'Repair Bay', desc: 'Equipment maintenance', size: 3, power: 5, capacity: 10 }
    ]
};
