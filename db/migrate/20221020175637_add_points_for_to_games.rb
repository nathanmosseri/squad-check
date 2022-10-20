class AddPointsForToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :points_for, :integer
  end
end
