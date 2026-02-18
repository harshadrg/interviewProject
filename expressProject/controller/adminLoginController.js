export const adminLoginController = async (req, res) => {
    try {
        // 1. Validate that req.body exists (prevents crashes if middleware fails)
        if (!req.body) {
            return res.status(400).json({ message: "Invalid request body" });
        }

        const { adminusername, adminpassword } = req.body;

        // 2. Comprehensive validation (Checking for existence, type, and content)
        const isInvalid = (field) => !field || typeof field !== 'string' || field.trim() === "";

        if (isInvalid(adminusername) || isInvalid(adminpassword)) {
            return res.status(400).json({ 
                success: false,
                message: "adminusername and adminpassword are required strings" 
            });
        }

        // 3. hardcoded adminusername and adminpassword
        const MOCK_USER = "admin";
        const MOCK_PASS = "adminpassword123";

        if (adminusername === MOCK_USER && adminpassword === MOCK_PASS) {
            return res.status(200).json({
                success: true,
                message: "Login successful!",
                user: { adminusername } // NEVER return the adminpassword in the response
            });
        }

        // 4. Generic error for failed login (Security tip: don't say WHICH one was wrong)
        return res.status(401).json({ 
            success: false,
            message: "Invalid adminusername or adminpassword" 
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