class UsershowwithteamsSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :phone_number

  has_many :teams
  has_many :hockey_stats, serializer: UserHockeyStatsSerializer
  has_many :baseball_stats, serializer: UserBaseballStatsSerializer
  has_many :basketball_stats, serializer: UserBasketballStatsSerializer


end
