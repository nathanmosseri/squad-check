class BaseballStatSerializer < ActiveModel::Serializer
  attributes :name, :games_played, :at_bats, :batting_average, :runs_batted_in, :home_runs, :hits, :batter_strikeouts, :batter_walks, :stolen_bases, :innings_pitched, :earned_run_average, :hits_allowed, :runs_allowed, :pitcher_strikeouts, :pitcher_walks
end
