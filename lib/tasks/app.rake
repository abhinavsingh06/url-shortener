namespace :app do
  task :encode => :environment do
    include Rails.application.routes.url_helpers
    url_link = api_v1_urls_url(:host => "http://localhost:3000/api/v1")
    session = ActionDispatch::Integration::Session.new(Rails.application)
    session.post url_link, params: {"original": ENV['URL']} 
    response = JSON.parse(session.response.body)
    if session.response.status == 200
      puts "The shortened url of #{ENV['URL']} is #{ENV['ROOT_URL']}/#{response['slug']}"
    end
  end

  task :decode => :environment do
    present_slug = ENV['SHORTURL'].last(8)
    include Rails.application.routes.url_helpers
    url_link = api_v1_urls_url(:host => "http://localhost:3000/api/v1")
    session = ActionDispatch::Integration::Session.new(Rails.application)
    session.get "#{url_link}/#{present_slug}"
    if session.response.status == 200
      response = JSON.parse(session.response.body)
      puts "The original url of short url #{ENV['ROOT_URL']}/#{present_slug} is #{response['original']}"
    else
      puts "No original url was found for the short url #{ENV['ROOT_URL']}/#{present_slug}"
    end
  end
end
