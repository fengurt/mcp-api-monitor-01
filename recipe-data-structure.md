# Recipe Entity Data Structure

Based on the Base44 API response, here is the complete data structure for Recipe entities.

## API Endpoint
```
GET https://app.base44.com/api/apps/6907f8149df3a6b0ccf8bfb3/entities/Recipe
PUT https://app.base44.com/api/apps/6907f8149df3a6b0ccf8bfb3/entities/Recipe/{entityId}
```

## Headers
```
api_key: 674dc575177a4851b7a276bf7084f85b
Content-Type: application/json
```

## Recipe Entity Structure

The API returns an array of Recipe objects. Each Recipe has the following structure:

```typescript
interface Recipe {
  // Filterable fields (mentioned in API docs)
  title: string;                    // Recipe title (can contain Unicode/Chinese characters)
  description: string;              // Recipe description (can contain Unicode/Chinese characters)
  ingredients: string[];           // Array of ingredient strings
  instructions: string[];           // Array of instruction steps
  dietary_tags: string[];           // Array of dietary tags (e.g., "vegan", "gluten_free", "high_protein", "keto", "paleo", "low_carb", "vegetarian", "dairy_free")
  cuisine_type: string;             // Type of cuisine (e.g., "mediterranean", "mexican", "indian", "american", "asian", "italian", "french", "japanese", "middle_eastern", "other")
  prep_time: number;                // Preparation time in minutes (float)
  cook_time: number;                // Cooking time in minutes (float)
  servings: number;                 // Number of servings (float)
  calories: number;                 // Calories per serving (float)
  protein: number;                  // Protein in grams (float)
  carbs: number;                    // Carbohydrates in grams (float)
  fats: number;                     // Fats in grams (float)
  image_url: string;                // URL to recipe image (Unsplash URLs observed)
  
  // System fields (automatically managed)
  id: string;                       // Unique entity ID (MongoDB ObjectId format)
  created_date: string;             // ISO 8601 timestamp (e.g., "2025-11-03T00:49:11.181000")
  updated_date: string;             // ISO 8601 timestamp
  created_by_id: string;            // User ID who created the entity
  created_by: string;               // Email of the user who created the entity
  is_sample: boolean;               // Whether this is a sample/example entity
}
```

## Example Recipe Object

```json
{
  "title": "藜麦羽衣甘蓝沙拉 / Quinoa Kale Salad",
  "description": "Nutritious plant-based bowl / 营养植物碗",
  "ingredients": [
    "1 cup quinoa",
    "2 cups kale",
    "1 cup chickpeas",
    "1 avocado",
    "Tahini dressing"
  ],
  "instructions": [
    "Cook quinoa according to package",
    "Massage kale with lemon",
    "Roast chickpeas at 400°F",
    "Assemble and drizzle with tahini"
  ],
  "dietary_tags": [
    "vegan",
    "gluten_free"
  ],
  "cuisine_type": "mediterranean",
  "prep_time": 15.0,
  "cook_time": 20.0,
  "servings": 4.0,
  "calories": 385.0,
  "protein": 14.0,
  "carbs": 52.0,
  "fats": 15.0,
  "image_url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
  "id": "6907fc07afc58165d09e6da0",
  "created_date": "2025-11-03T00:49:11.181000",
  "updated_date": "2025-11-03T00:49:11.181000",
  "created_by_id": "6907f8149df3a6b0ccf8bfb4",
  "created_by": "meta1angt@gmail.com",
  "is_sample": false
}
```

## Field Types Summary

| Field | Type | Required | Filterable | Notes |
|-------|------|----------|------------|-------|
| `title` | string | Yes | Yes | Can contain Unicode characters |
| `description` | string | Yes | Yes | Can contain Unicode characters |
| `ingredients` | string[] | Yes | Yes | Array of ingredient strings |
| `instructions` | string[] | Yes | Yes | Array of instruction steps |
| `dietary_tags` | string[] | Yes | Yes | Common values: vegan, vegetarian, gluten_free, high_protein, keto, paleo, low_carb, dairy_free |
| `cuisine_type` | string | Yes | Yes | Values: mediterranean, mexican, indian, american, asian, italian, french, japanese, middle_eastern, other |
| `prep_time` | number (float) | Yes | Yes | Minutes |
| `cook_time` | number (float) | Yes | Yes | Minutes (can be 0.0) |
| `servings` | number (float) | Yes | Yes | Number of servings |
| `calories` | number (float) | Yes | Yes | Per serving |
| `protein` | number (float) | Yes | Yes | Grams per serving |
| `carbs` | number (float) | Yes | Yes | Grams per serving |
| `fats` | number (float) | Yes | Yes | Grams per serving |
| `image_url` | string | Yes | Yes | Full URL to image |
| `id` | string | Auto | No | MongoDB ObjectId |
| `created_date` | string | Auto | No | ISO 8601 timestamp |
| `updated_date` | string | Auto | No | ISO 8601 timestamp |
| `created_by_id` | string | Auto | No | User ID |
| `created_by` | string | Auto | No | User email |
| `is_sample` | boolean | Auto | No | Sample flag |

## Common Dietary Tags

- `vegan`
- `vegetarian`
- `gluten_free`
- `high_protein`
- `keto`
- `paleo`
- `low_carb`
- `dairy_free`

## Common Cuisine Types

- `mediterranean`
- `mexican`
- `indian`
- `american`
- `asian`
- `italian`
- `french`
- `japanese`
- `middle_eastern`
- `other`

## Usage Examples

### Fetching All Recipes
```javascript
async function fetchRecipeEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/6907f8149df3a6b0ccf8bfb3/entities/Recipe`, {
        headers: {
            'api_key': '674dc575177a4851b7a276bf7084f85b',
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data; // Returns array of Recipe objects
}
```

### Updating a Recipe
```javascript
async function updateRecipeEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/6907f8149df3a6b0ccf8bfb3/entities/Recipe/${entityId}`, {
        method: 'PUT',
        headers: {
            'api_key': '674dc575177a4851b7a276bf7084f85b',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });
    const data = await response.json();
    return data;
}
```

### Example Update Payload
```javascript
const updateData = {
    title: "Updated Recipe Title",
    description: "Updated description",
    // ... other filterable fields
    calories: 400.0,
    // Note: Don't include system fields like id, created_date, etc.
};
```

