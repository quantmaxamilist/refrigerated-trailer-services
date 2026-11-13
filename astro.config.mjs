import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://www.refrigeratedtrailerservices.co.uk',
  trailingSlash: 'ignore',
  build: { format: 'file', inlineStylesheets: 'auto' },
  scopedStyleStrategy: 'class',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  compressHTML: true,
});
