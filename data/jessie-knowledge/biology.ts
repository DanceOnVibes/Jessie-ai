import type { KnowledgeItem } from "@/lib/jessie-core/knowledge-types";

export const biologyKnowledge: KnowledgeItem[] = [
  {
    id: "bio-what-is-life",
    domain: "biology",
    slug: "what-is-life",
    title: "What is life?",
    summary: "A gentle starting place for thinking about living systems.",
    simple:
      "Life is usually described by a pattern of qualities: living things are made of cells, use energy, respond to their surroundings, grow, and reproduce.",
    curious:
      "Biologists do not define life with one perfect sentence. Instead, they look for a cluster of traits: cellular organization, metabolism, response to stimuli, growth, reproduction, and the ability to evolve over generations.",
    deep:
      "Life is best understood as an organized process rather than a single ingredient. Cells maintain internal order, exchange matter and energy with the environment, and participate in systems capable of heredity and evolution. Borderline cases like viruses are part of why the question stays scientifically alive.",
    keyTerms: ["cells", "metabolism", "stimuli", "reproduction", "evolution"],
    sourceLabels: ["OpenStax Biology 2e", "NASA Astrobiology"],
    sourceLinks: [
      "https://openstax.org/details/books/biology-2e",
      "https://astrobiology.nasa.gov/",
    ],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A dreamy scientific tableau showing cells, leaves, water, and starlight linked in one flowing ecosystem.",
  },
  {
    id: "bio-cells",
    domain: "biology",
    slug: "cells",
    title: "Cells",
    summary: "The smallest living units that make larger life possible.",
    simple:
      "Cells are the tiny living units that build every plant, animal, and person.",
    curious:
      "Cells are the basic structural and functional units of life. Some organisms are made of just one cell, while others are made of trillions working together.",
    deep:
      "Cells organize life by separating inside from outside with membranes, controlling chemical reactions, storing information in DNA, and coordinating energy use. Prokaryotic and eukaryotic cells differ in complexity, especially in how they organize internal structures.",
    keyTerms: ["cell membrane", "DNA", "prokaryote", "eukaryote"],
    sourceLabels: ["OpenStax Biology 2e"],
    sourceLinks: ["https://openstax.org/details/books/biology-2e"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "Cross-section of a luminous cell with soft-labeled organelles in watercolor style.",
  },
  {
    id: "bio-photosynthesis",
    domain: "biology",
    slug: "photosynthesis",
    title: "Photosynthesis",
    summary: "How plants turn light into stored chemical energy.",
    simple:
      "Photosynthesis is how plants use sunlight to help make food from water and carbon dioxide.",
    curious:
      "In photosynthesis, plants capture light energy and use it to build sugars from carbon dioxide and water. Oxygen is released as part of the process.",
    deep:
      "Photosynthesis occurs mainly in chloroplasts. Light-dependent reactions capture solar energy, and carbon fixation pathways help build carbohydrates that store energy in chemical bonds. The process links sunlight to most food webs on Earth.",
    keyTerms: ["chloroplast", "glucose", "carbon dioxide", "oxygen"],
    sourceLabels: ["Khan Academy", "OpenStax Biology 2e"],
    sourceLinks: [
      "https://www.khanacademy.org/science/biology/photosynthesis-in-plants",
      "https://openstax.org/details/books/biology-2e",
    ],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "Sunlight entering a leaf, chloroplasts glowing softly, sugars forming like golden threads.",
  },
  {
    id: "bio-ecosystems",
    domain: "biology",
    slug: "ecosystems-and-food-webs",
    title: "Ecosystems and food webs",
    summary: "How living things and environments shape one another.",
    simple:
      "An ecosystem is a community of living things interacting with each other and with their environment.",
    curious:
      "Food webs show how energy moves through ecosystems. Plants often form the base, herbivores and predators build above them, and decomposers help return materials to the system.",
    deep:
      "Ecosystems are dynamic networks shaped by energy flow, nutrient cycling, species interactions, and environmental conditions. Food webs are more realistic than simple food chains because most organisms interact with multiple others across overlapping pathways.",
    keyTerms: ["ecosystem", "food web", "energy flow", "decomposer"],
    sourceLabels: ["OpenStax Biology 2e"],
    sourceLinks: ["https://openstax.org/details/books/biology-2e"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A layered woodland food web illustrated like a living tapestry of roots, moths, leaves, birds, and fungi.",
  },
  {
    id: "bio-body-clock",
    domain: "biology",
    slug: "sleep-and-body-clock",
    title: "Sleep and the body clock",
    summary: "A non-medical look at rhythm, light, and rest.",
    simple:
      "Your body keeps time using internal rhythms, and light helps guide that clock.",
    curious:
      "Circadian rhythms are near-24-hour cycles that influence sleep, alertness, temperature, and hormone timing. Light is one of the strongest signals that helps set the clock.",
    deep:
      "Circadian timing is coordinated by internal biological systems that respond to environmental cues, especially light. These rhythms affect many body processes, but this topic should be explained gently and never turned into medical advice in Jessie’s voice.",
    keyTerms: ["circadian rhythm", "light cues", "sleep", "body clock"],
    sourceLabels: ["NIH", "NIGMS"],
    sourceLinks: [
      "https://www.nih.gov/",
      "https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms.aspx",
    ],
    audience: "public",
    safetyLevel: "sensitive",
    notes: "Keep non-medical. Wonder, not advice.",
  },
];
