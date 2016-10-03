class HomesController < ApplicationController
	def index
		@next_game = Game.where(date: DateTime.now.in_time_zone("Pacific Time (US & Canada)")..1.week.from_now).first
	end
end