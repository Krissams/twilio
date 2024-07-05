// Load the Twilio module
const twilio = require('twilio');

// Your Account SID and Auth Token from twilio.com/console
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';

// Initialize the Twilio client
const client = twilio(accountSid, authToken);

// Function to fetch cumulative statistics for the day
async function getCumulativeStatistics() {
    try {
        const flexWorkspaceSid = 'your_workspace_sid'; // Replace with your Flex Workspace SID
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Set to start of the day
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // Set to end of the day

        const cumulativeStatistics = await client.taskrouter
            .workspaces(flexWorkspaceSid)
            .statistics()
            .fetch({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            });

        console.log('Cumulative Statistics for the Day:', cumulativeStatistics);
    } catch (error) {
        console.error('Error fetching cumulative statistics:', error);
    }
}

// Call the function to fetch statistics
getCumulativeStatistics();