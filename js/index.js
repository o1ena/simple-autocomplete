(function() {
  var addButton = document.getElementById('addButton');
  var search = document.getElementById('search');
  var autocompletePopup = document.getElementById('autocompletePopup');
  var autocompleteItems = [];
  var selectedDiv = 0;
  var currentKey = -1;
  var cars = ['BMW', 'Volvo', 'Chevrolet Volt','VW', 'Renault', 'Peugeot', 'JEEP Wrangler'];
  
  function showItems(items){
    autocompletePopup.style.height = '';
    autocompletePopup.innerHTML = '';
    autocompleteItems = [];

    for (var item in items) {
      var autocompleteItem = document.createElement('div');
      autocompleteItem.className = 'autocompleteItem';
      autocompleteItem.tabIndex = 0;
      autocompleteItem.innerHTML = items[item];
      autocompletePopup.appendChild(autocompleteItem);
      autocompleteItems.push(autocompleteItem);
      toggleDisplay("[id='autocompletePopup']", 'autocompletePopup');
    }

    if (!items.length) {
      autocompletePopup.innerHTML = 'Not found';
      autocompletePopup.style.height = '35px';
    }
  }

  function addNewItem(){
    autocompletePopup.style.height = '';
    if(search.value.length !== 0 && (cars.indexOf(search.value) == -1)) {
      cars.push(search.value);
      autocompletePopup.innerHTML = 'New car added';
      autocompletePopup.style.height = '35px';
      setTimeout(function(){
        toggleDisplay("[id='autocompletePopup']", 'hideAutocomplete');
      }, 1000);
    }

  }

  function matchInput(input) {
    var reg = new RegExp("\\b" + input, 'i');
    return cars.filter(function(car) {
      if (car.match(reg)) {
        return car;
      } 
    }).reverse();
  }

  function toggleDisplay(id, styleClass) {
    var element = document.querySelectorAll(id);
    for(var i = 0; i < element.length; i++) {
      element[i].setAttribute('class', styleClass);
    }
  }

  function selectDiv(event){
    var prevKey = currentKey;
    if(event.key === 'ArrowUp') {
      currentKey--;
      event.preventDefault();
    }
    else if(event.key === 'ArrowDown') {
      currentKey++;
    }

    if (currentKey === -1) {
      currentKey = autocompleteItems.length - 1;
    } else if (currentKey === autocompleteItems.length) {
      currentKey = 0;
    }

    if (event.key.match(/Arrow(Up|Down)/)) {
      if (prevKey in autocompleteItems) {
        autocompleteItems[prevKey].style.backgroundColor = '';
      }

      if (currentKey in autocompleteItems) {
        autocompleteItems[currentKey].style.backgroundColor = '#4285f4';
        search.value = autocompleteItems[currentKey].innerText;
      }
    }
  };

  search.addEventListener('keydown', selectDiv);

  search.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
      addNewItem();
    }                     
  });

  search.addEventListener('input', function(event){
    var items = matchInput(search.value);
    currentKey = -1;
    showItems(items);
  });

  search.addEventListener('focus', function(event){
    showItems(cars);
  });

  search.addEventListener('keydown', function(event) {
    if(event.key == "Escape") 
      toggleDisplay("[id='autocompletePopup']", 'hideAutocomplete');
  });

  addButton.addEventListener('click', addNewItem);

  var sel = document.getElementsByClassName('autocompleteItem');
  sel.onclick = function () {
    document.getElementById('search').value += this.innerHTML + ' ';
}
  
  
  $.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
      scrollTarget  : target,
      offsetTop     : 185,
      duration      : 0,
      easing        : 'linear'
    }, options);
    return this.each(function(){
      var scrollPane = $(this);
      var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
      var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
      scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
        if (typeof callback == 'function') { callback.call(this); }
      });
    });
  }
})();