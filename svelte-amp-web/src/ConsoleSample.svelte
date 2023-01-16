<script>
    export let title;
    export let command;
</script>

<div>
    <h3>{title}</h3>
    <pre>
        <code>{command}</code>
    </pre>
</div>

<style>
	h3 {
		color: black;
		font-size: 1.3em;
		font-weight: 300;	
	}

    code {
		margin: 0em 1em;
		padding: 1em 0em;
		display: block;
		border-radius: 8px;
		border: 1px solid gray;
		background-color: black;
		color: #00ff00;
	}
</style>