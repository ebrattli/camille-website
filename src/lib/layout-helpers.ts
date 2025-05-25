import { getSeoConfig, defaultSeo } from '../config/seo';
import type { SEOConfig } from '../types/seo';

/**
 * Gets SEO configuration for a page, with optional overrides
 * 
 * @param pageKey The key of the page in the SEO configuration
 * @param overrides Optional SEO property overrides
 * @returns Complete SEO configuration for the page
 */
export function getPageSeo(pageKey: string, overrides?: Partial<SEOConfig>): SEOConfig {
  // Get the base SEO config for the page
  const baseSeo = getSeoConfig(pageKey);
  
  // If no overrides, return the base config
  if (!overrides) return baseSeo;
  
  // Merge the base config with overrides
  return {
    ...baseSeo,
    ...overrides,
    // Handle nested structuredData separately
    structuredData: overrides.structuredData && baseSeo.structuredData
      ? { ...baseSeo.structuredData, ...overrides.structuredData } 
      : (overrides.structuredData || baseSeo.structuredData)
  };
}

/**
 * Creates Layout props from a page key, with optional overrides
 * 
 * @param pageKey The key of the page in the SEO configuration
 * @param overrides Optional SEO property overrides
 * @returns Props object to pass to the Layout component
 */
export function createLayoutProps(pageKey: string, overrides?: Partial<SEOConfig>): SEOConfig {
  return getPageSeo(pageKey, overrides);
}

/**
 * Generates a dynamic SEO configuration based on provided content
 * Useful for blog posts and dynamic pages
 * 
 * @param title Page title
 * @param description Page description
 * @param options Additional SEO options
 * @returns Complete SEO configuration for the dynamic page
 */
export function createDynamicSeo(
  title: string, 
  description: string, 
  options?: Partial<SEOConfig>
): SEOConfig {
  return {
    ...defaultSeo,
    title,
    description,
    ...(options || {}),
    // Handle structuredData separately to avoid overriding with undefined
    structuredData: options?.structuredData 
      ? { ...defaultSeo.structuredData, ...options.structuredData }
      : defaultSeo.structuredData
  };
}