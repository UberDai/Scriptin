'use strict';

function EditableElement()
{
	this.container;
}

var Scriptin = {
	editableElements: []
};

function addEditableElement(el)
{
	if (!el)
		return ;

	var obj = new EditableElement();
	obj.container = el;
	Scriptin.editableElements.push(obj);
}

addEditableElement(document.getElementById('searchBarClickRef'));
addEditableElement(document.querySelectorAll('.cardRightCol')[0]);
addEditableElement(document.querySelectorAll('._4-u2.mbm._5jmm._5pat._5v3q')[0]);
addEditableElement(document.getElementById('pagelet_canvas_nav_content'));

document.ondblclick = function ()
{
	Scriptin.Tool.show();
};