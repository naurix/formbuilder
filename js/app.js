// Drag and drop
$( "#sortable" ).sortable({
	revert: true,
	handel: '.cb_move_btn',
	cancel: '.no-drag',
});
// $( "#sortable" ).disableSelection();

// Elements
var __col_btn = $('.col_btn');
var __mr_btn = $('.main_row_btn');
var __mr_box = $('.main_row_append_box');
var __mr_btn_mini = $('.main_row_minimize');
var __generate_btn = $('.generate_btn');
var __generate_box = $('.form_generated_box');
var __html_btn = $('.html_btn');
var __code_box = $('.code_box');
var __doc = $(document);


// Events
function make_column(e){
	e.preventDefault();
	var d = $(this).data('col-btn');
	console.log(d);
}

function add_main_row(e){
	e.preventDefault();

	__mr_box.append(main_row);
	// console.log(main_row)
}

function add_inner_row(e){
	e.preventDefault();

	var par = $(this).parents('.cb_display_box:first');
	var box = par.find('.inner_row_append_box:first');
	box.append(inner_row);
}

function add_column(){
	var par = $(this).parents('.inner_col__box:first');
	var n = $(this).val();
	var col_d = '';
	var col = '';
	
	if(parseInt(n) == 1) {col = 'col-sm-12'; }
	if(parseInt(n) == 2) {col = 'col-sm-6';}
	if(parseInt(n) == 3) {col = 'col-sm-4';}
	if(parseInt(n) == 4) {col = 'col-sm-3';}

	for(var i = 0; i < n; i++){
		col_d += '<div class="'+col+'">'+form_select_bar+'</div>';
	}

	var box = par.find('.form_row_box');
	box.html(col_d);
}

// Make Field
function on_select_field(){
	var txt = $(this).val();
	var par = $(this).parent('.field_box');
	var box = par.find('.form_field_box');

	$(this).hide();
	box.text('Here')

	switch(txt){
		case 'input':
			make_input_field(box);
			break;

		case 'textarea':
			make_textarea_field(box);
			break;

		case 'select':
			make_select_field(box);
			break;

		case 'checkbox':
			make_checkbox_field(box);
			break;

		case 'radio':
			make_radio_field(box);
			break;

		default:
			console.log('Not added');
	}
	// console.log(txt);
}

// Create Input
function make_input_field(el){
	var id = make_id(6);
	var input = '<div class="cnt_input_box form-group">';
		input += '<label for="'+id+'" data-field-type="input" class="in_field">';
		input += '<span class="field_title" contenteditable>Input Field [edit]</span>';
		input += in_field_edit;
		input += '</label>';
		input += '<input type="text" name="'+id+'" class="form-control" placeholder="">';
		input += '</div>';
	el.html(input);
}

// Create Textarea
function make_textarea_field(el){
	var id = make_id(6);
	var input = '<div class="cnt_input_box form-group">';
		input += '<label for="'+id+'" data-field-type="text" class="in_field">';
		input += '<span class="field_title" contenteditable>Note Field [edit]</span>';
		input += in_field_edit;
		input += '</label>';
		input += '<textarea type="text" name="'+id+'" class="form-control" placeholder=""></textarea>';
		input += '</div>';
	el.html(input);
}

// Create Select
function make_select_field(el){
	var id = make_id(6);
	var input = '<div class="cnt_input_box form-group">';
		input += '<label for="'+id+'" data-field-type="select" class="in_field">';
		input += '<span class="field_title" contenteditable>Select Field [edit]</span>';
		input += in_field_edit;
		input += '</label>';
		input += add_option_temp('select');
		input += '<select name="'+id+'" class="form-control hide_box">';
		input += '<option disabled="" selected="">-- Select Option --</option>';
		input += '</select>';
		input += '</div>';
	el.html(input);
}

// Create Checkbox
function make_checkbox_field(el){
	var id = make_id(6);
	var input = '<div class="cnt_input_box form-group">';
		input += '<label for="'+id+'" data-field-type="checkbox" class="in_field">';
		input += '<span class="field_title" contenteditable>Checkbox Field [edit]</span>';
		input += in_field_edit;
		input += '</label>';
		input +=  add_option_temp('checkbox');
		input += '</div>';
	el.html(input);
}

// Create Radio
function make_radio_field(el){
	var id = make_id(6);
	var input = '<div class="cnt_input_box form-group">';
		input += '<label for="'+id+'" data-field-type="radio" class="in_field">';
		input += '<span class="field_title" contenteditable>Radio Field [edit]</span>';
		input += in_field_edit;
		input += '</label>';
		input +=  add_option_temp('radio');
		input += '</div>';
	el.html(input);
}

// Select option
function add_options(){
	var par = $(this).parents('.cnt_input_box');
	var type = $(this).attr('data-option-text');
	var s_ul = par.find('.select_list');
	var s_box = par.find('.select_add_list');
	var inp = s_box.find('input:first');
	var sel = par.find('select:first');
	var icon = '<i class="fa fa-close"></i>';

	if(type === 'select'){
		if(inp.val() !== ''){
			var el = '<span class="delete" data-rem-text="select">'+icon+'</span></li>';
			s_ul.append('<li data-select-val="'+inp.val()+'">'+ inp.val() +el);
			sel.append('<option>'+inp.val()+'</option>');
			inp.val('');
		}
	}

	if(type === 'checkbox'){
		var label = par.find('label:first');
		var type = label.data('field-type');
		var txt = label.text();

		var el = '<div class="checkbox">';
			el += '<label>';
			el += '<input type="checkbox" name="'+slugify(txt.trim())+'" value="'+inp.val()+'">'+inp.val();
			el += '<span class="delete" data-rem-text="checkbox">'+icon+'</span></li>';
			el += '</label>';
			el += '</div>';

		s_ul.append(el);
		inp.val('');
	}

	if(type === 'radio'){
		var label = par.find('label:first');
		var type = label.data('field-type');
		var txt = label.text();

		var el = '<div class="radio">';
			el += '<label>';
			el += '<input type="radio" name="'+slugify(txt.trim())+'" value="'+inp.val()+'">'+inp.val();
			el += '<span class="delete" data-rem-text="radio">'+icon+'</span></li>';
			el += '</label>';
			el += '</div>';

		s_ul.append(el);
		inp.val('');
	}
}

// Edit field field 
function add_field_title(){
	var par = $(this).parents('.cnt_input_box');
	var label = par.find('label:first');
	var type = label.data('field-type');
	var txt = label.text();

	if(type === 'input'){
		par.find('input:first').attr('name', slugify(txt));
		par.find('input:first').attr('placeholder', txt.trim());
	}

	// 
	if(type === 'text'){
		par.find('textarea:first').attr('name', slugify(txt));
		par.find('textarea:first').attr('placeholder', txt.trim());
	}

	if(type === 'select'){
		var sel = par.find('select:first');
		sel.attr('name', slugify(txt));
		sel.attr('placeholder', txt.trim());
		sel.find('option:first').text('-- '+txt.trim()+' --');
	}

	if(type === 'checkbox'){
		var cbox = par.find('.checkbox');
		var inp = cbox.find('input');
		inp.attr('name', slugify(txt.trim() ));
	}

	if(type === 'radio'){
		console.log('Radio here');
		var cbox = par.find('.radio');
		var inp = cbox.find('input');
		inp.attr('name', slugify(txt.trim() ));
	}
}

function update_field_obj(){
	//
}

// Generate form data
function generate_form_data(){
	var c = __mr_box.clone(true, true);
	var mainbox = c.find('.cb_display_box');
	var removables = c.find('.removable');
	
	var btn = __html_btn;
	var btn_txt = btn.attr('data-code-btn');

	// Remove handlers
	c.find('.removable, .delete, .remove_btn').remove();
	c.removeClass('cb_display_box, no-drag');

	__generate_box.html('');
	mainbox.each(function(i, v){		
		var heading = $(this).find('h2:first');
		var desc = $(this).find('.add_desc_box:first');
		var desc = desc.text().trim();

		var box = '<div class="main-group-box">';
		box += '<h2 class="group_title">'+heading.text()+'</h2>';

		if(desc !== '-- Description text here' && desc !== ''){
			box += '<p>'+desc+'</p>';
		}

		var fbox = $(this).find('.form_row_box');
		var el = '';
		fbox.each(function(i, v){
			el += '<div class="row">';

			var cols = $(this).children();
			for(var j = 0; j < cols.length; j++){
				var field = $(this).find('.cnt_input_box');
				var c = cols[j].getAttribute('class');
				el += '<div class="'+c+'">';
				el += field[j].outerHTML;
				el += '</div>';
			}
			el += '</div>';
		});

		box += el;
		box += '</div>';

		__generate_box.append(box);
	});

	__mr_box.hide();
	__generate_box.show();

	// __generate_box.html(c);
	__mr_btn.hide();
	btn.attr('data-code-btn', 'editor');
	btn.html('<i class="fa fa-angle-double-left"></i> Back');
}

// Make HTML View
function switch_view(){
	var c = __mr_box.clone(true, true);
	var mainbox = c.find('.cb_display_box');

	var btn = $(this);
	var btn_txt = btn.attr('data-code-btn');

	// Remove handlers
	if(btn_txt === 'code'){
		mainbox.find('.removable').remove();

		__code_box.val('');
		mainbox.each(function(i, v){
			var heading = $(this).find('h2:first');
			var desc = $(this).find('.add_desc_box:first');
			var desc = desc.text().trim();

			var box = '<div class="main-group-box">';
			box += '<h2 class="group_title">'+heading.text()+'</h2>';

			if(desc !== '-- Description text here' && desc !== ''){
				box += '<p>'+desc+'</p>';
			}

			var fbox = $(this).find('.form_row_box');
			var el = '';
			fbox.each(function(i, v){
				el += '<div class="row">';

				var cols = $(this).children();
				for(var j = 0; j < cols.length; j++){
					var field = $(this).find('.cnt_input_box');
					var c = cols[j].getAttribute('class');
					el += '<div class="'+c+'">';
					el += field[j].outerHTML;
					el += '</div>';
				}
				el += '</div>';
			});

			box += el;
			box += '</div>';

			var txt = __code_box.val();
			__code_box.val(txt + box);
		});

		__mr_box.hide();
		__generate_box.hide();
		__code_box.show();

		btn.attr('data-code-btn', 'editor');
		btn.html('<i class="fa fa-angle-double-left"></i> Back');
	}

	if(btn_txt === 'editor'){
		__code_box.hide();
		__generate_box.hide();
		__mr_box.show();
		__mr_btn.show();

		btn.attr('data-code-btn', 'code');
		btn.html('View HTML <i class="fa fa-code"></i>')
	}
}

function heading_text(){
	var par = $(this).parent('.desc_box');
	var box = par.find('.add_desc_box');
	$(this).hide();
	box.show();
}

function remove_action(){
	var btn = $(this);
	var txt = btn.attr('data-remove-txt');

	// alert 

	if(txt === 'main'){
		var box = $(this).parents('.cb_layer_box:first');
		box.remove();
	}

	if(txt === 'inner_row'){
		var box = $(this).parents('.inner_col__box:first');
		box.remove();
	}

	if(txt === 'field'){
		var par = btn.parents('.field_box:first');
		var sel = par.find('.form_field_select:first');
		var div = par.find('div:first');

		// Alert first

		div.html('');
		var op = sel.find('option')[0];
		sel.val(op.innerText);
		sel.show();
	}

	if(txt === 'heading'){
		var par = btn.parents('.desc_box');
		var btn = par.find('.add_desc_btn');
		var box = par.find('.add_desc_box');

		box.find('span:first').text('-- Description text here');

		box.hide();
		btn.show();
	}
}

function minimize_action(){
	var btn = $(this);
	var txt = btn.attr('data-minimize-txt');

	if(txt === 'main'){
		var par = btn.parents('.cb_layer_box:first');
		var min_tb = par.find('.on_minimize:first');
		var min_txt = par.find('.group_title:first');
		var side_bar = par.find('.side_move_bar:first');

		var box = par.find('.minimize_box:first');
		if(box.is(':visible')){
			par.addClass('minimize_cover');
			box.hide();
			btn.html('<i class="fa fa-plus"></i>');
			min_tb.html('<h2 class="group_title">'+min_txt.text()+'</h2>');

			side_bar.removeClass('cb_move_btn');
		}else{
			min_tb.html('');
			par.removeClass('minimize_cover');
			box.show();
			btn.html('<i class="fa fa-minus"></i>');
			side_bar.addClass('cb_move_btn');
		}
	}

	if(txt === 'inner_row'){
		var par = btn.parents('.inner_col__box:first');
		var box = par.find('.form_row_box:first');
		if(box.is(':visible')){
			box.hide();
			btn.html('<i class="fa fa-plus"></i>');
		}else{
			box.show();
			btn.html('<i class="fa fa-minus"></i>');
		}
	}
}

function copy_action(){
	var btn = $(this);
	var txt = btn.attr('data-copy-txt');

	if(txt === 'main'){
		var row = btn.parents('.main_row_append_box:first');
		var box = btn.parents('.cb_layer_box:first');

		var c = box.clone(true, true);
		box.after(c);
	}

	if(txt === 'inner_row'){
		var row = btn.parents('.inner_row_append_box:first');
		var box = btn.parents('.inner_col__box:first');

		var c = box.clone(true, true);
		box.after(c);
	}
}

// Delete Option 
function remove_option(){
	var txt = $(this).attr('data-rem-text');
	var box;

	// alert

	if(txt === 'checkbox' || txt === 'radio'){
		box = $(this).parents('.'+txt+':first');
		box.remove();
	}

	if(txt === 'select'){
		var par = $(this).parents('.cnt_input_box:first');
		var li = $(this).parent('li');
		var op_txt = li.attr('data-select-val');
		var sel = par.find('select');

		var ops = sel.find('option');

		ops.each(function(i, v){
			if(op_txt === v.innerText){
				li.remove();
				v.remove();
				console.log('Removed '+op_txt);
			}
		});
		// console.log(op, sel);
	}
}

/**
 * Helpers
 * @param  {[type]} len [description]
 * @return {[type]}     [description]
 */
function make_id(len) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < len; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function slugify(text){
	return text.toString().toLowerCase()
		.replace(/\s+/g, '_')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '_')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}


// Actions
__generate_btn.on('click', generate_form_data);
__html_btn.on('click', switch_view);

__col_btn.on('click', make_column);
__mr_btn.on('click', add_main_row);

__doc.on('click', '.inner_row_btn', add_inner_row);
__doc.on('change', '.col_btn', add_column);

__doc.on('change', '.form_field_select', on_select_field);
__doc.on('keyup', '.in_field', add_field_title);
__doc.on('click', '.add_select_option', add_options);
__doc.on('click', '.delete', remove_option);
__doc.on('click', '.add_desc_btn', heading_text);

__doc.on('click', '.remove_btn', remove_action);
__doc.on('click', '.minimize_btn', minimize_action);
__doc.on('click', '.copy_btn', copy_action);



