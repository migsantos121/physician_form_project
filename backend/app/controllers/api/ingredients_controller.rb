class Api::IngredientsController < ApiController
    respond_to :json
    skip_before_action :restrict_access
  
    def index
      respond_with :api, Ingredient.all
    end
  end
  