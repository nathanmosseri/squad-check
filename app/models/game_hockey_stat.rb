class GameHockeyStat < ApplicationRecord

    belongs_to :game

    def name 
        name = User.find(self.user_id)
        name.name
    end

end
