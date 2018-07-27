class CreateFormulationIngredients < ActiveRecord::Migration[5.1]
  def change
    create_table :formulation_ingredients do |t|
      t.integer :formulation_id
      t.integer :ingredient_id
      t.decimal :percentage
    end
  end
end
