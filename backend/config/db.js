const dotenv = require('dotenv');
dotenv.config();
const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_API

const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection
(async () => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .limit(1)

        if (error) throw error
        console.log('Successfully connected to Supabase')
    } catch (err) {
        console.error('Failed to connect to Supabase:', err)
        process.exit(1)
    }
})()

module.exports = supabase