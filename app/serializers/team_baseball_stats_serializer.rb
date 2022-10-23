class TeamBaseballStatsSerializer < ActiveModel::Serializer
  attributes :id, :name, :games_played, :at_bats, :runs_batted_in, :home_runs, :hits, :batter_strikeouts, :batter_walks, :stolen_bases, :innings_pitched, :hits_allowed, :runs_allowed, :pitcher_strikeouts, :pitcher_walks
end
