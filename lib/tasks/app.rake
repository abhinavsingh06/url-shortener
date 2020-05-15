namespace :app do
  task :encode => :environment do
    include Rails.application.routes.url_helpers
    url_link = url_url(:host => "http://localhost:3000")
    session = ActionDispatch::Integration::Session.new(Rails.application)
    session.post url_link, params: { "original_url": ENV['URL'] }
    response = JSON.parse(session.response.body)
    if response["success"]
      puts "The shortened url of #{ENV['URL']} is https://short.is/#{response['slug']}"
    end
  end

  task :decode => :environment do
    present_slug = ENV['SHORTURL'].last(8)
    session = ActionDispatch::Integration::Session.new(Rails.application)
    session.get "https://localhost:3000/#{present_slug}"
    response = JSON.parse(session.response.body)
    if response["original_url"]
      puts "The original url of short url https://short.is/#{present_slug} is #{response['original_url']}"
    else
      puts "No original url was found for the short url https://short.is/#{present_slug}"
    end
  end
end 
