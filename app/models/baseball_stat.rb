class BaseballStat < ApplicationRecord

    belongs_to :team
    belongs_to :user

    def name 
    name = User.find(self.user_id)
    name.name
    end

end
