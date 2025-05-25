export interface SEOConfig {
  /**
   * The title of the page. Will be prefixed to site name if not already included.
   */
  title: string;

  /**
   * Meta description for the page (150-160 characters recommended).
   */
  description: string;

  /**
   * Optional comma-separated keywords for the page.
   */
  keywords?: string;

  /**
   * Path to the Open Graph image for social sharing.
   * Can be absolute URL or relative path from public directory.
   */
  ogImage?: string;

  /**
   * Open Graph content type. Defaults to 'website'.
   */
  ogType?: 'website' | 'article' | 'profile' | 'book' | 'music' | 'video';

  /**
   * Optional canonical URL for the page.
   */
  canonical?: string;

  /**
   * Whether search engines should index this page.
   */
  noindex?: boolean;

  /**
   * Structured data (JSON-LD) for the page.
   */
  structuredData?: Record<string, any>;
}