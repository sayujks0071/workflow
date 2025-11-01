#!/usr/bin/env node

/**
 * SEO Competitor Analysis Script
 * Fetches competitor data and saves to JSON file
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = process.argv[2] || join(__dirname, '../seo/reports/competitors.json');

const competitors = [
  'https://yashodahospitals.com',
  'https://apolloshospitals.com',
  'https://drraveesh.com',
  'https://ravisumanneuro.com',
  'https://practo.com',
];

async function analyzeCompetitor(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0)',
      },
    });

    if (!response.ok) {
      return {
        url,
        error: `HTTP ${response.status}`,
        keywords: [],
      };
    }

    const html = await response.text();

    // Extract basic SEO data
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1].trim() : '';

    // Extract keywords (simple approach)
    const keywords = [];
    const text = html.toLowerCase();
    const medicalTerms = ['neurosurgeon', 'spine', 'surgery', 'hyderabad', 'endoscopic', 'neuro', 'surgeon'];
    medicalTerms.forEach((term) => {
      if (text.includes(term)) {
        keywords.push(term);
      }
    });

    return {
      url,
      title,
      description,
      keywords: [...new Set(keywords)],
      analyzedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      url,
      error: error.message,
      keywords: [],
    };
  }
}

async function main() {
  console.log('🔍 Analyzing competitors...');

  const results = await Promise.all(competitors.map(analyzeCompetitor));

  // Ensure directory exists
  const outputDir = dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log(`✅ Competitor analysis saved to ${outputPath}`);
  console.log(`📊 Analyzed ${results.length} competitors`);
}

main().catch(console.error);



