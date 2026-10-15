import type { KnowledgeItem } from "@/lib/jessie-core/knowledge-types";

export const geographyKnowledge: KnowledgeItem[] = [
  {
    id: "geo-maps",
    domain: "geography",
    slug: "maps",
    title: "Maps",
    summary: "A flat picture of a place, with a way to read distance and direction.",
    simple:
      "A map is a drawing of a place from above. The key explains the symbols. The scale links a distance on the paper to a distance on the ground. North is usually at the top, and the compass is how you check.",
    curious:
      "A large-scale map shows a small area in more detail, such as a street. A small-scale map shows a whole country or continent with less detail. The grid helps you say where something is without pointing.",
    deep:
      "No flat map can show the round Earth without stretching something. A map chooses what to keep true: shape, area, distance, or direction. That is why Greenland can look huge on one world map and more accurate on another. The map is a model, not the ground itself.",
    keyTerms: ["map", "scale", "key", "compass"],
    sourceLabels: ["Ordnance Survey Mapzone"],
    sourceLinks: ["https://www.ordnancesurvey.co.uk/mapzone/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A paper map of a coast and a wood, with a compass rose, a simple key, and a scale bar.",
  },
  {
    id: "geo-continents",
    domain: "geography",
    slug: "continents-and-oceans",
    title: "Continents and oceans",
    summary: "The largest pieces of land, and the water around them.",
    simple:
      "School maps usually show seven continents: Africa, Antarctica, Asia, Europe, North America, South America, and Australia. Five oceans surround them: Pacific, Atlantic, Indian, Southern, and Arctic.",
    curious:
      "A continent is a great land mass. An ocean is a vast body of salt water. Europe and Asia share one land mass, which is why some books say Eurasia, but school maps still teach them as two continents. Australia is the continent. Oceania is the wider region of islands around it.",
    deep:
      "The borders of continents are agreed teaching boundaries, not a line nature painted. Islands near a continent are often grouped with it. The Southern Ocean is the water around Antarctica. The Pacific is the largest ocean.",
    keyTerms: ["continent", "ocean", "land mass", "island"],
    sourceLabels: ["Ordnance Survey Mapzone"],
    sourceLinks: ["https://www.ordnancesurvey.co.uk/mapzone/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A clear world map with seven labelled continents and five labelled oceans, north at the top.",
  },
  {
    id: "geo-position",
    domain: "geography",
    slug: "latitude-and-longitude",
    title: "Finding a place",
    summary: "Two sets of lines that give a place an address on Earth.",
    simple:
      "Latitude says how far north or south of the equator a place is. Longitude says how far east or west of the prime meridian. Together they locate a point.",
    curious:
      "The equator is the line halfway between the poles. The prime meridian runs through Greenwich in London and is numbered 0 degrees longitude. Places east of it have east longitude. Places west have west longitude. The poles are the ends of Earth's spinning axis.",
    deep:
      "Latitude lines run east to west and stay parallel. Longitude lines run from pole to pole and meet at the poles. A coordinate is read latitude first, then longitude. This grid is a model on the globe. A paper map still needs its own grid as well.",
    keyTerms: ["latitude", "longitude", "equator", "prime meridian"],
    sourceLabels: ["Ordnance Survey Mapzone"],
    sourceLinks: ["https://www.ordnancesurvey.co.uk/mapzone/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A globe with the equator and the Greenwich meridian drawn clearly, and one labelled point where they help fix a city.",
  },
  {
    id: "geo-climate",
    domain: "geography",
    slug: "weather-climate-rivers",
    title: "Weather, climate, and rivers",
    summary: "Today's sky, the usual pattern, and water moving downhill.",
    simple:
      "Weather is what the sky is doing now. Climate is the usual pattern over many years. A river flows downhill from its source to its mouth.",
    curious:
      "Places near the equator generally receive more direct sunlight, so they are warmer. High land is usually cooler than low land nearby. A river's source is where it begins. Its mouth is where it meets a lake or the sea. The coast is where the land meets the sea.",
    deep:
      "Climate is not one hot day. It is the pattern of temperature and rain across years. Two places on the same latitude can differ because of height, ocean currents, and the way mountains block wet air. A river basin is all the land whose water drains into that river.",
    keyTerms: ["weather", "climate", "source", "mouth"],
    sourceLabels: ["NASA Earth"],
    sourceLinks: ["https://science.nasa.gov/earth/"],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "One hill in two small panels: today's rain cloud labelled weather, and a yearly pattern labelled climate, with a river from source to mouth.",
  },
];
