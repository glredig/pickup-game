class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
    	t.datetime :date
    	t.text :notes
    	t.timestamps
    end
  end
end
