class Api::GameBaseballStatsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def update
        stat = find_game_stat
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
        
        season_stat = BaseballStat.find_by(user_id: stat.user_id, team_id: stat.game.team.id)
        sgp = season_stat.games_played.to_i + params[:games_played].to_i
        sab = season_stat.at_bats.to_i + params[:at_bats].to_i
        srbi = season_stat.runs_batted_in.to_i + params[:runs_batted_in].to_i
        shr = season_stat.home_runs.to_i + params[:home_runs].to_i
        shit = season_stat.hits.to_i + params[:hits].to_i
        sbs = season_stat.batter_strikeouts.to_i + params[:batter_strikeouts].to_i
        sbw = season_stat.batter_walks.to_i + params[:batter_walks].to_i
        ssb = season_stat.stolen_bases.to_i + params[:stolen_bases].to_i
        sip = season_stat.innings_pitched.to_i + params[:innings_pitched].to_i
        sha = season_stat.hits_allowed.to_i + params[:hits_allowed].to_i
        sra = season_stat.runs_allowed.to_i + params[:runs_allowed].to_i
        sps = season_stat.pitcher_strikeouts.to_i + params[:pitcher_strikeouts].to_i
        spw = season_stat.pitcher_walks.to_i + params[:pitcher_walks].to_i
        season_stat.update!(games_played: sgp, at_bats: sab, runs_batted_in: srbi, home_runs: shr, hits: shit, batter_strikeouts: sbs, batter_walks: sbw, stolen_bases: ssb, innings_pitched: sip, hits_allowed: sha, runs_allowed: sra, pitcher_strikeouts: sps, pitcher_walks: spw)
        
        render json: stat
    end

    private 

    def find_game_stat
        GameBaseballStat.find(params[:id])
    end

    def render_not_found
        render json: {error: 'Please select a player'}
    end

end
