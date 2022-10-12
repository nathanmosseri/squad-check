User.destroy_all
Team.destroy_all
Membership.destroy_all
HockeyStat.destroy_all
BaseballStat.destroy_all
BasketballStat.destroy_all
Game.destroy_all

40.times do 
    User.create!(
        name: Faker::Name.name,
        username: Faker::Internet.username,
        password: '123',
        email: Faker::Internet.free_email,
        phone_number: Faker::PhoneNumber.cell_phone
    )
end

5.times do 
    Team.create!(
        name: Faker::Sports::Basketball.team,
        logo: 'https://media.npr.org/assets/img/2020/06/10/gettyimages-200199027-001-b5fb3d8d8469ab744d9e97706fa67bc5c0e4fa40.jpg',
        league: Faker::Sports::Football.competition,
        description: Faker::Quote.yoda,
        wins: 0,
        loses: 0,
        ties: 0,
        overtime_loses: 0
    )
end

50.times do 
    Membership.create!(
        user_id: User.all.sample.id,
        team_id: Team.all.sample.id
    )
end

40.times do 
    HockeyStat.create!(
        user_id: User.all.sample.id,
        team_id: Team.all.sample.id,
        games_played: 0,
        goals: 0,
        assists: 0,
        penalty_minutes: 0,
        plus_minus: 0,
        saves: 0,
        goals_allowed: 0,
        save_precentage: 0.000
    )
end

40.times do 
    BasketballStat.create!(
        user_id: User.all.sample.id,
        team_id: Team.all.sample.id,
        games_played: 0,
        points: 0,
        assists: 0,
        blocks: 0,
        rebounds: 0,
        steals: 0,
        three_pointers_hit: 0,
        three_pointers_attempted: 0,
        three_pointer_percentage: 0.0
    )
end

40.times do 
    BaseballStat.create!(
        user_id: User.all.sample.id,
        team_id: Team.all.sample.id,
        games_played: 0,
        at_bats: 0,
        hits: 0,
        batting_average: 0.000,
        batter_strikeouts: 0,
        batter_walks: 0,
        runs_batted_in: 0,
        home_runs: 0,
        stolen_bases: 0,
        pitcher_strikeouts: 0,
        pitcher_walks: 0,
        innings_pitched: 0.0,
        hits_allowed: 0,
        runs_allowed: 0,
        earned_run_average: 0.0
    )
end

40.times do 
    Game.create!(
        team_id: Team.all.sample.id,
        opponent: Faker::Sports::Basketball.team,
        datetime: Faker::Time.between(from: '2022-10-20', to: '2023-2-25', format: :default),
        location: Faker::Address.full_address,
        home: [true, false].sample,
        result: '0 - 0'
    )
end





