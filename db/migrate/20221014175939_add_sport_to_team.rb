class AddSportToTeam < ActiveRecord::Migration[7.0]
  def change
    add_column :teams, :sport, :string
  end
end
