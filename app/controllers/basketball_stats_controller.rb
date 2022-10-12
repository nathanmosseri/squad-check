class BasketballStatsController < ApplicationController

    def index 
        basketball = BasketballStat.all 
        render json: basketball
    end

end
