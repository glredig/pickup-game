class Game < ActiveRecord::Base
	has_many :players

	default_scope { order('date ASC') }
end