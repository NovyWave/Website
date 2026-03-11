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
						{ label: 'Linux', slug: 'getting-started/installation/linux' },
						{ label: 'macOS', slug: 'getting-started/installation/macos' },
						{ label: 'Windows', slug: 'getting-started/installation/windows' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'User Guide',
					items: [
						{ label: 'Interface Overview', slug: 'user-guide/interface-overview' },
						{ label: 'Loading Waveform Files', slug: 'user-guide/loading-files' },
						{ label: 'Supported Formats', slug: 'user-guide/loading-files/formats' },
						{ label: 'Multi-File Workflows', slug: 'user-guide/loading-files/multi-file' },
						{ label: 'Timeline Navigation', slug: 'user-guide/navigation' },
						{ label: 'Zooming and Panning', slug: 'user-guide/navigation/zoom-pan' },
						{ label: 'Cursor Controls', slug: 'user-guide/navigation/cursor' },
						{ label: 'Signal Values and Formats', slug: 'user-guide/signal-values' },
						{ label: 'Keyboard Shortcuts', slug: 'user-guide/keyboard-shortcuts' },
						{ label: 'Configuration', slug: 'user-guide/configuration' },
						{ label: 'Troubleshooting', slug: 'user-guide/troubleshooting' },
					],
				},
				{
					label: 'Tutorials & Examples',
					items: [
						{ label: 'Your First Waveform', slug: 'tutorials/first-waveform' },
						{ label: 'Multi-File Comparison', slug: 'tutorials/multi-file' },
						{ label: 'VHDL with GHDL', slug: 'tutorials/vhdl-ghdl' },
						{ label: 'Verilog with Icarus', slug: 'tutorials/verilog-icarus' },
						{ label: 'SpinalHDL with Verilator', slug: 'tutorials/spinalhdl' },
						{ label: 'Amaranth Counter', slug: 'tutorials/amaranth' },
						{ label: 'Spade Counter', slug: 'tutorials/spade' },
					],
				},
				{
					label: 'Development',
					items: [
						{ label: 'Building from Source', slug: 'development/building' },
						{ label: 'Architecture Overview', slug: 'development/architecture' },
						{ label: 'Actor+Relay Pattern', slug: 'development/actor-relay' },
						{ label: 'Testing NovyWave', slug: 'development/testing' },
						{ label: 'Contributing', slug: 'development/contributing' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Data Types', slug: 'api/data-types' },
						{ label: 'Message Protocol', slug: 'api/message-protocol' },
					],
				},
				{ label: 'Changelog', slug: 'changelog' },
			],
		}),
	],
});
