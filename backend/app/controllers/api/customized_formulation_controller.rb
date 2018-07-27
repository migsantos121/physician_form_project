class Api::CustomizedFormulationController < ApiController
    respond_to :json
    skip_before_action :restrict_access

    def create
        @customized_formulation = CustomizedFormulation.new(
            name: params[:name],
            address: params[:address],
            birthday: params[:birthday],
            ingredients: params[:ingredients]
        )
        if (@customized_formulation.save)
          render json: {
            success: true,
            url: request.protocol + request.host_with_port + '/customized_formulation/'+@customized_formulation.id.to_s+".pdf"
          }
        else
          render json: {
            success: false,
            message: @customized_formulation.errors.full_messages 
          }
        end
    end
    private
      def custom_formula_params
        params.permit(:name, :address, :birthday, :ingredients)
      end
  end
  