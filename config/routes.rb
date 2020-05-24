Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :urls, only: [:index, :create, :show, :update], param: :short
      resources :categories, only: [:index, :create, :update, :destroy], param: :id
    end
  end
  root 'static#index'
  get '/*path' => 'static#index'
end
