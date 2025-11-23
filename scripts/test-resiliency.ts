import { fetchGovernmentData } from '../lib/data-service';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

async function runTest() {
    console.log('--- Starting Resiliency Test ---');

    // Force Primary API failure by setting a bad URL if not already set
    // Or rely on the fact that the real API might not be reachable/auth'd yet
    // But to be sure, let's override it in the process env for this run if needed.
    // Actually, let's just run it. If primary works, great. If not, fallback.
    // We want to see fallback sources.

    const start = Date.now();
    // Test the new function specifically
    const { fetchRecentProjects } = require('../lib/data-service');
    const results = await fetchRecentProjects();
    const duration = Date.now() - start;

    console.log(`\nTest Completed in ${duration}ms`);
    console.log(`Total Results: ${results.length}`);

    if (results.length > 0) {
        console.log('\nSources found:');
        const sources = new Set(results.map(r => r.source));
        sources.forEach(s => console.log(`- ${s}`));

        console.log('\nFirst 3 items:');
        results.slice(0, 3).forEach(item => {
            console.log(`[${item.source}] ${item.title}`);
        });
    } else {
        console.log('No results found. Check logs for errors.');
    }
}

runTest().catch(console.error);
