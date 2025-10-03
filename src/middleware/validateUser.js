const validateUser = (req, res, next) => {
    const { name, surname, email, level, age } = req.body;

    const errors = [];

    // Name validation
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        errors.push('Name must be at least 3 characters long');
    }

    // Surname validation
    if (!surname || typeof surname !== 'string' || surname.trim().length < 3) {
        errors.push('Surname must be at least 3 characters long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        errors.push('A valid email address is required');
    }

    // Level validation
    const validLevels = ['chef', 'baker', 'amateur'];
    if (!level || !validLevels.includes(level.toLowerCase())) {
        errors.push('Difficulty must be either chef, baker, or amateur');
    }

    // Age validation
    if (!age || typeof age !== 'number' || age <= 0 || !Number.isInteger(age)) {
        errors.push('Age must be a positive integer');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = validateUser;