# How to use React+AMP?

## 1. Add AMP to your node modules:
```
npm install adaptive-media-player --save-dev
```

## 2. Import AMP into your react component:
```
import React, { useEffect } from 'react';
import  AMP  from  'adaptive-media-player-test'
```

## 3. Call AMP.create in you component passing a config object and a container id:
```
import React, { useEffect } from 'react';
import AMP from  'adaptive-media-player-test'
function PlayerExample() {
  useEffect(() => {
    const config = {
      autoplay: true,
      media: { src: "https://example.com/video/bbb.mp4" }
    }
    AMP.create("customerApiKey", "#player", config)
  });
  return (
    <div className="PlayerExample-container">
        <div id="player"></div>
    </div>
  );
}
export default PlayerExample;
```

## 4. Set a default size for your player in your css;
```
.PlayerExample-container {
  width: 640px;
  height: 360px;
}
```
