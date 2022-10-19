class Team < ApplicationRecord

    has_many :memberships
    has_many :users, through: :memberships
    has_many :games
    has_many :hockey_stats
    has_many :basketball_stats
    has_many :baseball_stats

    validates :name, presence: true
    validates :season, presence: true
    validates :sport, presence: true
    validates :uid, uniqueness: true

end
