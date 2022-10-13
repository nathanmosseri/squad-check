class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo, :league, :description, :wins, :loses, :ties, :overtime_loses

  has_many :games do
    object.games.order(:datetime)
  end

  has_many :users

  has_many :hockey_stats, serializer: TeamHockeyStatsSerializer
  has_many :basketball_stats, serializer: TeamBasketballSerializerSerializer
  has_many :baseball_stats, serializer: TeamBaseballStatsSerializer

end
