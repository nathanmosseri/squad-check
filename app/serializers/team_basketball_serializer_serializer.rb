class TeamBasketballSerializerSerializer < ActiveModel::Serializer
  attributes :name, :games_played, :points, :assists, :blocks, :rebounds, :steals, :three_pointer_percentage, :three_pointers_hit, :three_pointers_attempted
end
