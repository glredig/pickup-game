class PlayersController < ApplicationController
	def create
		next_date = view_context.date_of_next("Monday")

		if params[:player][:game_id].present?
			@player = Player.create!(player_params)
		end

		respond_to do |format|
			format.json { render json: @player.attributes.merge({ url: player_url(@player)}) }
		end
	end

	def update
		player = Player.find(params[:id])

		respond_to do |format|
			if player.update_attributes(player_params)
				format.json { render json: player.to_json }
			else
				format.json { render json: { "error" => "Could not update player." }}
			end
		end
	end

	def player_params
		params.require(:player).permit(:id, :name, :game_id, :attending)
	end
end