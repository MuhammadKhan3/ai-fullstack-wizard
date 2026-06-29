// Shared data for the Full Stack ecosystem visualization.
// Uses ONLY the existing portfolio brand colors — no new palette is introduced.
export const BRAND = {
  primary: "#0ea5e9", // portfolio.primary  (sky blue)
  accent: "#7c3aed", // portfolio.accent   (violet)
  secondary: "#0c4a6e", // portfolio.secondary (deep navy)
} as const;

export type LayerId = "frontend" | "backend" | "database" | "cloud";

export type SceneLayer = {
  id: LayerId;
  /** vertical position of the layer in the 3D scene */
  y: number;
  /** node color (brand palette only) */
  color: string;
  /** x positions of the nodes that make up this layer */
  nodeXs: number[];
};

// Stacked layers of the full-stack ecosystem: UI on top, cloud at the base.
export const SCENE_LAYERS: SceneLayer[] = [
  { id: "frontend", y: 2.1, color: BRAND.primary, nodeXs: [-1.7, 0, 1.7] },
  { id: "backend", y: 0.7, color: BRAND.accent, nodeXs: [-2.2, -0.75, 0.75, 2.2] },
  { id: "database", y: -0.7, color: BRAND.secondary, nodeXs: [-1.5, 0, 1.5] },
  { id: "cloud", y: -2.1, color: BRAND.primary, nodeXs: [-1.05, 1.05] },
];

// Maps each existing "Key Expertise" item (by its array index in AboutSection,
// content untouched) to a layer in the scene so hovering an item can highlight it.
// Order: Full Stack Development, Database Management, SaaS Platforms, Cloud Deployment.
export const EXPERTISE_LAYER_BY_INDEX: LayerId[] = ["frontend", "database", "backend", "cloud"];
