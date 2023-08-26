/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      appDir: true,
  },
  swcPlugin: [
    ['next-superjson-plugin', {}]
  ],
  webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve = {
          ...config.resolve,
          fallback: {
            net: false,
            dns: false,
            tls: false,
            fs: false,
            request: false,
          },
        };
      }
      return config;
  },
  // Place the rules within the webpack property
  webpack: (config, { isServer }) => {
      if (!isServer) {
          config.resolve = {
              ...config.resolve,
              fallback: {
                  net: false,
                  dns: false,
                  tls: false,
                  fs: false,
                  request: false,
              },
          };
      }
      config.module.rules.push(
          {
              test: /\.html$/,
              use: 'html-loader', // Use the appropriate loader for HTML files
          }
      );
      return config;
  },
};

module.exports = nextConfig;
