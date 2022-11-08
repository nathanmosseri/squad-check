class CreateGameHockeyStats < ActiveRecord::Migration[7.0]
  def change
    create_table :game_hockey_stats do |t|
      t.integer :user_id
      t.integer :game_id
      t.integer :games_played
      t.integer :goals
      t.integer :assists
      t.integer :penalty_minutes
      t.integer :plus_minus
      t.integer :saves
      t.integer :goals_allowed
      t.float :save_precentage

      t.timestamps
    end
  end
end
