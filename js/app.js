var marked = require('./views/impress/bower_components/marked/lib/marked');

var gui = require('nw.gui'),
    win = gui.Window.get();

var opt = {
  "gfm": true,
  "tables": true,
  "breaks": false,
  "pedantic": false,
  "sanitize": false,
  "smartLists": true,
  "smartypants": true,
  "silent": false,
  "highlight": null,
  "langPrefix": ''
};

marked.setOptions(opt);

function tokenize(md) {
	var tokens = md.split('===');
	return tokens;
}

function convert(md) {
	var tokens, md, steps = [];

  tokens = tokenize(md);

  tokens.forEach(function(item, idx) {
    steps.push('<div class="step">\n\t' + marked(item) + '\n</div>');
  });

  return steps.join('\n\n');
}

win.on('update', function(md) {
  $('#impress').html(convert(md));
  
  $('.step').each(function(i) {
    $(this)
      .attr('data-x', 0)
      .attr('data-y', i * -2000)
      .attr('data-z', i * 2000)
      .attr('data-rotate', Math.sin(i) / 2 * Math.PI * 100);
  });

  impress('impress', 1).init();
  
  setInterval(function() {
    $('.active').next().show();
  }, 200);
});

$(function() {
  impress('impress', 1).init();
});