import type { NextConfig } from 'next';

const nextConfig = {
  // (Optional) Export as a standalone site
  // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
  // Feel free to modify/remove this option
  // output: 'standalone',

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverActions: {
      serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    },
  },
};

export default nextConfig;
