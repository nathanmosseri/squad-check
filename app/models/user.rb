class User < ApplicationRecord

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :name, presence: true

    has_many :memberships
    has_many :teams, through: :memberships
    has_many :hockey_stats
    has_many :basketball_stats
    has_many :baseball_stats
    has_many :attendings

    
end

