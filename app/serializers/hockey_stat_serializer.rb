class HockeyStatSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :team_id, :games_played, :goals, :assists, :penalty_minutes, :plus_minus, :saves, :goals_allowed

end
