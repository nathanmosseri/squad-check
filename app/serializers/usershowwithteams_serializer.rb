class UsershowwithteamsSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :phone_number

  has_many :teams
  has_many :hockey_stats
  has_many :baseball_stats
  has_many :basketball_stats


end
