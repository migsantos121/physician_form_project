class CreateCustomizedFormulations < ActiveRecord::Migration[5.1]
  def change
    create_table :customized_formulations do |t|
      t.string :name
      t.string :address
      t.datetime :birthday
      t.text :ingredients

      t.timestamps
    end
  end
end
