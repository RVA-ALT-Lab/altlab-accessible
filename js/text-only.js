// Production steps of ECMA-262, Edition 6, 22.1.2.1 -- just a way for me to be lazy and user ES 6 stuff below 
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method 
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}


//Here's the actual code that does the stripping of styles, imgs, svgs, iframes

function removeStyles(){
	Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).forEach((elem) => elem.parentNode.removeChild(elem)); //destroy the styles
}

function removeImages(){
	Array.from(document.querySelectorAll('img')).forEach((elem) => elem.parentNode.removeChild(elem)); //destroy the images
}

function removeSVG(){
	Array.from(document.querySelectorAll('svg')).forEach((elem) => elem.parentNode.removeChild(elem)); //destroy the SVG 
}

function removeInline(){
    Array.from(document.querySelectorAll('*')).forEach((elem) => elem.removeAttribute('style')); //destroy the inline css
}

function removeIframe(){ //destory iframes and replace with their internal URL as a link
    var frames = document.querySelectorAll('iframe'), i;

    for (i = 0; i < frames.length; ++i) {
      var link = document.createElement('a');
      link.href = frames[i].src;
      link.appendChild(document.createTextNode(link.href));
      frames[i].parentNode.replaceChild(link, frames[i]);
    }
}



function removeAll(){
	removeStyles();
	removeImages();
	removeSVG();
  removeInline();
  removeIframe();
}

window.addEventListener("load", function(){
     document.getElementById("text-only-view").onclick = function(){removeAll();};
});

//SKIP TO CONTENT 

var skipLink = '<a class="skip-link screen-reader-text" href="#content">Skip to content</a>';

var haveSkip = document.getElementsByTagName('a');
  for (i = 0; i < haveSkip.length; ++i ){
    if (haveSkip[i].innerHTML.toLowerCase() === 'skip to content') 
      {
        console.log('skip present');
        break;
      } 
      else {
        var header = document.getElementsByTagName('header')[0];
        var a = document.createElement('a');
        var skipLink = document.createTextNode("skip to content");
        a.appendChild(skipLink);
        a.href = "#";
        header.appendChild(skipLink);
        break;
      }
  }
