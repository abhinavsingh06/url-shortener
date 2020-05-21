class Category < ApplicationRecord
  has_many :urls, dependent: :nullify
end
