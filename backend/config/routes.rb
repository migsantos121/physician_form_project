Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :formulations, only: [ :index] do
    end
    resources :ingredients, only: [ :index] do
    end
    resources :formulation_ingredients, only: [ :index] do
    end
    post 'formulation_ingredients/show_ingredients' => 'formulation_ingredients#show_ingredients', :defaults => { format: 'json' }
    post 'customized_formulation' => 'customized_formulation#create', :defaults => { format: 'json' }
  end
  get 'customized_formulation/:id' => 'customized_formulation#show'
  root 'welcome#index'
end
