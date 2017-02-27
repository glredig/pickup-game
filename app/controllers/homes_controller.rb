class HomesController < ApplicationController
	def index
		@next_game = Game.where('date >= ?', DateTime.now - 20.hours ).first
	end
end