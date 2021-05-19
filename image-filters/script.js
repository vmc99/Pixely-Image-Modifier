var originalImage = null;
var grayImage = null;
var redImage = null;
var blueImage = null;
var greenImage = null;
var rainbowImage = null;
var borderImage = null;
var blurImage = null;

var canvas = document.getElementById("theCanvas");

function loadImage() {
  var file = document.getElementById("fileInput");
  originalImage = new SimpleImage(file);
  grayImage = new SimpleImage(file);
  redImage = new SimpleImage(file);
  blueImage = new SimpleImage(file);
  greenImage = new SimpleImage(file);
  rainbowImage = new SimpleImage(file);
  borderImage = new SimpleImage(file);
  blurImage = new SimpleImage(file);
  originalImage.drawTo(canvas);
}

function doGray() {
  if (imageIsLoaded(grayImage)) {
    filterGray();
    grayImage.drawTo(canvas);
  }
}

function filterGray() {
  for (var pixel of grayImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

function doRed() {
  if (imageIsLoaded(redImage)) {
    filterRed();
    redImage.drawTo(canvas);
  }
}

function filterRed() {
  for (var pixel of redImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}

function doBlue() {
  if (imageIsLoaded(blueImage)) {
    filterBlue();
    blueImage.drawTo(canvas);
  }
}

function filterBlue() {
  for (var pixel of blueImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(2 * avg);
    } else {
      pixel.setRed(2 * avg - 255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(255);
    }
  }
}

function doGreen() {
  if (imageIsLoaded(greenImage)) {
    filterGreen();
    greenImage.drawTo(canvas);
  }
}

function filterGreen() {
  for (var pixel of greenImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(0);
      pixel.setGreen(2 * avg);
      pixel.setBlue(0);
    } else {
      pixel.setRed(2 * avg - 255);
      pixel.setGreen(255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}


function doRainbow() {
  if (imageIsLoaded(rainbowImage)) {
    filterRainbow();
    rainbowImage.drawTo(canvas);
  }
}

function filterRainbow() {
  var height = rainbowImage.getHeight();
  for (var pixel of rainbowImage.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
}


function doBorder() {
  if (imageIsLoaded(borderImage)) {
    filterBorder();
    borderImage.drawTo(canvas);
  }
}

function filterBorder()
{
  for(var pix of borderImage.values())
{
     var w = pix.getX();
     var h = pix.getY();
     
     if(w<= borderImage.getWidth() && h<=10)
     {
         pix.setRed(0);
         pix.setGreen(0);
         pix.setBlue(0);
     }
     
     if(w<=10 && h<= borderImage.getHeight())
     {
         pix.setRed(0);
         pix.setGreen(0);
         pix.setBlue(0);
     }
     
     if(w<= borderImage.getWidth() && (h>= borderImage.getHeight()-10))
     {
         pix.setRed(0);
         pix.setGreen(0);
         pix.setBlue(0);
     }
     
      if((w>= borderImage.getWidth()-10) && h<= borderImage.getHeight())
     {
         pix.setRed(0);
         pix.setGreen(0);
         pix.setBlue(0);
     }
  }
}

function doBlur() {
  if (imageIsLoaded(blurImage)) {
    var output_blur = filterBlur();
    output_blur.drawTo(canvas);
  }
}

function filterBlur()
{
  var output = new SimpleImage(blurImage.getWidth(),blurImage.getHeight());
  
  for (var pixel of blurImage.values()) 
  {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
        var other = getPixelNearby(blurImage, x, y, 10);
        output.setPixel(x, y, other);
    }
    else {
        output.setPixel(x, y, pixel);
    }
  }
  return output;
}


//related to Blur function
function getPixelNearby (blurImage, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, blurImage.getWidth());
    var ny = ensureInImage(y + dy, blurImage.getHeight());
    return blurImage.getPixel(nx, ny);
}

//Related to Blur function
function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}



function imageIsLoaded(img) {
  if (img == null || !img.complete()) {
    alert("Image not loaded");
    return false;
  } else {
    return true;
  }
}

function reset() {
  if (imageIsLoaded(originalImage)) {
    originalImage.drawTo(canvas);
    grayImage = new SimpleImage(originalImage);
    redImage = new SimpleImage(originalImage);
  }
}