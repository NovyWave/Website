// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://novywave.pages.dev',
	integrations: [
		starlight({
			title: 'NovyWave',
			description: 'Modern waveform viewer for digital design verification',
			logo: {
				src: './src/assets/novywave-logo.png',
				replacesTitle: false,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/NovyWave/NovyWave' },
			],
			editLink: {
				baseUrl: 'https://github.com/NovyWave/NovyWaveWebsite/edit/main/',
			},
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'User Guide',
					items: [
						{ label: 'Loading Waveform Files', slug: 'user-guide/loading-files' },
						{ label: 'Timeline Navigation', slug: 'user-guide/navigation' },
						{ label: 'Keyboard Shortcuts', slug: 'user-guide/keyboard-shortcuts' },
						{ label: 'Configuration', slug: 'user-guide/configuration' },
						{ label: 'Troubleshooting', slug: 'user-guide/troubleshooting' },
					],
				},
				{
					label: 'Tutorials',
					items: [
						{ label: 'Your First Waveform', slug: 'tutorials/first-waveform' },
						{ label: 'VHDL with GHDL', slug: 'tutorials/vhdl-ghdl' },
						{ label: 'Verilog with Icarus', slug: 'tutorials/verilog-icarus' },
						{ label: 'Multi-File Comparison', slug: 'tutorials/multi-file' },
					],
				},
				{ label: 'Changelog', slug: 'changelog' },
			],
		}),
	],
});
