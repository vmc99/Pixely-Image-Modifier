var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;
var finalCanvas;

function loadForegroundImage() {
  var  choice = confirm('The Image Should Contain a Green Background/Screen');
  if(choice == true)
    {
     var file = document.getElementById("fgfile");
     fgImage = new SimpleImage(file);
     fgCanvas = document.getElementById("fgcan");
     fgImage.drawTo(fgCanvas);
    }
  else
    {
      var ch = "Not Applicable";
      document.getElementById("demo").innerHTML = ch;
    }
    
}

function loadBackgroundImage() {
  var file = document.getElementById("bgfile");
  bgImage = new SimpleImage(file);
  bgCanvas = document.getElementById("bgcan");
  bgImage.drawTo(bgCanvas);
}

function createComposite() {
   // this function creates a new image with the dimensions of the foreground image and returns the composite green screen image
  var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  bgImage.setSize(fgImage.getWidth(),fgImage.getHeight());
  for(var pixel of fgImage.values())
  {
   if(pixel.getGreen() > pixel.getRed() + pixel.getBlue())
   {
       var x = pixel.getX();
       var y = pixel.getY();
       
       var bgPixel = bgImage.getPixel(x,y);
       
       output.setPixel(x,y,bgPixel);
   }
   else
   {
       output.setPixel(pixel.getX(),pixel.getY(),pixel);
   }
 }
  return output;
}

function doGreenScreen() {
  //check that images are loaded
  var flag = 0;
  if (fgImage == null  || ! fgImage.complete()) {
    alert("Foreground image not loaded");
    flag = 1;
  }
  if (bgImage == null || ! bgImage.complete()) {
    alert("Background image not loaded");
    flag = 1;
  }

  if(flag == 0)
 {
  var finalImage = createComposite();
  finalCanvas = document.getElementById("finalcan");
  finalImage.drawTo(finalCanvas);
 }
  
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
  doClear(finalCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}