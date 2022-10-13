class GameSerializer < ActiveModel::Serializer
  attributes :id, :team_id, :opponent, :datetime, :location, :home, :result
end
