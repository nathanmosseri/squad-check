class AddUidToTeams < ActiveRecord::Migration[7.0]
  def change
    add_column :teams, :uid, :text
  end
end
