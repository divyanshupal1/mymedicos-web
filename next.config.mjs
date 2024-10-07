/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        missingSuspenseWithCSRBailout: false,
    },
    async headers() {
        return [
          {
            source: "/:path*",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "https://mymedicos.in",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization",
              },
            ],
          },
        ];
      },
};

export default nextConfig;
