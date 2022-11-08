class AddNameToGameHockeyStats < ActiveRecord::Migration[7.0]
  def change
    add_column :game_hockey_stats, :name, :string
  end
end
