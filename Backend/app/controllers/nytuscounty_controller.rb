class NytuscountyController < ApplicationController
    # before_action :authorized

    def getdata
        @data = []
        @fips = params[:fips]
        (Date.today-15..Date.today).each do |d|
            @data.push(Nytuscounty.where(date: d.strftime("%Y-%m-%d"), fips: @fips))
        end
        render json: { data: @data }, status: :accepted
    end



end
