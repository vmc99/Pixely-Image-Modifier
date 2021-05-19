var sgImage = null;
var hgImage = null;
var sgCanvas;
var hgCanvas;
var download_flag = false;
//var tcan1;
//var tcan2;
//var steganoImage;
//var finalCanvas;

function loadStartImage() {
  
     var file = document.getElementById("sgfile");
     sgImage = new SimpleImage(file);
     sgCanvas = document.getElementById("sgcan");
     sgImage.drawTo(sgCanvas);
    
}

function loadHideImage() {
  
  var file = document.getElementById("hgfile");
  hgImage = new SimpleImage(file);
  hgCanvas = document.getElementById("hgcan");
  hgImage.drawTo(hgCanvas);
  
}

function chop()
{
  for(var pix of sgImage.values())
 {
   var red = pix.getRed(); 
   var green = pix.getGreen(); 
   var blue = pix.getBlue(); 
   red = Math.floor(red/16)*16;
   green = Math.floor(green/16)*16;
   blue = Math.floor(blue/16)*16;
   pix.setRed(red);
   pix.setGreen(green);
   pix.setBlue(blue);
   
    
 }
     
}

function shift()
{
  for(var pix of hgImage.values())
 {
   var red2 = pix.getRed(); 
   var green2 = pix.getGreen(); 
   var blue2 = pix.getBlue(); 
   red2 = Math.floor(red2/16);
   green2 = Math.floor(green2/16);
   blue2 = Math.floor(blue2/16);
   pix.setRed(red2);
   pix.setGreen(green2);
   pix.setBlue(blue2);
 }
    
  
}
function combine()
{
  var flag = 0;
  if (sgImage == null  || ! sgImage.complete()) {
    alert("Foreground image not loaded");
    flag = 1;
  }
  if (hgImage == null || ! hgImage.complete()) {
    alert("Background image not loaded");
    flag = 1;
  }
   
  if(flag ==0)
  {
  clearCanvas();
  createComposite();
  sgImage.drawTo(sgCanvas);
  download_flag = true;
  }
  
}

function createComposite()
{
  chop();
  shift();
  hgImage.setSize(sgImage.getWidth(),sgImage.getHeight());
  for(var pix of sgImage.values())
  {
    var x = pix.getX();
    var y = pix.getY();
    var pix2 = hgImage.getPixel(x,y);
    
  pix.setRed(pix.getRed()+pix2.getRed());
  pix.setGreen(pix.getGreen()+pix2.getGreen());
  pix.setBlue(pix.getBlue()+pix2.getBlue());
 }
  
}


function clearCanvas() {
  doClear(sgCanvas);
  doClear(hgCanvas);
}

function doClear(canvas) {
  
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}


function download() {
  
  var flag = 0;
  if (sgImage == null || ! sgImage.complete() || download_flag == false) {
    alert("Stegno image not loaded");
    flag = 1;
  }
  
if(flag == 0)
{
  
var download = document.getElementById("download");
var image = document.getElementById("sgcan").toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
download.setAttribute("href", image);
//download.setAttribute("download","archive.png");
}
}