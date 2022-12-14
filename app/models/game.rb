class Game < ApplicationRecord

    belongs_to :team
    # belongs_to :user
    has_many :attendings, dependent: :destroy
    has_many :game_baseball_stats, dependent: :destroy
    has_many :game_hockey_stats, dependent: :destroy
    has_many :game_basketball_stats, dependent: :destroy

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
