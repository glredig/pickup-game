class HomesController < ApplicationController
	def index
		@next_game = Game.where(date: Date.today..1.week.from_now).first
	end
end