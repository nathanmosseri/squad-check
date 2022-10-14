class AddSeasonToTeam < ActiveRecord::Migration[7.0]
  def change
    add_column :teams, :season, :integer
  end
end
