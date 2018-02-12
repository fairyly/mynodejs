# gm 图片处理

* github: https://github.com/aheckmann/gm

* 网站： http://aheckmann.github.com/gm/

### Getting started
```
First download and install GraphicsMagick or ImageMagick. In Mac OS X, you can simply use Homebrew and do:

brew install imagemagick
brew install graphicsmagick
If you want WebP support with ImageMagick, you must add the WebP option:

brew install imagemagick --with-webp
then either use npm:

npm install gm
or clone the repo:

git clone git://github.com/aheckmann/gm.git

```

### Basic Usage
```
var fs = require('fs')
  , gm = require('gm');

// resize and remove EXIF profile data
gm('/path/to/my/img.jpg')
.resize(240, 240)
.noProfile()
.write('/path/to/resize.png', function (err) {
  if (!err) console.log('done');
});

// some files would not be resized appropriately
// http://stackoverflow.com/questions/5870466/imagemagick-incorrect-dimensions
// you have two options:
// use the '!' flag to ignore aspect ratio
gm('/path/to/my/img.jpg')
.resize(240, 240, '!')
.write('/path/to/resize.png', function (err) {
  if (!err) console.log('done');
});

// use the .resizeExact with only width and/or height arguments
gm('/path/to/my/img.jpg')
.resizeExact(240, 240)
.write('/path/to/resize.png', function (err) {
  if (!err) console.log('done');
});

// obtain the size of an image
gm('/path/to/my/img.jpg')
.size(function (err, size) {
  if (!err)
    console.log(size.width > size.height ? 'wider' : 'taller than you');
});

// output all available image properties
gm('/path/to/img.png')
.identify(function (err, data) {
  if (!err) console.log(data)
});

// pull out the first frame of an animated gif and save as png
gm('/path/to/animated.gif[0]')
.write('/path/to/firstframe.png', function (err) {
  if (err) console.log('aaw, shucks');
});

// auto-orient an image
gm('/path/to/img.jpg')
.autoOrient()
.write('/path/to/oriented.jpg', function (err) {
  if (err) ...
})

// crazytown
gm('/path/to/my/img.jpg')
.flip()
.magnify()
.rotate('green', 45)
.blur(7, 3)
.crop(300, 300, 150, 130)
.edge(3)
.write('/path/to/crazy.jpg', function (err) {
  if (!err) console.log('crazytown has arrived');
})

// annotate an image
gm('/path/to/my/img.jpg')
.stroke("#ffffff")
.drawCircle(10, 10, 20, 10)
.font("Helvetica.ttf", 12)
.drawText(30, 20, "GMagick!")
.write("/path/to/drawing.png", function (err) {
  if (!err) console.log('done');
});

// creating an image
gm(200, 400, "#ddff99f3")
.drawText(10, 50, "from scratch")
.write("/path/to/brandNewImg.jpg", function (err) {
  // ...
});
```
