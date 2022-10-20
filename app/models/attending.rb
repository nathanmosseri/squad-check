class Attending < ApplicationRecord

    belongs_to :game
    belongs_to :user

    def name 
        self.user.name
    end

end
