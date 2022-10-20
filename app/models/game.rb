class Game < ApplicationRecord

    belongs_to :team
    # belongs_to :user
    has_many :attendings

    validates :datetime, presence: true

end
