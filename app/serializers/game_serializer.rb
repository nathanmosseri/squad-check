class GameSerializer < ActiveModel::Serializer
  attributes :id, :team_id, :opponent, :datetime, :location, :home, :result, :points_for, :points_against, :past?, :attendings, :formatted_date, :game_hockey_stats, :game_baseball_stats, :game_basketball_stats

  # has_many :attendings, serializer: AttendingSerializer
  

  
end
