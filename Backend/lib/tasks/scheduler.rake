desc "This task is called by the Heroku scheduler add-on"

task :update_nyt => :environment do
    puts "Updating feed..."
  Nytuscounty.get_data_first
  puts "done."
end


