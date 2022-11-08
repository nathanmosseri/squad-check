class GameHockeyStatsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def update 
        stat = find_game_stat
        gp = stat.games_played.to_i + params[:games_played].to_i
        goal = stat.goals.to_i + params[:goals].to_i
        assist = stat.assists.to_i + params[:assists].to_i
        pim = stat.penalty_minutes.to_i + params[:penalty_minutes].to_i
        pm = stat.plus_minus.to_i + params[:plus_minus].to_i
        save = stat.saves.to_i + params[:saves].to_i
        ga = stat.goals_allowed.to_i + params[:goals_allowed].to_i
        stat.update!(games_played: gp, goals: goal, assists: assist, penalty_minutes: pim, plus_minus: pm, saves: save, goals_allowed: ga)
        
        season_stat = HockeyStat.find_by(user_id: stat.user_id, team_id: stat.game.team.id)
        sgp = season_stat.games_played.to_i + params[:games_played].to_i
        sgoal = season_stat.goals.to_i + params[:goals].to_i
        sassist = season_stat.assists.to_i + params[:assists].to_i
        spim = season_stat.penalty_minutes.to_i + params[:penalty_minutes].to_i
        spm = season_stat.plus_minus.to_i + params[:plus_minus].to_i
        ssave = season_stat.saves.to_i + params[:saves].to_i
        sga = season_stat.goals_allowed.to_i + params[:goals_allowed].to_i
        season_stat.update!(games_played: sgp, goals: sgoal, assists: sassist, penalty_minutes: spim, plus_minus: spm, saves: ssave, goals_allowed: sga)
        
        render json: stat
    end

    private 

    def find_game_stat
        GameHockeyStat.find(params[:id])
    end

    def render_not_found
        render json: {error: 'Please select a player'}
    end

end
