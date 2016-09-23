class PlayersController < ApplicationController
	def create
		next_date = view_context.date_of_next("Monday")

		if params[:player][:game_id].present?
			@player = Player.create!(player_params)
		end

		respond_to do |format|
			format.json { render json: @player.to_json }
		end
	end

	def player_params
		params.require(:player).permit(:name, :game_id, :attending)
	end
end