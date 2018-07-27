class CreateFormulations < ActiveRecord::Migration[5.1]
  def change
    create_table :formulations do |t|
      t.string :name
    end
  end
end
