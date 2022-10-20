class AddPointsAgainstToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :points_against, :integer
  end
end
