class GameBasketballStatSerializer < ActiveModel::Serializer
  attributes :id, :name, :games_played, :points, :assists, :blocks, :rebounds, :steals, :three_pointers_hit, :three_pointers_attempted
end
