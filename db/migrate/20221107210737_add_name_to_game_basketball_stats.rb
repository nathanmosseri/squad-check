class AddNameToGameBasketballStats < ActiveRecord::Migration[7.0]
  def change
    add_column :game_basketball_stats, :name, :string
  end
end
