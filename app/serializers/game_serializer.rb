class GameSerializer < ActiveModel::Serializer
  attributes :id, :team_id, :opponent, :datetime, :location, :home, :result, :points_for, :points_against, :past?, :attendings, :formatted_date

  has_many :attendings, serializer: AttendingSerializer

end
