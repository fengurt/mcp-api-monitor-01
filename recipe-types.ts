/**
 * TypeScript interfaces for Recipe Entity based on Base44 API
 * API: https://app.base44.com/api/apps/6907f8149df3a6b0ccf8bfb3/entities/Recipe
 */

export interface Recipe {
  // Filterable fields (can be used in queries and updates)
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  dietary_tags: DietaryTag[];
  cuisine_type: CuisineType;
  prep_time: number;
  cook_time: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image_url: string;

  // System fields (automatically managed, read-only)
  id: string;
  created_date: string;
  updated_date: string;
  created_by_id: string;
  created_by: string;
  is_sample: boolean;
}

export type DietaryTag =
  | 'vegan'
  | 'vegetarian'
  | 'gluten_free'
  | 'high_protein'
  | 'keto'
  | 'paleo'
  | 'low_carb'
  | 'dairy_free';

export type CuisineType =
  | 'mediterranean'
  | 'mexican'
  | 'indian'
  | 'american'
  | 'asian'
  | 'italian'
  | 'french'
  | 'japanese'
  | 'middle_eastern'
  | 'other';

/**
 * Partial Recipe interface for updates (only includes filterable fields)
 */
export interface RecipeUpdate {
  title?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  dietary_tags?: DietaryTag[];
  cuisine_type?: CuisineType;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  image_url?: string;
}

/**
 * API configuration
 */
export const API_CONFIG = {
  baseUrl: 'https://app.base44.com/api/apps/6907f8149df3a6b0ccf8bfb3/entities/Recipe',
  apiKey: '674dc575177a4851b7a276bf7084f85b',
} as const;

/**
 * Fetch all recipes
 */
export async function fetchRecipeEntities(): Promise<Recipe[]> {
  const response = await fetch(API_CONFIG.baseUrl, {
    headers: {
      api_key: API_CONFIG.apiKey,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single recipe by ID
 */
export async function fetchRecipeById(entityId: string): Promise<Recipe> {
  const response = await fetch(`${API_CONFIG.baseUrl}/${entityId}`, {
    headers: {
      api_key: API_CONFIG.apiKey,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipe: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update a recipe entity
 */
export async function updateRecipeEntity(
  entityId: string,
  updateData: RecipeUpdate
): Promise<Recipe> {
  const response = await fetch(`${API_CONFIG.baseUrl}/${entityId}`, {
    method: 'PUT',
    headers: {
      api_key: API_CONFIG.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update recipe: ${response.statusText}`);
  }

  return response.json();
}

