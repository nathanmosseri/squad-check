class BasketballStatsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index 
        basketball = BasketballStat.all 
        render json: basketball
    end

    def update
        stat = find_bball_stat
        gp = stat.games_played.to_i + params[:games_played].to_i
        point = stat.points.to_i + params[:points].to_i
        assist = stat.assists.to_i + params[:assists].to_i
        block = stat.blocks.to_i + params[:blocks].to_i
        rebound = stat.rebounds.to_i + params[:rebounds].to_i
        steal = stat.steals.to_i + params[:steals].to_i
        tph = stat.three_pointers_hit.to_i + params[:three_pointers_hit].to_i
        tpa = stat.three_pointers_attempted.to_i + params[:three_pointers_attempted].to_i
        stat.update!(games_played: gp, points: point, assists: assist, blocks: block, rebounds: rebound, steals: steal, three_pointers_hit: tph, three_pointers_attempted: tpa)
        render json: stat
    end

    private

    def find_bball_stat
        BasketballStat.find(params[:id])
    end

    def stat_params
        params.permit(:games_played, :points, :assists, :blocks, :rebounds, :steals, :three_pointers_hit, :three_pointers_attempted)
    end

    def render_not_found
        render json: {error: 'Please select a player'}, status: :not_found
    end

end
