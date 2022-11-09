class Api::BaseballStatsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index 
        baseball = BaseballStat.all
        render json: baseball
    end

    def update
        stat = find_baseball_stat
        gp = stat.games_played.to_i + params[:games_played].to_i
        ab = stat.at_bats.to_i + params[:at_bats].to_i
        rbi = stat.runs_batted_in.to_i + params[:runs_batted_in].to_i
        hr = stat.home_runs.to_i + params[:home_runs].to_i
        hit = stat.hits.to_i + params[:hits].to_i
        bs = stat.batter_strikeouts.to_i + params[:batter_strikeouts].to_i
        bw = stat.batter_walks.to_i + params[:batter_walks].to_i
        sb = stat.stolen_bases.to_i + params[:stolen_bases].to_i
        ip = stat.innings_pitched.to_i + params[:innings_pitched].to_i
        ha = stat.hits_allowed.to_i + params[:hits_allowed].to_i
        ra = stat.runs_allowed.to_i + params[:runs_allowed].to_i
        ps = stat.pitcher_strikeouts.to_i + params[:pitcher_strikeouts].to_i
        pw = stat.pitcher_walks.to_i + params[:pitcher_walks].to_i
        stat.update!(games_played: gp, at_bats: ab, runs_batted_in: rbi, home_runs: hr, hits: hit, batter_strikeouts: bs, batter_walks: bw, stolen_bases: sb, innings_pitched: ip, hits_allowed: ha, runs_allowed: ra, pitcher_strikeouts: ps, pitcher_walks: pw)
        render json: stat
    end

    private 

    def find_baseball_stat
        BaseballStat.find(params[:id])
    end

    def baseball_params
        params.permit(:games_played, :at_bats, :runs_batted_in, :home_runs, :hits, :batter_strikeouts, :batter_walks, :stolen_bases, :innings_pitched, :hits_allowed, :runs_allowed, :pitcher_strikeouts, :pitcher_walks)
    end

    def render_not_found
        render json: {error: 'Please select a player'}, status: :not_found
    end

end
