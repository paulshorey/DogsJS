const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/dogs',
      },
    ]
  },
  images: {
    domains: ['images.dog.ceo']
  }
}

module.exports = withPlugins([[withImages]], nextConfig)
