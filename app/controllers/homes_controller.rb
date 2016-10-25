class HomesController < ApplicationController
	def index
		@next_game = Game.where('date > ?', DateTime.now.beginning_of_day ).first
	end
end