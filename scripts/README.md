# Content Security Policy (CSP) Generator

This tool automatically generates Content Security Policy headers for your Astro site deployed on Cloudflare Pages.

## Overview

The CSP generator analyzes your built HTML files to extract inline scripts and styles, generates SHA-256 hashes for them, and creates a proper Content Security Policy header in the Cloudflare-compatible `_headers` file format.

## Installation

The necessary dependencies are included in the main project's `package.json`:
- `node-html-parser`: Efficient HTML parsing with minimal footprint
- `glob`: File pattern matching
- `tsx`: For running TypeScript scripts directly

## Usage

### Automatic Usage

The CSP generation is automatically included in the build process. When you run:

```bash
pnpm build
```

The CSP headers will be generated automatically after the Astro build completes.

### Manual Usage

If you need to regenerate the CSP headers without rebuilding the entire site:

```bash
pnpm generate-csp
```

## Configuration

Customize the CSP behavior by editing the `csp-config.json` file in the project root:

```json
{
  "additionalSources": {
    "script-src": [],
    "style-src": [],
    "font-src": [],
    "img-src": [],
    "connect-src": []
  },
  "reportOnly": false,
  "reportUri": "",
  "excludePaths": []
}
```

### Configuration Options

- **additionalSources**: Add external domains to specific CSP directives
- **reportOnly**: Set to `true` to use `Content-Security-Policy-Report-Only` instead of enforcing the policy
- **reportUri**: URL where CSP violation reports should be sent
- **excludePaths**: Glob patterns for HTML files to exclude from CSP processing

## How It Works

1. Scans all HTML files in the `dist` directory
2. Extracts inline `<script>` tags without `src` attributes
3. Extracts inline `<style>` tags
4. Extracts inline `style` attributes
5. Generates SHA-256 hashes for each unique code block
6. Creates a comprehensive CSP header with these hashes
7. Writes the header to `dist/_headers` for Cloudflare Pages

## Default CSP Directives

The following directives are included by default:

- `default-src 'self'`
- `script-src 'self' [script hashes]`
- `style-src 'self' [style hashes]`
- `img-src 'self' data:`
- `font-src 'self'`
- `connect-src 'self'`
- `object-src 'none'`
- `worker-src 'self'`
- `frame-ancestors 'self'`
- `form-action 'self'`
- `base-uri 'self'`
- `manifest-src 'self'`
- `upgrade-insecure-requests`

## Additional Security Headers

The following security headers are also added:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Troubleshooting

### No HTML Files Found

If you see "No HTML files found in the distribution directory" message, make sure you've run `astro build` first.

### Missing Hashes

If certain scripts or styles aren't being detected:
1. Check if they're dynamically inserted by JavaScript (these can't be automatically hashed)
2. Add specific domains to the `additionalSources` in the config when needed
3. For dynamically inserted content, consider using nonces (requires server-side implementation)

### CSP Violations

If you're getting CSP violations:
1. Set `reportOnly: true` in the config to test without blocking resources
2. Configure `reportUri` to collect violation reports
3. Check browser console for detailed violation information

## Best Practices

1. Start with `reportOnly: true` to identify potential issues
2. Leave `additionalSources` arrays empty until you need specific external resources
3. Only include external domains that are absolutely necessary
4. Regularly review your CSP configuration as your site evolves
5. Use CSP with other security headers (already included)
6. Test your site thoroughly after implementing CSP