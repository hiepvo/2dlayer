/**
 * Created by hiepvo on 3/29/17.
 */
(function(){
  var init = {};

  var links       = document.querySelectorAll('.layer header');
  var close_links = document.querySelectorAll('.layer .close');

  for(var i = 0; i < links.length; i++){
    links[i].addEventListener('click', openSlide, false);
    close_links[i].addEventListener('click', closeBtn, false);
  }

  // restore height of element and remove class 'active'
  function closeSlide(el){
    el.style.maxHeight = 50 + 'px';
    setTimeout(function(){
      removeClass(el, 'active');
    }, 500);
    var close = document.querySelector('#' + el.parentNode.id + ' span.close');
    hide(close, 500);
  }

  function closeBtn(el){
    if(this.tagName.toLowerCase() === 'span'){
      var el             = this.parentNode;
      el.style.maxHeight = 50 + 'px';
      setTimeout(function(){
        removeClass(el, 'active');
      }, 500);
      var close = document.querySelector('#' + el.parentNode.id + ' span.close');
      hide(close, 500);
    }
  }

  var temp = null;
  function openSlide(e){
    var currentEl = this.parentNode.parentNode;
    var parent    = this.parentNode.parentNode.parentNode;
    var lastChild = parent.lastElementChild;
    if(temp === null){
      temp = lastChild;
    }
    else{
      lastChild = temp;
    }

    var lastActive = document.querySelector('#' + lastChild.id + ' div');
    var content    = document.querySelector('#' + currentEl.id + ' div');
    var close      = document.querySelector('#' + currentEl.id + ' div .close');
    removeClass(close, 'hide');

    //close.addEventListener('click', closeSlide, false);
    if(lastActive.className.indexOf('active') !== -1){
      closeSlide(lastActive);
      setTimeout(function(){
        currentEl.style.top = lastChild.offsetTop + 'px';
        lastChild.style.top = currentEl.offsetTop + 'px';
      }, 600);

      if(lastChild.offsetTop !== currentEl.offsetTop){
        setTimeout(function(){
          addClass(content, 'active');
          content.style.maxHeight = 1200 + 'px';
        }, 1100);
      }
    }
    else{
      currentEl.style.top = lastChild.offsetTop + 'px';
      lastChild.style.top = currentEl.offsetTop + 'px';
      setTimeout(function(){
        addClass(content, 'active');
        content.style.maxHeight = 1200 + 'px';
      }, 650);
    }
    temp = currentEl;
  }

//place element in specific cords
  function placeEl(el, x_pos, y_pos){
    el.style.left = x_pos - el.offsetWidth / 3 + 'px';
    el.style.top  = y_pos + 'px';
  }

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

