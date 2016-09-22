class AddAttendingToPlayers < ActiveRecord::Migration
  def change
  	add_column :players, :attending, :boolean, default: true
  end
end
