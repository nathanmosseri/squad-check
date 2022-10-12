class User < ApplicationRecord

    has_secure_password

    has_many :memberships 
    has_many :teams, through: :memberships

end

