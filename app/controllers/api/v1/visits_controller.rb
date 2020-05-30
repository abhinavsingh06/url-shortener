class Api::V1::VisitsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @visits = Visit.all
    @urls = Url.all.map{|i| {oroginal:i.original,short: i.short,id: i.id}}
    render status: :ok, json: { visits: @visits, urls: @urls }
  end

  def show
    @visits = Visit.where(urls_id: params[:id], created_at: Date.new(Date.current.year,01,1)..Time.now)
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

  # def self.visits_count(month)
  #   @month = where("extract(month from visited_on) = ?", month).count
  # end

  private

  def visit_params
    params.require(:visit).permit(:urls_id)
  end
end
