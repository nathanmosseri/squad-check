class HockeyStatsController < ApplicationController

    def index 
        hockey = HockeyStat.all 
        render json: hockey
    end

end
