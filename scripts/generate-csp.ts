import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { glob } from 'glob';
import { parse } from 'node-html-parser';

interface CspConfig {
  additionalSources?: Record<string, string[]>;
  reportOnly?: boolean;
  reportUri?: string;
  excludePaths?: string[];
  enableHsts?: boolean;
  hstsMaxAge?: number;
  hstsIncludeSubdomains?: boolean;
  hstsPreload?: boolean;
}

interface CspDirectives {
  [directive: string]: string[];
}

/**
 * Load CSP configuration from JSON file if it exists
 */
function loadConfig(): CspConfig {
  const configPath = resolve('csp-config.json');
  if (existsSync(configPath)) {
    try {
      return JSON.parse(readFileSync(configPath, 'utf-8')) as CspConfig;
    } catch (error) {
      console.warn('Error parsing csp-config.json, using defaults:', error);
    }
  }
  return {
    additionalSources: {},
    reportOnly: false,
    excludePaths: [],
    enableHsts: true,
    hstsMaxAge: 31536000,
    hstsIncludeSubdomains: true,
    hstsPreload: true
  };
}

/**
 * Generate SHA-256 hash for content
 */
function generateHash(content: string): string {
  return createHash('sha256').update(content).digest('base64');
}

/**
 * Main function to generate the _headers file with CSP
 */
async function generateCspHeaders(): Promise<void> {
  const config = loadConfig();
  const distDir = resolve('dist');
  
  // Check if dist directory exists
  if (!existsSync(distDir)) {
    throw new Error(`Distribution directory ${distDir} does not exist. Run the build first.`);
  }
  
  const htmlFiles = glob.sync(`${distDir}/**/*.html`, { 
    ignore: config.excludePaths?.map(p => join(distDir, p)) || [] 
  });
  
  if (htmlFiles.length === 0) {
    console.warn('No HTML files found in the distribution directory. CSP generation skipped.');
    return;
  }
  
  const scriptHashes = new Set<string>();
  const styleHashes = new Set<string>();
  
  console.log(`Processing ${htmlFiles.length} HTML files for CSP hashes...`);
  
  // Process all HTML files to extract inline scripts and styles
  htmlFiles.forEach(file => {
    try {
      const html = readFileSync(file, 'utf-8');
      const root = parse(html, {
        comment: false,
        blockTextElements: {
          script: true,
          style: true,
          pre: true
        }
      });
      
      // Extract and hash inline scripts
      root.querySelectorAll('script:not([src])').forEach(script => {
        const content = script.text?.trim();
        if (content) {
          scriptHashes.add(`'sha256-${generateHash(content)}'`);
        }
      });
      
      // Extract and hash inline styles
      root.querySelectorAll('style').forEach(style => {
        const content = style.text?.trim();
        if (content) {
          styleHashes.add(`'sha256-${generateHash(content)}'`);
        }
      });
      
      // Extract and hash style attributes
      root.querySelectorAll('[style]').forEach(element => {
        const content = element.getAttribute('style')?.trim();
        if (content) {
          styleHashes.add(`'sha256-${generateHash(content)}'`);
        }
      });
    } catch (error) {
      console.warn(`Error processing ${file}:`, error);
    }
  });
  
  console.log(`Generated ${scriptHashes.size} script hashes and ${styleHashes.size} style hashes`);
  
  // Create the CSP directives object
  const cspDirectives: CspDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", ...Array.from(scriptHashes)],
    'style-src': ["'self'", ...Array.from(styleHashes)],
    'img-src': ["'self'", "data:"],
    'font-src': ["'self'"],
    'connect-src': ["'self'"],
    'object-src': ["'none'"],
    'worker-src': ["'self'"],
    'frame-ancestors': ["'self'"],
    'form-action': ["'self'"],
    'base-uri': ["'self'"],
    'manifest-src': ["'self'"],
    'upgrade-insecure-requests': []
  };
  
  // Merge with additional sources from config
  if (config.additionalSources) {
    Object.entries(config.additionalSources).forEach(([directive, sources]) => {
      if (cspDirectives[directive]) {
        cspDirectives[directive] = [...cspDirectives[directive], ...sources];
      } else {
        cspDirectives[directive] = sources;
      }
    });
  }
  
  // Add report-uri if configured
  if (config.reportUri && config.reportUri.trim() !== '') {
    cspDirectives['report-uri'] = [config.reportUri];
  }
  
  // Convert directives object to header string
  const cspHeaderValue = Object.entries(cspDirectives)
    .map(([directive, sources]) => {
      if (sources.length === 0) {
        return directive;
      }
      return `${directive} ${sources.join(' ')}`;
    })
    .join('; ');
  
  // Determine header name based on config
  const headerName = config.reportOnly ? 
    'Content-Security-Policy-Report-Only' : 
    'Content-Security-Policy';
  
  // Generate HSTS header if enabled
  let hstsHeader = '';
  if (config.enableHsts !== false) {
    const maxAge = config.hstsMaxAge || 31536000;
    const includeSubdomains = config.hstsIncludeSubdomains !== false ? '; includeSubDomains' : '';
    const preload = config.hstsPreload !== false ? '; preload' : '';
    hstsHeader = `  Strict-Transport-Security: max-age=${maxAge}${includeSubdomains}${preload}\n`;
  }

  // Create and write the _headers file
  const headersContent = `/*
  ${headerName}: ${cspHeaderValue}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
${hstsHeader}  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Cross-Origin-Resource-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
`;
  
  writeFileSync(join(distDir, '_headers'), headersContent);
  console.log('Generated CSP headers successfully');
}

// Run the generator
generateCspHeaders().catch(error => {
  console.error('Failed to generate CSP headers:', error);
  process.exit(1);
});