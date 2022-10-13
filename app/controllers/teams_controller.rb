class TeamsController < ApplicationController

    def index 
        teams = Team.all 
        render json: teams
    end

    def show
        team = find_team
        render json: team
    end

    private 

    def find_team
        Team.find(params[:id])
    end

end
