# SEO Agent Workflow - Quick Setup Guide

## Overview

The SEO Agent Workflow is a fully autonomous system that runs daily at 8:00 AM IST to optimize and maintain top Google rankings for drsayuj.info.

## What It Does

1. **Competitor Analysis**: Scrapes and analyzes top competitor sites
2. **Technical SEO Audit**: Checks Core Web Vitals, mobile-friendliness, structured data, etc.
3. **Content Optimization**: Generates improved meta titles, descriptions, and H1 tags
4. **Report Generation**: Creates detailed Markdown reports with actionable insights
5. **Automated PRs**: Creates GitHub Pull Requests with recommendations
6. **Auto-Deployment**: Deploys to Vercel after PR merge

## Quick Start

### 1. Set Environment Variables

Add these to your Vercel project environment variables or `.env.local`:

```bash
# Required
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPOSITORY=owner/repo-name
VERCEL_TOKEN=your_vercel_api_token
VERCEL_PROJECT_ID=your_vercel_project_id

# Optional
VERCEL_TEAM_ID=your_vercel_team_id
OPENAI_API_KEY=your_openai_key  # For AI-powered content
DATAFORSEO_API_KEY=your_key     # For real keyword rankings
```

### 2. Configure GitHub Secrets

In your GitHub repository, go to Settings → Secrets and add:

- `GITHUB_TOKEN`: Personal access token with `repo` scope
- `DEPLOYMENT_URL`: Your deployment URL (e.g., `https://www.drsayuj.info`)

### 3. Create Required Directories

```bash
mkdir -p seo/reports
mkdir -p logs
```

### 4. Enable GitHub Actions

The workflow file `.github/workflows/seo-agent-daily.yml` is already configured to run:
- Daily at 8:00 AM IST (2:30 AM UTC)
- Can be manually triggered via GitHub Actions UI

### 5. Test the Workflow

Trigger manually via API:

```bash
curl -X POST "https://www.drsayuj.info/api/trigger?workflowFile=workflows/seo-agent.ts&workflowFn=seoAgentWorkflow"
```

Or via GitHub Actions:
1. Go to Actions tab
2. Select "SEO Agent Daily Workflow"
3. Click "Run workflow"

## Workflow Execution Flow

```
1. Competitor Analysis (5 competitors)
   ↓
2. Technical SEO Audit (Core Web Vitals, structured data, etc.)
   ↓
3. Content Recommendations (Meta tags, H1, blog ideas)
   ↓
4. Generate SEO Report (Markdown format)
   ↓
5. Create GitHub PR (with report and recommendations)
   ↓
6. Log Results (to logs/seo-agent.log)
```

## Output Files

- **Reports**: `seo/daily-report-YYYY-MM-DD.md`
- **Logs**: `logs/seo-agent.log`
- **PRs**: Automatically created in GitHub with recommendations

## Customization

### Change Competitors

Edit `workflows/seo-agent.ts`:

```typescript
const COMPETITORS = [
  'https://your-competitor.com',
  // Add more
];
```

### Change Target Keywords

Edit `workflows/seo-agent.ts`:

```typescript
const TARGET_KEYWORDS = [
  'Your Primary Keyword',
  'Your Secondary Keyword',
];
```

### Change Schedule

Edit `.github/workflows/seo-agent-daily.yml`:

```yaml
schedule:
  - cron: '30 2 * * *'  # Modify cron expression
```

## Integration with SEO APIs

For production use, integrate with:

- **DataForSEO API**: Real keyword ranking data
- **Semrush API**: Comprehensive competitor analysis  
- **Lighthouse CI**: Accurate Core Web Vitals
- **OpenAI API**: Advanced AI-powered content generation

## Troubleshooting

### Workflow Not Triggering

- Check GitHub Actions logs
- Verify cron schedule matches IST timezone
- Ensure Actions are enabled in repository settings

### PR Creation Fails

- Verify `GITHUB_TOKEN` has `repo` permissions
- Check repository name format: `owner/repo`
- Ensure branch protection allows automated PRs

### Deployment Fails

- Verify Vercel credentials are correct
- Check `VERCEL_PROJECT_ID` matches your project
- Ensure Vercel API token has deployment permissions

## Medical SEO Safeguards

The workflow includes safeguards for YMYL (Your Money Your Life) guidelines:

- ✅ No misleading medical claims
- ✅ No AI-hallucinated content
- ✅ Avoids keyword stuffing
- ✅ Preserves accessibility
- ✅ Maintains design integrity

## Next Steps

1. Configure environment variables
2. Test workflow manually
3. Review first report
4. Customize competitors/keywords as needed
5. Integrate professional SEO APIs for enhanced features

## Support

For issues or questions, check:
- Workflow logs: `logs/seo-agent.log`
- GitHub Actions logs
- Report files: `seo/daily-report-*.md`




