Rails.application.routes.draw do
  resources :game_basketball_stats
  resources :game_baseball_stats
  resources :game_hockey_stats
  # resources :attendings
  resources :games
  resources :baseball_stats
  resources :basketball_stats
  resources :hockey_stats
  resources :memberships
  resources :teams
  resources :users
  
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'users#login'
  post '/logout', to: 'users#logout'

  patch '/attendings/game/:game_id', to: 'attendings#update'

end
