class UserHockeyStatsSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :team_id, :games_played, :goals, :assists, :penalty_minutes, :plus_minus, :saves, :goals_allowed, :save_precentage, :team_name, :season, :created_at
end
