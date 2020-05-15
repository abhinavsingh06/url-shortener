Rails.application.routes.draw do
  post '/url' => 'urls#create'
  get "/:short_url" => 'urls#shortened'
end
