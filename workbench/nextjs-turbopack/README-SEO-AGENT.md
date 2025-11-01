# SEO Agent Workflow

An intelligent, autonomous SEO optimization workflow for drsayuj.info that runs daily to maintain and improve Google rankings for medical keywords.

## Features

- **Daily Automated Execution**: Runs every day at 8:00 AM IST via GitHub Actions
- **Competitor Analysis**: Scrapes and analyzes top 10 competitor sites
- **Technical SEO Audit**: Evaluates Core Web Vitals, mobile-friendliness, structured data, and more
- **Content Optimization**: Generates improved meta titles, descriptions, H1 tags, and blog ideas
- **Automated Reporting**: Creates detailed Markdown reports with actionable insights
- **GitHub Integration**: Automatically creates Pull Requests with recommendations
- **Vercel Deployment**: Auto-deploys after PR merge via Vercel API

## Setup

### 1. Environment Variables

Create a `.env.local` file or set the following environment variables:

```bash
# GitHub Configuration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPOSITORY=owner/repo-name

# Vercel Configuration
VERCEL_TOKEN=your_vercel_api_token
VERCEL_PROJECT_ID=your_vercel_project_id
VERCEL_TEAM_ID=your_vercel_team_id  # Optional

# API Keys (for enhanced features)
OPENAI_API_KEY=your_openai_api_key  # For AI-powered content generation
DATAFORSEO_API_KEY=your_dataforseo_key  # For keyword ranking data
SEMRUSH_API_KEY=your_semrush_key  # For competitor analysis
```

### 2. GitHub Secrets

Add the following secrets to your GitHub repository:

- `GITHUB_TOKEN`: Personal access token with repo permissions
- `DEPLOYMENT_URL`: Your deployment URL (e.g., `https://www.drsayuj.info`)
- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_PROJECT_ID`: Vercel project ID
- `VERCEL_TEAM_ID`: Vercel team ID (optional)

### 3. GitHub Actions Workflow

The workflow is configured in `.github/workflows/seo-agent-daily.yml` and runs:
- Daily at 8:00 AM IST (2:30 AM UTC)
- Can be manually triggered via GitHub Actions UI

### 4. Directory Structure

Create the following directories:

```bash
mkdir -p seo/reports
mkdir -p logs
```

## Usage

### Manual Trigger

Trigger the workflow manually via API:

```bash
curl -X POST "https://www.drsayuj.info/api/trigger?workflowFile=workflows/seo-agent.ts&workflowFn=seoAgentWorkflow"
```

Or via GitHub Actions UI:
1. Go to Actions tab
2. Select "SEO Agent Daily Workflow"
3. Click "Run workflow"

### Workflow Execution Flow

1. **Competitor Analysis**: Scrapes competitor sites and extracts SEO data
2. **Technical Audit**: Performs comprehensive technical SEO checks
3. **Content Recommendations**: Generates optimization suggestions
4. **Report Generation**: Creates detailed Markdown report
5. **PR Creation**: Opens GitHub Pull Request with report
6. **Deployment**: Triggers Vercel deployment (after PR merge)

## Output

### Reports

Daily reports are saved to `seo/daily-report-YYYY-MM-DD.md` and include:

- Keyword ranking changes
- Competitor gap analysis
- New keyword opportunities
- Technical SEO issues and fixes
- Content optimization recommendations
- Blog post ideas

### Logs

Execution logs are written to `logs/seo-agent.log` with timestamps.

## Safeguards

- Respects YMYL (Your Money Your Life) medical SEO guidelines
- No misleading or AI-hallucinated medical claims
- Avoids duplicate or keyword-stuffed content
- Preserves site design and accessibility

## Customization

### Modify Competitors

Edit `workflows/seo-agent.ts`:

```typescript
const COMPETITORS = [
  'https://your-competitor.com',
  // Add more competitors
];
```

### Modify Target Keywords

Edit `workflows/seo-agent.ts`:

```typescript
const TARGET_KEYWORDS = [
  'Your Primary Keyword',
  'Your Secondary Keyword',
];
```

### Adjust Schedule

Edit `.github/workflows/seo-agent-daily.yml`:

```yaml
schedule:
  - cron: '30 2 * * *'  # Modify cron expression
```

## API Integration

For production use, integrate with:

- **DataForSEO API**: Real keyword ranking data
- **Semrush API**: Comprehensive competitor analysis
- **Lighthouse CI**: Accurate Core Web Vitals
- **OpenAI API**: Advanced content generation

## Troubleshooting

### Workflow Not Triggering

1. Check GitHub Actions logs
2. Verify cron schedule is correct
3. Ensure repository has Actions enabled

### PR Creation Fails

1. Verify `GITHUB_TOKEN` has repo permissions
2. Check branch protection rules
3. Ensure repository name is correct

### Deployment Fails

1. Verify Vercel credentials
2. Check project ID matches
3. Ensure Vercel API token is valid

## Notes

- The workflow uses basic scraping for demonstration. For production, integrate with professional SEO APIs.
- Content recommendations are generated based on analysis patterns. For advanced AI-powered suggestions, integrate OpenAI API.
- Keyword rankings are mocked. Use DataForSEO or similar APIs for real-time data.




