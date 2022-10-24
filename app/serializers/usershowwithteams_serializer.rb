class UsershowwithteamsSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :phone_number

  has_many :teams do
    object.teams.order(season: :DESC)
  end
  has_many :hockey_stats, serializer: UserHockeyStatsSerializer do
    object.hockey_stats.order(updated_at: :DESC)
  end
  has_many :baseball_stats, serializer: UserBaseballStatsSerializer do
    object.baseball_stats.order(updated_at: :DESC)
  end
  has_many :basketball_stats, serializer: UserBasketballStatsSerializer do
    object.basketball_stats.order(updated_at: :DESC)
  end


end
