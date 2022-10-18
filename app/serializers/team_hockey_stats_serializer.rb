class TeamHockeyStatsSerializer < ActiveModel::Serializer
  attributes :name, :games_played, :goals, :assists, :penalty_minutes, :plus_minus, :save_precentage, :saves, :goals_allowed

end
