class Url < ApplicationRecord
  SLUG_LENGTH = 8
  validates :original, presence: true, on: :create
  validates :short, uniqueness: true
  before_create :generate_slug
  before_create :sanitize

  def generate_slug
    url = ([*('a'..'z'),*('0'..'9')]).sample(SLUG_LENGTH).join
    if Url.exists?( short: url )
      self.generate_slug
    else
      self.short = url
    end
  end

  def find_duplicate
    Url.find_by_sanitize_url(self.sanitize_url)
  end

  def new_url?
    find_duplicate.nil?
  end

  def sanitize
    self.original.strip!
    self.sanitize_url = self.original.downcase.gsub(/(https?:\/\/)|(www\.)/, "")
    self.sanitize_url = "http://#{self.sanitize_url}"
  end
end
