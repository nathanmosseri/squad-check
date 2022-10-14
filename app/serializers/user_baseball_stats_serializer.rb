class UserBaseballStatsSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :team_id, :games_played, :at_bats, :hits, :batting_average, :batter_strikeouts, :batter_walks, :runs_batted_in, :home_runs, :stolen_bases, :pitcher_strikeouts, :innings_pitched, :hits_allowed, :runs_allowed, :earned_run_average, :pitcher_walks, :team_name
end
