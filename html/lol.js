
function getCollidingElement(layer, elements)
{
	var elementBox;

	for (var i = 0; i < elements.length; i++)
	{
		elementBox = elements[i].getBoundingClientRect();

		if (layer.left < elementBox.left + elementBox.width &&
			layer.left + layer.width > elementBox.left &&
			layer.top < elementBox.top + elementBox.height &&
			layer.height + layer.top > elementBox.top)
		{
			return elementBox;
		}
	}

	return false;
}

var elements = document.getElementsByClassName('x');

var xs = [ 0, document.body.offsetWidth ];
var ys = [ 0, document.body.offsetHeight ];

for (var i = 0; i < elements.length; i++)
{
	var box = elements[i].getBoundingClientRect();

	xs.push(box.left);
	xs.push(box.left + box.width);

	ys.push(box.top);
	ys.push(box.top + box.height);
}

function sort(a, b) { return a > b; }

xs = xs.sort(sort);
ys = ys.sort(sort);

var rects = [];

for (var i = 0; i < xs.length - 1; i++)
{
	var x = xs[i];

	for (var j = 0; j < ys.length - 1; j++)
	{
		var y = ys[j];

		rects.push({
			left: x,
			top: y,
			width: xs[i + 1] - x,
			height: ys[j + 1] - y,
		})
	}
}

for (var i = 0; i < rects.length; i++)
{
	if (getCollidingElement(rects[i], elements))
		continue ;

	var x = document.createElement('div');
	x.className = 'y';
	x.style.left = rects[i].left +'px';
	x.style.top = rects[i].top +'px';
	x.style.width = rects[i].width +'px';
	x.style.height = rects[i].height +'px';

	document.body.appendChild(x);
}