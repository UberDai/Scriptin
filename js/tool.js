'use strict';

Scriptin.Tool =
{
	_visible: false,
	_wrapper: null,
	x: 0,

	show: function ()
	{
		if (this._visible)
			return ;

		var wrapper = document.createElement('div');
		wrapper.id = 'scriptin-wrapper';
		document.body.appendChild(wrapper);
		this._wrapper = wrapper;

		this._showLayer();
		// this._showEditableElements(Scriptin.editableElements);

		this._visible = true;

		console.log(this._wrapper.childNodes.length);
	},

	hide: function ()
	{
		if (!this._wrapper)
			return ;

		document.body.removeChild(this._wrapper);
		this._visible = false;
		this._wrapper = null;
	},

	_showLayer: function ()
	{
		var elements = Scriptin.editableElements;
		var layers = this._generateLayers(elements);

		for (var i = 0; i < layers.length; i++)
		{
			if (!this._getOverlappingElement(layers[i], elements))
				this._appendLayer(layers[i]);
		}

		for (var i = 0; i < elements.length; i++)
			this._appendEditableElement(elements[i]);
	},

	_appendEditableElement: function (element)
	{
		var box = element.container.getBoundingClientRect();
		var div = document.createElement('div');
		div.className = 'scriptin-editable-element';
		div.style.top = box.top +'px';
		div.style.left = box.left +'px';
		div.style.width = box.width +'px';
		div.style.height = box.height +'px';

		var a = document.createElement('a');
		a.href = 'javascript: void(0)';

		div.appendChild(a);

		document.body.appendChild(div);
	},

	_generateLayers: function (elements)
	{
		var xs = [ 0, document.body.offsetWidth ];
		var ys = [ 0, document.body.offsetHeight ];

		for (var i = 0; i < elements.length; i++)
		{
			var box = elements[i].container.getBoundingClientRect();

			xs.push(box.left);
			xs.push(box.left + box.width);

			ys.push(box.top);
			ys.push(box.top + box.height);
		}

		function sort(a, b) { return a > b; }

		xs = xs.sort(sort);
		ys = ys.sort(sort);

		var layers = [];

		for (var i = 0; i < xs.length - 1; i++)
		{
			var x = xs[i];

			for (var j = 0; j < ys.length - 1; j++)
			{
				var y = ys[j];

				layers.push({
					left: x,
					top: y,
					width: xs[i + 1] - x,
					height: ys[j + 1] - y,
				})
			}
		}

		return layers;
	},

	_appendLayer: function (layer)
	{
		var div = document.createElement('div');

		div.className = 'scriptin-layer';
		div.style.left = layer.left +'px';
		div.style.top = layer.top +'px';
		div.style.width = layer.width +'px';
		div.style.height = layer.height +'px';

		this._appendElement(div);
	},

	_getOverlappingElement: function (layer, elements)
	{
		var elementBox;

		for (var i = 0; i < elements.length; i++)
		{
			elementBox = elements[i].container.getBoundingClientRect();

			if (layer.left < elementBox.left + elementBox.width &&
				layer.left + layer.width > elementBox.left &&
				layer.top < elementBox.top + elementBox.height &&
				layer.height + layer.top > elementBox.top)
			{
				return elementBox;
			}
		}

		return false;
	},

	_showEditableElements: function (elements)
	{
		for (var i = 0; i < elements.length; i++)
			this._showEditableElement(elements[i]);
	},

	_showEditableElement: function (element)
	{
		var box = element.container.getBoundingClientRect();

		var div = document.createElement('div');
		div.className = 'scriptin-editable-element';
		div.style.top = box.top +'px';
		div.style.left = box.left +'px';
		div.style.width = box.width +'px';
		div.style.height = box.height +'px';
		this._appendElement(div);
	},

	_appendElement: function (element)
	{
		if (!this._wrapper)
			return ;

		this._wrapper.appendChild(element);
	}
};