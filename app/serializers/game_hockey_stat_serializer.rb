class GameHockeyStatSerializer < ActiveModel::Serializer
  attributes :id, :name, :games_played, :goals, :assists, :penalty_minutes, :plus_minus, :saves, :goals_allowed
end
