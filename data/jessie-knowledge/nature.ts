import type { KnowledgeItem } from "@/lib/jessie-core/knowledge-types";

export const natureKnowledge: KnowledgeItem[] = [
  {
    id: "nature-habitat",
    domain: "nature",
    slug: "habitats",
    title: "Habitats",
    summary: "The place that gives a living thing what it needs.",
    simple:
      "A habitat is the place where a living thing finds food, water, shelter, and room to raise young.",
    curious:
      "A woodland, a pond, a rock pool, and a garden hedge are different habitats. Each one suits different plants and animals because the light, water, and shelter are different.",
    deep:
      "A habitat is the physical home. An ecosystem is that home plus the living community and the way energy and materials move through it. One wood can hold many smaller habitats, from the canopy to the leaf litter.",
    keyTerms: ["habitat", "shelter", "ecosystem", "community"],
    sourceLabels: ["OpenStax Biology 2e"],
    sourceLinks: ["https://openstax.org/details/books/biology-2e"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A quiet oak wood shown in layers: canopy, trunk, and leaf litter, each with its own small residents.",
  },
  {
    id: "nature-food-web",
    domain: "nature",
    slug: "food-webs",
    title: "Food webs",
    summary: "How energy moves from sunlight into living things.",
    simple:
      "Plants make food using sunlight. Animals eat plants or other animals. Decomposers break the leftovers down.",
    curious:
      "A food chain is one path, such as leaf, caterpillar, bird. A food web is many paths joined together. Most animals eat more than one thing, so a web is the truer picture.",
    deep:
      "Producers capture light and store it in food. Consumers transfer some of that energy when they eat. Decomposers return materials to the soil. Energy is not recycled. It flows through and is lost as heat. Materials such as carbon and nutrients can cycle.",
    keyTerms: ["producer", "consumer", "decomposer", "food web"],
    sourceLabels: ["OpenStax Biology 2e"],
    sourceLinks: ["https://openstax.org/details/books/biology-2e"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A clear teaching diagram of a woodland food web, with the Sun at the top and fungi returning leaves to the soil.",
  },
  {
    id: "nature-water-cycle",
    domain: "nature",
    slug: "water-cycle",
    title: "The water cycle",
    summary: "The same water, moving through air, rivers, and living things.",
    simple:
      "The Sun warms water, it rises as vapour, clouds form, and rain or snow brings the water back down.",
    curious:
      "Evaporation and transpiration move water into the air. Condensation makes droplets in clouds. Precipitation is rain, snow, sleet, or hail. Collection is water gathering in rivers, lakes, soil, and the sea.",
    deep:
      "The water cycle is a closed circulation of matter, driven by energy from the Sun and by gravity. Plants return water vapour through transpiration, so a forest is part of the cycle, not only the sky and the sea.",
    keyTerms: ["evaporation", "condensation", "precipitation", "transpiration"],
    sourceLabels: ["NASA Earth science"],
    sourceLinks: ["https://science.nasa.gov/earth/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A calm landscape loop of sea, rising mist, cloud, rain on a hill, and a river returning to the sea.",
  },
  {
    id: "nature-seasons",
    domain: "nature",
    slug: "seasons-and-adaptation",
    title: "Seasons and adaptation",
    summary: "Why the year changes, and how living things fit that change.",
    simple:
      "Seasons change because Earth is tilted as it travels around the Sun. Living things have traits that help them manage that change.",
    curious:
      "When a hemisphere leans toward the Sun, that half of Earth has longer days and more direct light. That is summer. An adaptation is a trait that helps a living thing survive in its habitat. It is built over many generations. It is not a choice the animal makes in one afternoon.",
    deep:
      "Earth is not closer to the Sun in summer. The tilt changes day length and the angle of sunlight. Migration, hibernation, leaf fall, and thick coats are different answers to the same seasonal problem. A trait counts as an adaptation only when it is inherited and useful in that environment.",
    keyTerms: ["tilt", "season", "adaptation", "hemisphere"],
    sourceLabels: ["NASA"],
    sourceLinks: ["https://science.nasa.gov/earth/facts/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "Four small panels of the same oak: blossom, full leaf, falling leaves, and bare winter branches.",
  },
];
