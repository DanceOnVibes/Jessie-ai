import type { KnowledgeItem } from "@/lib/jessie-core/knowledge-types";

export const spaceKnowledge: KnowledgeItem[] = [
  {
    id: "space-solar-system",
    domain: "space",
    slug: "solar-system",
    title: "The solar system",
    summary: "The Sun and the worlds that travel around it.",
    simple:
      "The solar system is the Sun and everything held by its gravity, including eight planets, their moons, and smaller icy or rocky bodies.",
    curious:
      "From the Sun outward the planets are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. The first four are smaller and rocky. The last four are much larger. Pluto is a dwarf planet, not the ninth planet.",
    deep:
      "The planets orbit the Sun in ellipses that are nearly circles. Asteroids are mostly rocky leftovers between Mars and Jupiter. Comets are icy bodies that grow a tail when they near the Sun. A model with the planets in a straight line is a diagram, not a photograph of where they are tonight.",
    keyTerms: ["Sun", "planet", "orbit", "dwarf planet"],
    sourceLabels: ["NASA Solar System"],
    sourceLinks: ["https://science.nasa.gov/solar-system/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A clear teaching chart of the Sun and eight planets in order, with Pluto marked separately as a dwarf planet.",
  },
  {
    id: "space-gravity",
    domain: "space",
    slug: "gravity-and-orbits",
    title: "Gravity and orbits",
    summary: "Why things fall, and why the Moon does not fall straight down.",
    simple:
      "Gravity is the pull between things that have mass. An orbit is a path where something keeps falling around another world instead of into it.",
    curious:
      "Earth's gravity holds you to the ground and holds the Moon in its path. The Moon is moving sideways fast enough that, as it falls, the ground curves away. Day and night come from Earth spinning. A year is one trip around the Sun.",
    deep:
      "More mass means a stronger pull. Distance weakens it. Weight is the force of gravity on an object, so weight can change on another world while the amount of matter stays the same. Astronauts in orbit are still in gravity. They feel weightless because they and their craft are falling together.",
    keyTerms: ["gravity", "mass", "orbit", "weight"],
    sourceLabels: ["NASA"],
    sourceLinks: ["https://science.nasa.gov/solar-system/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A simple diagram of the Moon falling around Earth, with a curved arrow and no science-fiction city.",
  },
  {
    id: "space-moon",
    domain: "space",
    slug: "the-moon",
    title: "The Moon",
    summary: "Earth's companion, and why its shape in the sky changes.",
    simple:
      "The Moon shines by reflecting sunlight. Its phase changes because we see a different amount of its lit half as it orbits Earth.",
    curious:
      "The cycle from new Moon to full Moon and back takes about 29.5 days. A new Moon is the lit half facing away from us. A full Moon is the lit half facing toward us. Earth's shadow causes a lunar eclipse, not the ordinary monthly phases.",
    deep:
      "The same side of the Moon faces Earth because the Moon turns once in the same time it orbits once. That far side is not a dark side. It gets daylight too. The Moon has no breathable air and no liquid water on its surface, so it is not a place to visit without a spacecraft.",
    keyTerms: ["phase", "reflection", "eclipse", "far side"],
    sourceLabels: ["NASA Moon"],
    sourceLinks: ["https://science.nasa.gov/moon/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "Eight small Moons in phase order on a dark blue card, labelled from new to full and back.",
  },
  {
    id: "space-stars",
    domain: "space",
    slug: "stars-and-the-milky-way",
    title: "Stars and the Milky Way",
    summary: "The Sun is a star. The Milky Way is our city of stars.",
    simple:
      "A star is a huge ball of hot gas that makes its own light. The Sun is the nearest star. The Milky Way is the galaxy that holds the Sun.",
    curious:
      "Other stars look small because they are far away, not because they are all tiny. A light-year is the distance light travels in one year. It is a ruler for space, not a unit of time. Our galaxy contains billions of stars.",
    deep:
      "Stars differ in size, colour, and brightness. Colour is related to temperature: a blue-white star is hotter at its surface than a red one. The Milky Way is a barred spiral. From inside it, we see the crowded disc as a pale band. Andromeda is another galaxy, not a star inside ours.",
    keyTerms: ["star", "Sun", "light-year", "galaxy"],
    sourceLabels: ["NASA"],
    sourceLinks: ["https://science.nasa.gov/universe/stars/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A classroom night sky with the Milky Way as a soft band and one labelled arrow pointing to our Sun's place inside it.",
  },
];
