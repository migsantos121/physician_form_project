class CustomizedFormulationController < ApplicationController


    def show
      @customForm = CustomizedFormulation.find_by_id(params[:id])
      @ingredients = JSON.parse(@customForm.ingredients)
      puts "@ingredients"
      puts @ingredients
      puts @customForm.ingredients
      
      respond_to do |format|
        format.html
        format.pdf do
          render :pdf => 'file_name',
          :template => 'customized_formulation/show.pdf.erb',
          :layout => 'pdf.html.erb',
          :page_height => 298,
          :page_width => 240,
          :margin => {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          },
          #:zoom => 5,
          :show_as_html => params[:debug].present?
        end
      end
    end
    private
    def custom_formula_params
      params.permit(:id)
    end
end
  