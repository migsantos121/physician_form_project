class Api::FormulationIngredientsController < ApiController
    respond_to :json
    skip_before_action :restrict_access
  
    def index
      respond_with :api, FormulationIngredient.all
    end

    def show_ingredients
      puts params[:formulation_id]
      @filtered_query = FormulationIngredient.where(formulation_id: params[:formulation_id])
      render json: @filtered_query
    end
  
    private
      def formulation_ingredient_params
        params.permit(:formulation_id)
      end
  end
  