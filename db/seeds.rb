urls = [
  "https://bigbinary.com/jobs",
  "https://google.com",
  "https://github.com/abhinavsingh06",
  "http://www.youtube.com",
  "http://www.facebook.com",
  "http://www.baidu.com",
  "http://www.yahoo.com",
  "http://www.amazon.com",
  "http://www.wikipedia.org"
]

def generate_slug
  loop do
    url = SecureRandom.alphanumeric(8)
    break url unless Url.where(short: url).exists?
  end  
end

Visit.destroy_all
Url.destroy_all

urls.each do |url|
  Url.create(original: url, short: generate_slug)
end
