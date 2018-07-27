class CreateIngredients < ActiveRecord::Migration[5.1]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.decimal :minimum_percentage
      t.decimal :maximum_percentage
      t.text :description
      t.text :classes, array: true, default: []
    end
  end
end
