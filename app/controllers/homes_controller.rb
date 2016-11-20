class HomesController < ApplicationController
	def index
		@next_game = Game.where('date > ?', DateTime.now - 8.hours ).first
	end
end