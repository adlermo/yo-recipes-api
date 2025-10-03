const validateRecipe = (req, res, next) => {
    try {
        const { title, ingredients, instructions, cookingTime, difficulty, servings, userId } = req.body;

        const errors = [];

        // UserId validation
        if (!userId || typeof userId !== 'string' || userId.trim().length < 0) {
            errors.push('UserId is required and must be a valid string');
        }

        // Title validation
        if (!title || typeof title !== 'string' || title.trim().length < 3) {
            errors.push('Title must be at least 3 characters long');
        }

        // Ingredients validation
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            errors.push('At least one ingredient is required');
        } else {
            const invalidIngredients = ingredients.filter(ing =>
                !ing.item || !ing.amount || typeof ing.item !== 'string' || ing.item.trim().length === 0
            );
            if (invalidIngredients.length > 0) {
                errors.push('All ingredients must have an item name and amount');
            }
        }

        // Instructions validation
        if (!Array.isArray(instructions) || instructions.length === 0) {
            errors.push('At least one instruction step is required');
        } else {
            const invalidInstructions = instructions.filter(step =>
                typeof step !== 'string' || step.trim().length === 0
            );
            if (invalidInstructions.length > 0) {
                errors.push('All instruction steps must be non-empty strings');
            }
        }

        // Cooking time validation
        if (!cookingTime || typeof cookingTime !== 'number' || cookingTime <= 0) {
            errors.push('Cooking time must be a positive number');
        }

        // Difficulty validation
        const validDifficulties = ['easy', 'medium', 'hard'];
        if (!difficulty || !validDifficulties.includes(difficulty.toLowerCase())) {
            errors.push('Difficulty must be either easy, medium, or hard');
        }

        // Servings validation
        if (!servings || typeof servings !== 'number' || servings <= 0 || !Number.isInteger(servings)) {
            errors.push('Servings must be a positive integer');
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server error during validation', error: error.message });
    }
};

module.exports = validateRecipe;