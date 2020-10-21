require 'csv'
require 'net/http'
require 'activerecord-import'
 require 'objspace'

class Nytuscounty < ApplicationRecord


    ## The data within NYT is total and there are some counties that do not have fips such as NY as the boroughs are all within NYC.... so sad le sigh.
    def self.get_data_first
        Nytuscounty.delete_all

        uri = URI.open('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
        file  = CSV.parse(uri, headers: true)

        items = []
        row_count = 1
        chunk_count = 1
        
        puts "looping..."
        file.each do |row|
            if chunk_count < 90000
                items << row.to_h
                chunk_count += 1
                row_count += 1
                if row_count == (file.length - 6)
                    Nytuscounty.import(items)
                    puts "just completed the final loop"
                end
            else
                Nytuscounty.import(items)
                chunk_count = 1
                items = []
                puts "just completed a loop"
            end
        end
        puts "done!"
    end

    # 651162
    def self.update_data
        uri = URI.parse('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
        res = Net::HTTP.get(uri)
        items = []
        CSV.parse(res, headers: true) do |row|

            obj = Nytuscounty.find_by(date: row["date"], fips: row["fips"])
            if obj.cases == row["cases"]
                obj.cases = row["cases"] 
            elsif obj.deaths == row["deaths"]
                obj.cases = row["deaths"]
            elsif obj.confirmed_cases == row["confirmed_cases"]
                obj.confirmed_cases = row["confirmed_cases"]
            elsif obj.confirmed_deaths == row["confirmed_deaths"]
                obj.confirmed_deaths = row["confirmed_deaths"]
            end
            obj.save
        end
    end
    

    # def self.get_population(fips)
    #         county = fips.last(3)
    #     if fips.length < 5
    #         state = "0" + fips.first()
    #     else
    #         state = fips.first(2)
    #     end
        
    #         uri = URI.parse("https://api.census.gov/data/2019/pep/population?get=COUNTY,DATE_CODE,DATE_DESC,DENSITY,POP,NAME,STATE&DATE_CODE=12&for=county:#{county}&in=state:#{state}")
    #         res = Net::HTTP.get(uri)
    #         data = JSON.parse(res)
    #         byebug
    # end
end