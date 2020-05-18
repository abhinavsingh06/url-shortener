Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'urls/index'
      resources :urls, only: [:create, :show], param: :short
    end
  end
  root 'static#index'
  get '/*path' => 'static#index'
end
