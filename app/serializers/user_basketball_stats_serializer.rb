class UserBasketballStatsSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :team_id, :games_played, :points, :assists, :blocks, :rebounds, :steals, :three_pointers_hit, :three_pointers_attempted, :three_pointer_percentage, :team_name, :season, :created_at
end
