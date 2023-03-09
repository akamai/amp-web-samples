<script>
	import ConsoleSample from './ConsoleSample.svelte';
	import CodeSample from './CodeSample.svelte';
	import AMP from 'adaptive-media-player'
	export let name;
	const config = {
		autoplay: true,
		media: {
			title: `${name} Sample`,
			src: "//cph-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
			type: "application/x-mpegURL"
		}
	}
	AMP.create("snap.trial", "#player", config)
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://player.akamai.com/documentation/web/">AMP API Docs</a> to learn how to use AMP in your HTML5 applications.</p>
	<div id="player" class='sample'></div>
	<div class="tutorial">
		<h2>How to use {name}?</h2>
		<ConsoleSample
		title="1. Add AMP to your node modules:"
		command="npm install adaptive-media-player --save-dev"
		/>
		<CodeSample
		title="2. Import AMP into your svelte component:"
		script="
		import  AMP  from  'adaptive-media-player'
		"
		main=""
		style=""
		/>
		<CodeSample
		title="3. Add a container 'div':"
		script="
		import  AMP  from  'adaptive-media-player'
		"
		main="
		&lt;div id='player' class='player'&gt;&lt;/div&gt;
		"
		style=""
		/>
		<CodeSample
		title="4. Give the player a width using css:"
		script="
		import  AMP  from  'adaptive-media-player'
		"
		main="
		&lt;div id='player' class='player'&gt;&lt;/div&gt;
		"
		style="
		.player &#123;
			width: 640px;
		&#125;
		"
		/>
		<CodeSample
		title="5. Call 'AMP.create' passing your API key, the container id and a 'config' object:"
		script="
		import  AMP  from  'adaptive-media-player'
		const config = &#123;
			autoplay: true,
			media: &#123;
				title: &#34;ID3 Sample&#34;,
				src: &#34;https://my_hls_video.m3u8&#34;,
				type: &#34;application/x-mpegURL&#34;
			&#125;
		&#125;
		AMP.create(&#34;CUSTOMER_API_KEY&#34;, &#34;#player&#34;, config)
		"
		main="
		&lt;div id='player'&gt;&lt;/div&gt;
		"
		style="
		.player &#123;
			width: 640px;
		&#125;
		"
		/>
	</div>
</main>

<style>
	.tutorial {
		width: 640px;
		margin: auto;
		padding-top: 1em;
		padding-bottom: 1em;
	}

	.sample {
		margin: auto;
		border-style: none;
		width: 640px;
		height: 360px;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	h2 {
		color: #ff3e00;
		font-size: 2em;
		font-weight: 100;	
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>