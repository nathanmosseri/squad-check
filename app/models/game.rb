class Game < ApplicationRecord

    belongs_to :team
    # belongs_to :user
    has_many :attendings

    validates :datetime, presence: true

    def past?
        if self.datetime < DateTime.now
            true
        else
            false
        end
    end

end
