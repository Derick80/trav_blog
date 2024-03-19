/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
  remotePatterns: [ {
    protocol: 'https',
    hostname: 'res.cloudinary.com',
    port: '',

  }, {
    protocol: 'https',
    hostname: 'japan2023.s3.us-east-2.amazonaws.com',
    port: '',
  }]


}};

export default nextConfig;
