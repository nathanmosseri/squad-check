class HockeyStatsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index 
        hockey = HockeyStat.all 
        render json: hockey
    end

    def update 
        stat = find_hockey_stat
        gp = stat.games_played.to_i + params[:games_played].to_i
        goal = stat.goals.to_i + params[:goals].to_i
        assist = stat.assists.to_i + params[:assists].to_i
        pim = stat.penalty_minutes.to_i + params[:penalty_minutes].to_i
        pm = stat.plus_minus.to_i + params[:plus_minus].to_i
        save = stat.saves.to_i + params[:saves].to_i
        ga = stat.goals_allowed.to_i + params[:goals_allowed].to_i
        stat.update!(games_played: gp, goals: goal, assists: assist, penalty_minutes: pim, plus_minus: pm, saves: save, goals_allowed: ga)
        render json: stat
    end

    private 

    def find_hockey_stat
        HockeyStat.find(params[:id])
    end

    def hockey_params
        params.permit(:games_played, :goals, :assists, :penalty_minutes, :plus_minus, :saves, :goals_allowed)
    end

    def render_not_found
        render json: {error: 'Please select a player'}, status: :not_found
    end


end
