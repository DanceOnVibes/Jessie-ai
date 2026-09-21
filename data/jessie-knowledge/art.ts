import type { KnowledgeItem } from "@/lib/jessie-core/knowledge-types";

export const artKnowledge: KnowledgeItem[] = [
  {
    id: "art-golden-hour",
    domain: "art",
    slug: "golden-hour",
    title: "Golden hour",
    summary: "Warm low light that softens edges and deepens feeling.",
    simple:
      "Golden hour is the warm light that appears near sunrise or sunset.",
    curious:
      "Golden hour creates long shadows, gentle contrast, and glowing skin tones. It often makes scenes feel nostalgic, tender, or cinematic.",
    deep:
      "Because the sun sits low, light travels through more atmosphere, warming its color and softening intensity. In visual direction, golden hour works beautifully with still compositions, haze, backlight, and muted warm palettes.",
    keyTerms: ["warm light", "backlight", "long shadows", "haze"],
    sourceLabels: [],
    sourceLinks: [],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A quiet meadow at golden hour with muted rose grasses and a soft amber sky.",
  },
  {
    id: "art-dusty-rose",
    domain: "art",
    slug: "dusty-rose-palette",
    title: "Dusty rose palette",
    summary: "A soft restrained palette with warmth and memory in it.",
    simple:
      "Dusty rose is a muted pink that feels soft, grown-up, and calm.",
    curious:
      "A dusty rose palette often pairs beautifully with cream, faded brown, moss, or pale gray-blue. It suggests gentleness without becoming sugary.",
    deep:
      "Muted palettes create emotional subtlety by lowering saturation and letting texture, shape, and light carry the image. Dusty rose works especially well in scenes meant to feel intimate, wistful, or quietly feminine.",
    keyTerms: ["palette", "muted color", "mood", "saturation"],
    sourceLabels: [],
    sourceLinks: [],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "Still-life palette study of dusty rose, cream, moss, and paper textures.",
  },
  {
    id: "art-negative-space",
    domain: "art",
    slug: "negative-space",
    title: "Negative space",
    summary: "Letting emptiness do part of the speaking.",
    simple:
      "Negative space is the open area around a subject that gives it room to breathe.",
    curious:
      "Using negative space can make an image feel calm, elegant, lonely, or focused depending on what surrounds the subject.",
    deep:
      "Negative space is not blankness for its own sake. It controls attention, pace, and emotional weight. Jessie should use it as a compositional choice when the feeling needs stillness, distance, or grace.",
    keyTerms: ["composition", "space", "focus", "stillness"],
    sourceLabels: [],
    sourceLinks: [],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A single moth centered in a wide pale field with delicate shadow and lots of breathing room.",
  },
  {
    id: "art-film-feel",
    domain: "art",
    slug: "soft-film-feel",
    title: "Soft film feel",
    summary: "Texture, grain, and imperfection that make an image breathe.",
    simple:
      "A soft film feel adds gentle grain, muted contrast, and a slightly nostalgic texture.",
    curious:
      "Film-like images often feel more alive because they carry softness, bloom, grain, and subtle color shifts instead of digital sharpness everywhere.",
    deep:
      "Jessie’s visual direction should treat film feeling as emotional texture, not just a filter. Grain, bloom, color rolloff, and slight imperfection can make scenes feel remembered rather than merely rendered.",
    keyTerms: ["film grain", "bloom", "texture", "nostalgia"],
    sourceLabels: [],
    sourceLinks: [],
    audience: "public",
    safetyLevel: "general",
    visualPromptIdea:
      "A quiet portrait with film grain, soft bloom, dusk mauve shadows, and warm skin light.",
  },
];
