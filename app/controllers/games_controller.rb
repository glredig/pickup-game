class GamesController < ApplicationController
	def create
		@game = Game.create!(game_params)
	end

	def game_params
		params.require(:game).permit(:date, :notes)
	end
end