/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'courses-top.ru',
			'geekhacker.ru',
			'old-images.hb.ru-msk.vkcs.cloud'
		]
	},
	experimental: {
		missingSuspenseWithCSRBailout: false
	},
	webpack(config) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: {
									removeViewBox: false
								}
							}
						}
					]
				},
				titleProp: true
			},
			test: /\.svg$/
		})

		return config
	}
}

module.exports = nextConfig
