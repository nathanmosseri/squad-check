class AddNameToGameBaseballStats < ActiveRecord::Migration[7.0]
  def change
    add_column :game_baseball_stats, :name, :string
  end
end
