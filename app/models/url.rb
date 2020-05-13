class Url < ApplicationRecord
  SLUG_LENGTH = 8
  validates :original_url, presence: true, on: :create
  before_create :generate_slug
  before_create :sanitize
end
