Rails.application.routes.draw do
  root 'urls#index'
  resources :urls, only: [:create, :show], param: :short
end
