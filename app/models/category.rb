class Category < ApplicationRecord
  has_many :urls, dependent: :nullify
  validates :name, presence: true, uniqueness: {case_sensitive: false}
  before_save :downcase_fields

  private

  def downcase_fields
    self.name.downcase!
  end
end
