class Url < ApplicationRecord
  SLUG_LENGTH = 8
  validates :original, presence: true, on: :create
  validates :short, uniqueness: true

  def generate_slug
    loop do
      self.short = SecureRandom.alphanumeric(8)
      break unless Url.exists?( short: self.short )
    end
  end
end
