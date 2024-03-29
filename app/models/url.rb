class Url < ApplicationRecord
  belongs_to :category, foreign_key: :category_id, optional: true
  validates :original, presence: true, on: :create
  validates :short, uniqueness: true
  validates :count, presence: true, numericality: { only_integer: true }
  before_create :generate_slug
  has_many :visits

  private

  def generate_slug
    loop do
      self.short = SecureRandom.alphanumeric(8)
      break unless Url.exists?( short: self.short )
    end
  end
end
