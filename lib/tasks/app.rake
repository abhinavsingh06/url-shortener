namespace :app do
  task :encode => :environment do
    short_link = Url.shorten(ENV['URL'])
    puts "The shortened url of #{ENV['URL']} is #{short_link}"
  end

  task :decode => :environment do
    given_slug = ENV['SHORTURL'].last(8)
    short_link = Url.find_by(short_url: given_slug)
    if !!short_link
      puts "The original url of short url https://short.is/#{short_link.short_url} is #{short_link.original_url}"
    else
      puts "No original url was found for the short url https://short.is/#{given_slug}"
    end
  end
end 
