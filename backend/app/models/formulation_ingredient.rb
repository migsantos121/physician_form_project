class FormulationIngredient < ApplicationRecord
  has_one :formulation
  has_one :ingredient
end
