export const userLoginController = async (req, res) => {
    try {

        // 1. Validate that req.body exists (prevents crashes if middleware fails)
        if (!req.body) {
            return res.status(400).json({ message: "Invalid request body" });
        }

        const { username, password } = req.body;

        //2. Checks if fields exist, and aren't just whitespace
        if (!username?.trim() || !password?.trim()) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide both a username and a password." 
            });
        }

        // 2. Security: Clean the data
        const cleanUsername = username.trim();

        // 3. Return the greeting 
        return res.status(200).json({
            success: true,
            message: `Hello ${cleanUsername}`,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};