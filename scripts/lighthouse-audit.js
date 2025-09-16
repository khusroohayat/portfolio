const fs = require('fs');
const path = require('path');
const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse').default;

const OUTPUT_DIR = path.join(__dirname, '..', 'lighthouse-reports');

async function runLighthouse() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'lighthouse-report.json');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });

  try {
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };

    // Run Lighthouse
    const runnerResult = await lighthouse('http://localhost:3000', options, {
      extends: 'lighthouse:default',
    });

    if (!runnerResult) {
      throw new Error('Lighthouse returned no results');
    }

    // Save report
    fs.writeFileSync(outputPath, JSON.stringify(runnerResult.lhr, null, 2));

    // Extract top issues
    const categories = runnerResult.lhr.categories;
    const topIssues = [];

    // Get top issues from each category
    for (const [category, data] of Object.entries(categories)) {
      if (data.auditRefs) {
        const issues = data.auditRefs
          .filter((audit) => audit.weight >= 3 && data.score < 0.9)
          .map((audit) => ({
            id: audit.id,
            title: audit.title,
            description: audit.description,
            score: (data.score * 100).toFixed(0),
            category: category,
          }));

        topIssues.push(...issues);
      }
    }

    // Sort by score (worst first) and take top 5
    const top5Issues = topIssues.sort((a, b) => a.score - b.score).slice(0, 5);

    console.log('\nTop 5 Issues to Fix:');
    console.log('===================');

    if (top5Issues.length === 0) {
      console.log('No critical issues found! Your site is performing well.');
    } else {
      top5Issues.forEach((issue, index) => {
        console.log(`\n${index + 1}. ${issue.title} (${issue.category})`);
        console.log(`   Score: ${issue.score}/100`);
        console.log(`   Description: ${issue.description}`);
      });
    }

    console.log(`\nFull report saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    process.exit(1);
  } finally {
    await chrome.kill();
    process.exit(0);
  }
}

runLighthouse().catch(console.error);
