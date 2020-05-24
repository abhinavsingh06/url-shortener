class Category < ApplicationRecord
  has_many :urls, dependent: :nullify, foreign_key: :category_id
  validates :name, presence: true, uniqueness: {case_sensitive: false}
  before_save :downcase_fields

  private

  def downcase_fields
    self.name.downcase!
  end
end
