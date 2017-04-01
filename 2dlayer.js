/**
 * Created by hiepvo on 3/29/17.
 */
(function(){
  var init        = {};
  var maxHeight   = 1200;
  var links       = document.querySelectorAll('.layer header');
  var close_links = document.querySelectorAll('.layer .close');

  for(var i = 0; i < close_links.length; i++){
    links[i].addEventListener('click', openSlide, false);
    close_links[i].addEventListener('click', closeBtn, false);
  }

  // restore height of element and remove class 'active'
  function closeSlide(el){
    el.style.maxHeight = 50 + 'px';
    el.style.transitionDuration = '1.5s';
    setTimeout(function(){
      removeClass(el, 'active');
      addClass(el.parentNode, 'visited');
    }, 750);
    var close = document.querySelector('#' + el.parentNode.id + ' span.close');
    var done = document.querySelector('#' + el.parentNode.id + ' span.done');
    show(done, 500);
    hide(close, 500);
  }

  function closeBtn(el){
    if(this.tagName.toLowerCase() === 'span'){
      var el             = this.parentNode;
      el.style.maxHeight = 50 + 'px';
      el.style.transitionDuration = '1.5s';
      setTimeout(function(){
        removeClass(el, 'active');
        addClass(el, 'visited');
        addClass(el.parentNode, 'visited');
      }, 750);
      var close = document.querySelector('#' + el.parentNode.id + ' span.close');
      var done = document.querySelector('#' + el.parentNode.id + ' span.done');
      show(done, 500);
      hide(close, 500);
    }
  }

  var temp       = null;
  var inProgress = false;

  function openSlide(e){
    if(inProgress)return;
    inProgress    = true;
    var currentEl = this.parentNode.parentNode;
    var parent    = this.parentNode.parentNode.parentNode;
    var lastChild = parent.lastElementChild;
    if(temp === null){
      temp = lastChild;
    }
    else{
      lastChild = temp;
    }
    if(currentEl.className.indexOf('on-top') === -1){
      addClass(currentEl, 'on-top');
    }
    var lastActive = document.querySelector('#' + lastChild.id + ' div');
    var content    = document.querySelector('#' + currentEl.id + ' div');
    var close      = document.querySelector('#' + currentEl.id + ' div .close');
    removeClass(close, 'hide');
    if(lastActive.className.indexOf('active') !== -1){
      closeSlide(lastActive);
      setTimeout(function(){
        currentEl.style.top = lastChild.offsetTop + 'px';
        lastChild.style.top = currentEl.offsetTop + 'px';
        addClass(lastChild, 'top-layer');
      }, 950);

      if(lastChild.offsetTop !== currentEl.offsetTop){
        addClass(content, 'active');
        removeClass(content.parentNode, 'visited');
        setTimeout(function(){
          var aDiv = document.getElementsByClassName('active')[0];
          aDiv.style.transitionDuration  = '2.5s';
          content.style.maxHeight = maxHeight + 'px';
          inProgress              = false;
        }, 1500);
      }
    }
    else{
      currentEl.style.top = lastChild.offsetTop + 'px';
      lastChild.style.top = currentEl.offsetTop + 'px';
      addClass(lastChild, 'top-layer');
      addClass(content, 'active');
      removeClass(content.parentNode, 'visited');
      var aDiv = document.getElementsByClassName('active')[0];
      aDiv.style.transitionDuration  = '2.5s';
      setTimeout(function(){
        content.style.maxHeight = maxHeight + 'px';
        inProgress              = false;
      }, 750);
    }
    setTimeout(function(){
      removeClass(currentEl, 'on-top');
    }, 2000);
    temp = currentEl;
  }

  var didScroll = false;

  window.onscroll = moveEl;
  function moveEl(){
    didScroll = true;
  }

  var arr = [];
  setInterval(function(){
    if(didScroll){
      didScroll  = false;
      var layers = document.querySelectorAll('[id^=layer]');

      var i      = 0;
      for(i; i < layers.length; i++){
        if(layers[i].style.top)
        if(layers[i].className.indexOf('active') === -1){
          if(layers[i].style.top === '0px'){
            //alert(activeLayer.clientHeight)
            if(isScrolledIntoView(layers[i]) === false){
              layers[i].style.top = 180 + 'px';
            }
          }
        }
      }
    }
  }, 100);

  function getDocHeight(){
    var doc = document;
    return Math.max(
        doc.body.scrollHeight, doc.documentElement.scrollHeight,
        doc.body.offsetHeight, doc.documentElement.offsetHeight,
        doc.body.clientHeight, doc.documentElement.clientHeight
    );
  }

  function isScrolledIntoView(el){
    var elemTop    = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
  }

  /********* helper ***********/
  function hide(el, time){
    setTimeout(function(){
      addClass(el, 'hide');
    }, time);
  }

  function show(el, time){
    setTimeout(function(){
      removeClass(el, 'hide');
    }, time);
  }

  function hasClass(el, className){
    if(el.classList)
      return el.classList.contains(className);
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }

  function addClass(el, className){
    if(el.classList)
      el.classList.add(className);
    else if(!hasClass(el, className)) el.className += " " + className
  }

  function removeClass(el, className){
    if(el.classList)
      el.classList.remove(className);
    else if(hasClass(el, className)){
      var reg      = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ')
    }
  }

  /*-------------------------------*/

  window.init = init;

})
(window);

