class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo, :league, :season, :description, :wins, :loses, :ties, :overtime_loses, :sport, :uid, :admin

  has_many :games do
    object.games.order(:datetime)
  end

  has_many :users

  has_many :hockey_stats, serializer: TeamHockeyStatsSerializer
  has_many :basketball_stats, serializer: TeamBasketballSerializerSerializer
  has_many :baseball_stats, serializer: TeamBaseballStatsSerializer
  

end
