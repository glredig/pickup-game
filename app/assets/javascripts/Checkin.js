var Checkin = (function () {
	var btn,
		player_list,
		checkin_url,
		game_id,
		opt_in_btn,
		opt_out_btn,
		popup,
		close,
		name_input;

	function init(config) {
		btn = config.btn;
		player_list = config.player_list;
		checkin_url = $(btn).data('checkin-url');
		game_id = $(btn).data('game-id');
		build_popup();

		console.log("pl", config);
		// Listeners

		$(close).on('click', function() {
			popup.style.display = 'none';
		});

		$(btn).on('click', function(e) {
			e.preventDefault();
			console.log("click");
			popup.style.display = 'block';
		});

		$(opt_in_btn).on('click', function() {
			checkin(true);
		});

		$(opt_out_btn).on('click', function() {
			checkin(false);
		});
	}

	function build_popup() {
		popup = document.createElement('div');

		popup.className = 'checkin_popup';

		close = document.createElement('div');
		close.className = 'close_btn';
		close.innerText = 'X';

		name_input = document.createElement('input');
		name_input.type = 'text';
		name_input.placeholder = 'Your name';

		opt_in_btn = document.createElement('div');
		opt_in_btn.className = 'opt_btn opt_in';
		opt_in_btn.innerText = 'I\'m in!';

		opt_out_btn = document.createElement('div');
		opt_out_btn.className = 'opt_btn opt_out';
		opt_out_btn.innerText = 'I\'m out!';

		popup.appendChild(close);
		popup.appendChild(name_input);
		popup.appendChild(opt_in_btn);
		popup.appendChild(opt_out_btn);

		document.body.appendChild(popup);

		popup.style.display = 'none';
	}

	function checkin(attending) {
		$.ajax({
			url: checkin_url + '.json',
			type: 'POST',
			data: { player: { name: name_input.value, game_id: game_id, attending: attending }}
		})
		.done(function(data) {
			console.log("success", data);
			add_player(data.name, data.attending);
			name_input.value = '';
			popup.style.display = 'none';
		})
		.fail(function() {
			console.log("failure");
		});
	}

	function add_player(name, attending) {
		var player_li = document.createElement('li');

		player_li.innerText = name + ' ' + (attending ? 'IN' : 'OUT');
		player_li.className = attending ? 'attending' : 'not_attending';
		player_list.appendChild(player_li);
	}

	return {
		init: init
	}
})();

$(document).ready(function() {
	Checkin.init({
		btn: $('[data-checkin-url]')[0],
		player_list: $('.player_list')[0]
	});
});