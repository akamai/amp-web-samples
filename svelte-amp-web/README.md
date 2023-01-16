# How to use Svelte + AMP?

## 1. Add AMP to your node modules:

```
npm install adaptive-media-player --save-dev
```

## 2. Import AMP into your svelte component:

```
<script>
    import  AMP  from  'adaptive-media-player'
</script>
```

## 3. Add a container 'div':

```
<script>
    import  AMP  from  'adaptive-media-player'
</script>
<main>
    <div id='player' class='player'></div>
</main>
```

## 4. Give the player a width using css:

```
<script>
    import  AMP  from  'adaptive-media-player'
</script>
<main>
    <div id='player' class='player'></div>
</main>
<style>
    .player {
        width: 640px;
    }
</style>
```

## 5. Call 'AMP.create' passing your API key, the container id and a 'config' object:

```
<script>
    import  AMP  from  'adaptive-media-player'
    const config = {
        autoplay: true,
        media: {
            title: "ID3 Sample",
            src: "https://my_hls_video.m3u8",
            type: "application/x-mpegURL"
        }
    }
    AMP.create("MY_API_KEY", "#player", config)
</script>
<main>
    <div id='player'></div>
</main>
<style>
    .player {
        width: 640px;
    }
</style>
```