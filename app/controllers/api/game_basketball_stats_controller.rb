class Api::GameBasketballStatsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def update
        stat = find_game_stat
        gp = stat.games_played.to_i + params[:games_played].to_i
        point = stat.points.to_i + params[:points].to_i
        assist = stat.assists.to_i + params[:assists].to_i
        block = stat.blocks.to_i + params[:blocks].to_i
        rebound = stat.rebounds.to_i + params[:rebounds].to_i
        steal = stat.steals.to_i + params[:steals].to_i
        tph = stat.three_pointers_hit.to_i + params[:three_pointers_hit].to_i
        tpa = stat.three_pointers_attempted.to_i + params[:three_pointers_attempted].to_i
        stat.update!(games_played: gp, points: point, assists: assist, blocks: block, rebounds: rebound, steals: steal, three_pointers_hit: tph, three_pointers_attempted: tpa)

        season_stat = BasketballStat.find_by(user_id: stat.user_id, team_id: stat.game.team.id)
        sgp = season_stat.games_played.to_i + params[:games_played].to_i
        spoint = season_stat.points.to_i + params[:points].to_i
        sassist = season_stat.assists.to_i + params[:assists].to_i
        sblock = season_stat.blocks.to_i + params[:blocks].to_i
        srebound = season_stat.rebounds.to_i + params[:rebounds].to_i
        ssteal = season_stat.steals.to_i + params[:steals].to_i
        stph = season_stat.three_pointers_hit.to_i + params[:three_pointers_hit].to_i
        stpa = season_stat.three_pointers_attempted.to_i + params[:three_pointers_attempted].to_i
        season_stat.update!(games_played: sgp, points: spoint, assists: sassist, blocks: sblock, rebounds: srebound, steals: ssteal, three_pointers_hit: stph, three_pointers_attempted: stpa)

        render json: stat
    end

    private 

    def find_game_stat
        GameBasketballStat.find(params[:id])
    end

    def render_not_found
        render json: {error: 'Please select a player'}
    end

end
