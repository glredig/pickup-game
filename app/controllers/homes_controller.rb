class HomesController < ApplicationController
	def index
		@next_game = Game.where('date > ?', DateTime.yesterday ).first
	end
end