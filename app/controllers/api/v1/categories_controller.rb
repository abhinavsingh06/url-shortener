class Api::V1::CategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @categories = Category.all
    render status: :ok, json: { categories: @categories }
  end

  def create
    @category = Category.create(category_params)
    puts params.inspect
    if @category.save
      render status: :ok, json: { notice: 'Category was successfully created', category: @category }
    else 
      render status: :unprocessable_entity, json: { errors: @category.errors.full_messages }
    end
  end

  def update
    @category = Category.find_by_name(params[:name])
    puts params
    if @category.update(category_params)
      render status: :ok, json: { notice: "Successfully updated category." , category: @category}
    else
      render status: :unprocessable_entity, json:{ errors: @category.errors.full_messages }
    end
  end

  def destroy
    @category = Category.where(name: params[:name]).first
    puts params
    if @category.destroy
      render status: :ok, json: { notice: "Successfully deleted category." }
    else
      render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :color)
  end
end
