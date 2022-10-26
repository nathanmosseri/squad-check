class Game < ApplicationRecord

    belongs_to :team
    # belongs_to :user
    has_many :attendings, dependent: :destroy

    validates :datetime, presence: true

    def past?
        if self.datetime < DateTime.now
            true
        else
            false
        end
    end

    def formatted_date
        self.datetime.strftime('%A, %B %d, %Y %I:%M%P')
    end

end
