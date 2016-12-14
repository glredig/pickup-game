var PlayerList = (function() {
	var $list,
		player_id,
		el;

	function build_popup() {
		popup = document.createElement('div');

		popup.className = 'checkin_popup';

		close = document.createElement('div');
		close.className = 'close_btn';
		close.innerText = 'X';

		display_name = document.createElement('span');
		display_name.style.fontWeight = 'bold';

		warning = document.createElement('p');
		warning.innerText = 'Please remember that others may have based their attendance on your status.';

		error = document.createElement('span');
		error.style.color = '#ff0000';

		name_input = document.createElement('input');
		name_input.type = 'text';
		name_input.placeholder = 'Your name';

		opt_in_btn = document.createElement('div');
		opt_in_btn.className = 'opt_btn opt_in';
		opt_in_btn.innerText = 'I\'M IN!';

		opt_out_btn = document.createElement('div');
		opt_out_btn.className = 'opt_btn opt_out';
		opt_out_btn.innerText = 'I\'M OUT!';

		popup.appendChild(close);
		popup.appendChild(display_name);
		popup.appendChild(warning);
		popup.appendChild(error);
		popup.appendChild(name_input);
		popup.appendChild(opt_in_btn);
		popup.appendChild(opt_out_btn);

		document.body.appendChild(popup);

		popup.style.display = 'none';
	}

	function show_popup(id, name, el) {
		display_name.innerText = name;
		popup.style.display = 'block';
	}

	function checkin(attending) {
		var checkin_url = $(el).data('update-url')
		if (validate(name_input.value)) {
			error.style.display = 'none';

			$.ajax({
				url: checkin_url + '.json',
				type: 'PUT',
				data: { player: { id: el.id, name: name_input.value, attending: attending }}
			})
			.done(function(data) {
				update_player(el, data.attending);
				name_input.value = '';
				popup.style.display = 'none';
			})
			.fail(function() {
				alert("Couldn't check in. Please try again.");
			});
		}
		else {
			error.innerText = 'You must enter your name as shown';
			error.style.display = 'inline';
		}
	}

	function update_player(el, attending) {
		el.className = attending ? 'attending' : 'not_attending';
	}

	function validate(name) {
		return name == el.innerText;
	}

	return {
		init: function(config) {
			$list = config.$list;
			$list[0].style.cursor = 'pointer';
			$list.on('click', function(e) {
				if ($(e.target).is('li')) {
					show_popup(e.target.id, e.target.innerText, e.target);
					player_id = e.target.id;
					el = e.target;
				}
			});
			build_popup();

			// Listeners
			$(close).on('click', function() {
				popup.style.display = 'none';
			});

			$(opt_in_btn).on('click', function() {
				checkin(true);
			});

			$(opt_out_btn).on('click', function() {
				checkin(false);
			});
		}
	}
})();

$(document).ready(function() {
	PlayerList.init({
		$list: $('.player_list')
	});
})