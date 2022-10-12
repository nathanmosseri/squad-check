class CreateBaseballStats < ActiveRecord::Migration[7.0]
  def change
    create_table :baseball_stats do |t|
      t.integer :user_id
      t.integer :team_id
      t.integer :games_played
      t.integer :at_bats
      t.integer :hits
      t.float :batting_average
      t.integer :batter_strikeouts
      t.integer :batter_walks
      t.integer :runs_batted_in
      t.integer :home_runs
      t.integer :stolen_bases
      t.integer :pitcher_strikeouts
      t.float :innings_pitched
      t.integer :hits_allowed
      t.integer :runs_allowed
      t.float :earned_run_average
      t.integer :pitcher_walks

      t.timestamps
    end
  end
end
