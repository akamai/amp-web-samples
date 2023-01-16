<script>
    export let title;
    export let script;
    export let main;
    export let style;
</script>

<div>
    <h3>{title}</h3>
    <pre>
        <code>
            {#if script != ""}
            <br>
            &lt;script&gt;
            {script}
            &lt;/script&gt;
            {/if}
            {#if main != ""}
            <br>
            &lt;main&gt;
            {main}
            &lt;/main&gt;
            {/if}
            {#if style != ""}
            <br>
            &lt;style&gt;
            {style}
            &lt;/style&gt;
            <br>
            {/if}
        </code>
    </pre>
</div>

<style>
	h3 {
		color: black;
		font-size: 1.3em;
		font-weight: 300;
        margin: 0em;	
	}

    code {
        margin: 0em 1em;
		text-align: left;
		display: block;
		border-radius: 8px;
		border: 1px solid black;
		background-color: #444;
        color: tan;
	}
</style>