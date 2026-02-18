export const adminLoginController = async (req, res) => {
    try {
        // 1. Validate that req.body exists (prevents crashes if middleware fails)
        if (!req.body) {
            return res.status(400).json({ message: "Invalid request body" });
        }

        const { username, password } = req.body;

        // 2. Comprehensive validation (Checking for existence, type, and content)
        const isInvalid = (field) => !field || typeof field !== 'string' || field.trim() === "";

        if (isInvalid(username) || isInvalid(password)) {
            return res.status(400).json({ 
                success: false,
                message: "username and password are required strings" 
            });
        }

        // 3. hardcoded username and password
        const MOCK_USER = "admin";
        const MOCK_PASS = "password123";

        if (username === MOCK_USER && password === MOCK_PASS) {
            return res.status(200).json({
                success: true,
                message: "Login successful!",
                user: { username } // NEVER return the password in the response
            });
        }

        // 4. Generic error for failed login (Security tip: don't say WHICH one was wrong)
        return res.status(401).json({ 
            success: false,
            message: "Invalid username or password" 
        });

    } catch (error) {
        // Log the actual error for the developer, but send a generic one to the user
        console.error("System Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};