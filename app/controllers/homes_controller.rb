class HomesController < ApplicationController
	def index
		@next_game = Game.where(date: DateTime.now.in_time_zone("Alaska")..1.week.from_now).first
	end
end