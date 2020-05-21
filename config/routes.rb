Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :urls, only: [:index, :create, :show, :update], param: :short
      resources :categories, param: :name
    end
  end
  root 'static#index'
  get '/*path' => 'static#index'
end
