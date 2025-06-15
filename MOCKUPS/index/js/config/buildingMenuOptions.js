// js/config/buildingMenuOptions.js
const BUILDING_MENU_OPTIONS = {
    admin: [
        { id: 'hire', title: 'Hire Staff', desc: 'Recruit new personnel' },
        { id: 'budget', title: 'Manage Budget', desc: 'Allocate agency funds' },
        { id: 'missions', title: 'Review Missions', desc: 'Check mission status' },
        { id: 'upgrade', title: 'Upgrade Facility', desc: 'Expand admin capabilities' }
    ],
    launch: [
        { id: 'schedule', title: 'Launch Schedule', desc: 'Plan upcoming launches' },
        { id: 'prep', title: 'Prepare Vehicle', desc: 'Ready rocket for launch' },
        { id: 'fuel', title: 'Fuel Management', desc: 'Monitor propellant levels' },
        { id: 'abort', title: 'Emergency Systems', desc: 'Configure abort procedures' }
    ],
    research: [
        { id: 'projects', title: 'Research Projects', desc: 'View active experiments' },
        { id: 'assign', title: 'Assign Scientists', desc: 'Allocate research teams' },
        { id: 'tech', title: 'Technology Tree', desc: 'Unlock new technologies' },
        { id: 'data', title: 'Analyze Data', desc: 'Review research findings' }
    ],
    habitat: [
        { id: 'crew', title: 'Crew Quarters', desc: 'Manage living assignments' },
        { id: 'morale', title: 'Recreation', desc: 'Boost crew morale' },
        { id: 'capacity', title: 'Expand Capacity', desc: 'Add more living space' },
        { id: 'life', title: 'Life Support', desc: 'Monitor air and water' }
    ],
    power: [
        { id: 'output', title: 'Power Output', desc: 'Adjust generation levels' },
        { id: 'maintain', title: 'Maintenance', desc: 'Schedule repairs' },
        { id: 'backup', title: 'Backup Systems', desc: 'Configure redundancy' },
        { id: 'efficiency', title: 'Optimize', desc: 'Improve efficiency' }
    ],
    comms: [
        { id: 'transmit', title: 'Transmissions', desc: 'Send/receive messages' },
        { id: 'track', title: 'Tracking', desc: 'Monitor spacecraft' },
        { id: 'relay', title: 'Relay Network', desc: 'Configure connections' },
        { id: 'upgrade', title: 'Upgrade Antennas', desc: 'Increase range' }
    ],
    hangar: [
        { id: 'vehicles', title: 'Vehicle Bay', desc: 'Manage rovers and craft' },
        { id: 'repair', title: 'Repair Shop', desc: 'Fix damaged equipment' },
        { id: 'inventory', title: 'Parts Inventory', desc: 'Track spare parts' },
        { id: 'deploy', title: 'Deploy Vehicle', desc: 'Send out missions' }
    ],
    storage: [
        { id: 'inventory', title: 'Inventory', desc: 'View stored resources' },
        { id: 'transfer', title: 'Transfer Goods', desc: 'Move supplies' },
        { id: 'capacity', title: 'Expand Storage', desc: 'Increase capacity' },
        { id: 'logistics', title: 'Supply Chain', desc: 'Manage deliveries' }
    ],
    greenhouse: [
        { id: 'crops', title: 'Crop Management', desc: 'Plant and harvest' },
        { id: 'oxygen', title: 'O2 Production', desc: 'Monitor oxygen output' },
        { id: 'research', title: 'Botanical Research', desc: 'Develop new strains' },
        { id: 'expand', title: 'Add Modules', desc: 'Increase growing area' }
    ],
    solar: [
        { id: 'angle', title: 'Panel Angle', desc: 'Optimize sun tracking' },
        { id: 'clean', title: 'Clean Panels', desc: 'Remove dust and debris' },
        { id: 'battery', title: 'Battery Storage', desc: 'Manage power reserves' },
        { id: 'expand', title: 'Add Arrays', desc: 'Install more panels' }
    ],
    training: [
        { id: 'programs', title: 'Training Programs', desc: 'Design curricula' },
        { id: 'simulate', title: 'Run Simulations', desc: 'Practice missions' },
        { id: 'evaluate', title: 'Evaluate Crew', desc: 'Test competencies' },
        { id: 'specialize', title: 'Specializations', desc: 'Advanced training' }
    ],
    medical: [
        { id: 'patients', title: 'Patient Care', desc: 'Treat crew members' },
        { id: 'supplies', title: 'Medical Supplies', desc: 'Manage inventory' },
        { id: 'emergency', title: 'Emergency Response', desc: 'Trauma procedures' },
        { id: 'research', title: 'Medical Research', desc: 'Study space medicine' }
    ],
    engineering: [
        { id: 'fabricate', title: 'Fabrication', desc: 'Build components' },
        { id: 'repair', title: 'Repairs', desc: 'Fix equipment' },
        { id: 'design', title: 'Design Lab', desc: 'Create blueprints' },
        { id: 'tools', title: 'Tool Management', desc: 'Maintain workshop' }
    ],
    observatory: [
        { id: 'observe', title: 'Observations', desc: 'Schedule telescope time' },
        { id: 'analyze', title: 'Data Analysis', desc: 'Process images' },
        { id: 'discover', title: 'Discoveries', desc: 'Catalog findings' },
        { id: 'calibrate', title: 'Calibration', desc: 'Align instruments' }
    ],
    command: [
        { id: 'control', title: 'Station Control', desc: 'Monitor all systems' },
        { id: 'orbit', title: 'Orbital Adjust', desc: 'Maintain altitude' },
        { id: 'dock', title: 'Docking Control', desc: 'Guide spacecraft' },
        { id: 'emergency', title: 'Emergency Ops', desc: 'Crisis management' }
    ],
    colony: [
        { id: 'expand', title: 'Expand Colony', desc: 'Add new sections' },
        { id: 'terraform', title: 'Terraforming', desc: 'Atmospheric projects' },
        { id: 'govern', title: 'Governance', desc: 'Colony administration' },
        { id: 'trade', title: 'Trade Routes', desc: 'Interplanetary commerce' }
    ],
    mining_rig: [
        { id: 'drill', title: 'Drilling Ops', desc: 'Extract resources' },
        { id: 'scan', title: 'Mineral Scan', desc: 'Analyze composition' },
        { id: 'process', title: 'Processing', desc: 'Refine raw ore' },
        { id: 'transport', title: 'Shipping', desc: 'Send to Earth' }
    ],
    // Add to BUILDING_MENU_OPTIONS:
    lab: [
        { id: 'experiments', title: 'Run Experiments', desc: 'Conduct zero-g research' },
        { id: 'data', title: 'Analyze Data', desc: 'Review experiment results' },
        { id: 'equipment', title: 'Equipment Status', desc: 'Check lab instruments' },
        { id: 'schedule', title: 'Lab Schedule', desc: 'Book experiment time' }
    ],
    crew: [
        { id: 'assignments', title: 'Crew Assignments', desc: 'View quarters allocation' },
        { id: 'comfort', title: 'Comfort Settings', desc: 'Adjust environment' },
        { id: 'personal', title: 'Personal Storage', desc: 'Manage belongings' },
        { id: 'schedule', title: 'Sleep Schedule', desc: 'Set rest periods' }
    ],
    docking: [
        { id: 'status', title: 'Docking Status', desc: 'View port availability' },
        { id: 'schedule', title: 'Arrival Schedule', desc: 'Incoming spacecraft' },
        { id: 'procedures', title: 'Docking Procedures', desc: 'Safety protocols' },
        { id: 'maintenance', title: 'Port Maintenance', desc: 'Service docking ports' }
    ],
    solar_panel: [
        { id: 'output', title: 'Power Output', desc: 'Current generation' },
        { id: 'efficiency', title: 'Panel Efficiency', desc: 'Performance metrics' },
        { id: 'orientation', title: 'Sun Tracking', desc: 'Adjust panel angle' },
        { id: 'maintenance', title: 'Panel Health', desc: 'Check for damage' }
    ],
    storage_module: [
        { id: 'inventory', title: 'Module Inventory', desc: 'View stored items' },
        { id: 'organize', title: 'Organize Storage', desc: 'Rearrange supplies' },
        { id: 'request', title: 'Request Supplies', desc: 'Order from Earth' },
        { id: 'capacity', title: 'Storage Capacity', desc: 'Available space' }
    ],
    cupola: [
        { id: 'view', title: 'Earth View', desc: 'Current orientation' },
        { id: 'photography', title: 'Photography Mode', desc: 'Camera controls' },
        { id: 'observations', title: 'Log Observations', desc: 'Record sightings' },
        { id: 'schedule', title: 'Viewing Schedule', desc: 'Book cupola time' }
    ],
    airlock: [
        { id: 'eva', title: 'Schedule EVA', desc: 'Plan spacewalk' },
        { id: 'suits', title: 'Suit Status', desc: 'Check EMU readiness' },
        { id: 'procedures', title: 'EVA Procedures', desc: 'Safety checklist' },
        { id: 'depressurize', title: 'Cycle Airlock', desc: 'Begin EVA sequence' }
    ],
    reactor: [
        { id: 'output', title: 'Reactor Output', desc: 'Current power level' },
        { id: 'temperature', title: 'Core Temperature', desc: 'Monitor heat levels' },
        { id: 'fuel', title: 'Fuel Status', desc: 'Remaining fuel rods' },
        { id: 'safety', title: 'Safety Systems', desc: 'Emergency protocols' }
    ],
    farm: [
        { id: 'crops', title: 'Crop Status', desc: 'Growth monitoring' },
        { id: 'harvest', title: 'Harvest Schedule', desc: 'Ready for collection' },
        { id: 'nutrients', title: 'Nutrient Mix', desc: 'Adjust solution' },
        { id: 'lighting', title: 'Grow Lights', desc: 'Optimize spectrum' }
    ],
    refinery: [
        { id: 'processing', title: 'Processing Queue', desc: 'Current operations' },
        { id: 'output', title: 'Refined Materials', desc: 'Production stats' },
        { id: 'efficiency', title: 'Refinery Efficiency', desc: 'Optimize process' },
        { id: 'maintenance', title: 'Equipment Status', desc: 'Service machinery' }
    ],
    repair: [
        { id: 'queue', title: 'Repair Queue', desc: 'Pending repairs' },
        { id: 'tools', title: 'Tool Inventory', desc: 'Available equipment' },
        { id: 'diagnostics', title: 'Run Diagnostics', desc: 'System check' },
        { id: 'parts', title: 'Spare Parts', desc: 'Component inventory' }
    ]
};
