var Checkin = (function () {
	var btn,
		player_list,
		checkin_url,
		game_id,
		opt_in_btn,
		opt_out_btn,
		popup,
		close,
		name_input,
		no_players_el;

	function init(config) {
		btn = config.btn;
		player_list = config.player_list;
		no_players_el = config.no_players_el;
		checkin_url = $(btn).data('checkin-url');
		game_id = $(btn).data('game-id');
		build_popup();

		// Listeners
		$(close).on('click', function() {
			popup.style.display = 'none';
		});

		$(btn).on('click', function(e) {
			e.preventDefault();
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
		opt_in_btn.innerText = 'I\'M IN!';

		opt_out_btn = document.createElement('div');
		opt_out_btn.className = 'opt_btn opt_out';
		opt_out_btn.innerText = 'I\'M OUT!';

		popup.appendChild(close);
		popup.appendChild(name_input);
		popup.appendChild(opt_in_btn);
		popup.appendChild(opt_out_btn);

		document.body.appendChild(popup);

		popup.style.display = 'none';
	}

	function checkin(attending) {
		if (name_input.value) {
			$.ajax({
			url: checkin_url + '.json',
			type: 'POST',
			data: { player: { name: name_input.value, game_id: game_id, attending: attending }}
			})
			.done(function(data) {
				console.log("success", data);
				add_player(data.id, data.name, data.attending, data.url);
				name_input.value = '';
				popup.style.display = 'none';
			})
			.fail(function() {
				alert("Couldn't check in. Please try again.");
			});
		}
	}

	function add_player(id, name, attending, url) {
		var player_li = document.createElement('li');

		if (no_players_el) {
			no_players_el.style.display = 'none';
		}
		name_input.value = '';
		player_li.innerText = name;
		player_li.className = attending ? 'attending' : 'not_attending';
		player_li.id = id;
		$(player_li).data('update-url', url);
		player_list.appendChild(player_li);
	}

	return {
		init: init
	}
})();

$(document).ready(function() {
	Checkin.init({
		btn: $('[data-checkin-url]')[0],
		player_list: $('.player_list')[0],
		no_players_el: $('#no_players')[0]
	});
});