class HomesController < ApplicationController
	def index
		@next_game = Game.where('date > ?', DateTime.now - 11.hours ).first
	end
end