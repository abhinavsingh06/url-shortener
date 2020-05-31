class Api::V1::VisitsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @visits = Visit.where(created_at: Date.new(Date.current.year,01,01)..Time.now)
    visits = {}
    @visits.each do |visit|
      if visits[visit.created_at.month]
        visits[visit.created_at.month].push(visit)
      else
        visits[visit.created_at.month] = [visit]
      end
    end
    render status: :ok, json: { visits: visits }
  end
  
end
