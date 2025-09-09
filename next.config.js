/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  // Simplified redirect configuration to avoid regex issues
  async redirects() {
    return [
      // Add specific redirects here if needed
      // The complex canonical host redirect has been removed to prevent URL issues
    ]
  },
}

export default nextConfig