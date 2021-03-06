UI = this.UI = function (type, opt) {
  var u;
  var opt = opt || {};
  
  // solid color
  UI.solid_color = function (val) {
    var color;
    switch(val) {
      case "red": 
        color = [1, 0, 0]; break;
      case "green": 
        color = [0, 1, 0]; break;
      case "blue": 
        color = [0, 0, 1]; break;
      case "white": 
        color = [1, 1, 1]; break;
      case "black": 
        color = [0, 0, 0]; break;
      case "gray": 
      case "grey": 
        color = [0.5, 0.5, 0.5]; break;
      case "yellow": 
        color = [1, 1, 0]; break;
      case "cyan": 
        color = [0, 1, 1]; break;
      case "magenta": 
        color = [1, 0, 1]; break;
      default: 
        color = val; break;
    }
    return color
  };
  
  
  // window
  this.win = new Window(type, opt['title'] || "", opt['bounds'] || u, {
    closeButton: (opt['closeButton'] == u ? true : opt['closeButton']),
    minimizeButton: (opt['minimizeButton'] == u ? true : opt['minimizeButton']),
    maximizeButton: (opt['maximizeButton'] == u ? false : opt['maximizeButton']),
    resizeable: (opt['resizeable'] == u ? false : opt['resizeable']),
    borderless: (opt['borderless'] == u ? false : opt['borderless']),
  });

  this.win.orientation = 'column';
  this.win.margins = 5;
  this.win.spacing = 5;
  this.win.alignChildren = ['fill', 'fill'];
}


// group
UI.prototype.add_group = function (elm, opt) {
  var u;
  var opt = opt || {};
  var group = elm.add('group', opt['bounds'] || u, {
    // creation_properties
    name: opt['name'],
  });
  group.orientation = opt['orientation'] || this.win.orientation;
  group.margins = opt['margins'] || this.win.margins;
  group.spacing = opt['spacing'] || this.win.spacing;
  group.alignChildren = opt['alignChildren'] || this.win.alignChildren;
  if (opt['size']) {
    group.preferredSize = opt['size'];
  }
  return group
};

// panel
UI.prototype.add_panel = function (elm, opt) {
  var u;
  var opt = opt || {};
  var panel = elm.add('panel', opt['bounds'] || u, opt['title'] || "", {
    // creation_properties
    name: opt['name'],
    borderStyle: (opt['borderStyle'] || u), // black, etched, gray, raised, sunken. Default is etched
  });
  panel.orientation = opt['orientation'] || this.win.orientation;
  panel.margins = opt['margins'] || this.win.margins;
  panel.spacing = opt['spacing'] || this.win.spacing;
  panel.alignChildren = opt['alignChildren'] || this.win.alignChildren;
  if (opt['size']) {
    panel.preferredSize = opt['size'];
  }
  return panel
};

// edittext
UI.prototype.add_input = function (elm, opt) {
  var u;
  var opt = opt || {};
  
  if (opt['scrollable'] == u) opt['scrollable'] = true;
  if (opt['enabled'] == u) opt['enabled'] = true;
  
  var input = elm.add('edittext', opt['bounds'] || u, opt['text'] || "", {
    // creation_properties
    name: opt['name'],
    readonly: !!opt['readonly'],
    noecho: !!opt['noecho'],
    enterKeySignalsOnChange: !!opt['enterKeySignalsOnChange'],
    multiline: !!opt['multiline'],
    scrollable: opt['scrollable'],
    borderless: !!opt['borderless'],
  });
  if (opt['size']) {
    input.preferredSize = opt['size'];
  }
  input.enabled = opt['enabled'];
  return input
};

// statictext
UI.prototype.add_text = function (elm, opt) {
  var u;
  var opt = opt || {};
  
  var text = elm.add('statictext', opt['bounds'] || u, opt['text'] || "", {
    // creation_properties
    name: opt['name'],
    multiline: !!opt['multiline'],
    scrolling: !!opt['scrolling'],
    truncate: opt['trancate'] || 'none', //middle or end, none
  });
  text.characters = opt['characters'] || text.text.length;
  if (opt['size']) {
    text.preferredSize = opt['size'];
  }
  return text
};

// listbox
UI.prototype.add_listbox = function (elm, opt) {
  var u;
  var opt = opt || {};

  if (opt['enabled'] == u) opt['enabled'] = true;

  var listbox = elm.add('listbox', opt['bounds'] || u, opt['items'] || [], {
    // creation_properties
    name: opt['name'],
    multiselect: opt['multiselect'],
    numberOfColumns: opt['numberOfColumns'],
    showHeaders: !!opt['showHeaders'],
    columnWidths: opt['columnWidths'],
    columnTitles: opt['columnTitles'],
  });
  if (opt['size']) {
    listbox.preferredSize = opt['size'];
  }
  listbox.enabled = opt['enabled'];
  return listbox
};

// dropdownlist
UI.prototype.add_dropdownlist = function (elm, opt) {
  var u;
  var opt = opt || {};

  if (opt['enabled'] == u) opt['enabled'] = true;

  var dropdownlist = elm.add('dropdownlist', opt['bounds'] || u, opt['items'] || u, {
    // creation_properties
    name: opt['name'],
  });
  dropdownlist.title = opt['title'] || "";
  if (opt['size']) {
    dropdownlist.preferredSize = opt['size'];
  }
  dropdownlist.enabled = opt['enabled'];
  return dropdownlist
};

// checkbox
UI.prototype.add_checkbox = function (elm, opt) {
  var u;
  var opt = opt || {};

  if (opt['enabled'] == u) opt['enabled'] = true;

  var checkbox = elm.add('checkbox', opt['bounds'] || u, opt['text'] || "", {
    // creation_properties
    name: opt['name'],
  });
  checkbox.enabled = opt['enabled'];
  return checkbox
};

// radiobutton
// add ('radiobutton' [,bounds, text, {creation_properties}])
UI.prototype.add_radiobutton = function (elm, opt) {
  var u;
  var opt = opt || {};

  if (opt['enabled'] == u) opt['enabled'] = true;

  var radiobutton = elm.add('radiobutton', opt['bounds'] || u, opt['text'] || "", {
    // creation_properties
    name: opt['name'],
  });
  radiobutton.enabled = opt['enabled'];
  return radiobutton
};

// slider
// add ('slider' [,bounds, value, minvalue, maxvalue, {creation_properties}])
UI.prototype.add_slider = function (elm, opt) {
  var u;
  var opt = opt || {};
  
  if (opt['enabled'] == u) opt['enabled'] = true;
  
  var slider = elm.add('slider', opt['bounds'] || u, opt['value'] || 0, opt['min'] || 0, opt['max'] || 100, {
    // creation_properties
    name: opt['name'],
  });
  if (opt['size']) {
    slider.preferredSize = opt['size'];
  }
  slider.enabled = opt['enabled'];
  return slider
};

// scrollbar
// w.add ('scrollbar' [,bounds, value, minvalue, maxvalue, {creation_properties}])
UI.prototype.add_scrollbar = function (elm, opt) {
  var u;
  var opt = opt || {};
  
  if (opt['enabled'] == u) opt['enabled'] = true;
  
  var scrollbar = elm.add('scrollbar', opt['bounds'] || u, opt['value'] || 0, opt['min'] || 0, opt['max'] || 100, {
    // creation_properties
    stepdelta: opt['stepdelta'], // defalut is 1
    jumpdelta: opt['jumpdelta'], // default is 20% of the range between minvalue and maxvalue.
    name: opt['name'],
  });
  if (opt['size']) {
    scrollbar.preferredSize = opt['size'];
  }
  scrollbar.enabled = opt['enabled'];
  return scrollbar
};

// button
// add ('button' [,bounds, text, {creation_properties}])
UI.prototype.add_button = function (elm, opt) {
  var u;
  var opt = opt || {};
  
  if (opt['enabled'] == u) opt['enabled'] = true;
  
  var button = elm.add('button', opt['bounds'] || u, opt['text'] || "", {
    // creation_properties
    name: opt['name'],
  });
  if (opt['size']) {
    button.preferredSize = opt['size'];
  }
  button.enabled = opt['enabled'];
  return button
};
