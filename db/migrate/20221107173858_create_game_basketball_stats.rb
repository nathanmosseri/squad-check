class CreateGameBasketballStats < ActiveRecord::Migration[7.0]
  def change
    create_table :game_basketball_stats do |t|
      t.integer :user_id
      t.integer :game_id
      t.integer :games_played
      t.integer :points
      t.integer :assists
      t.integer :blocks
      t.integer :rebounds
      t.integer :steals
      t.integer :three_pointers_hit
      t.integer :three_pointers_attempted
      t.float :three_pointer_percentage

      t.timestamps
    end
  end
end
