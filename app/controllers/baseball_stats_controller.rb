class BaseballStatsController < ApplicationController

    def index 
        baseball = BaseballStat.all
        render json: baseball
    end

end
