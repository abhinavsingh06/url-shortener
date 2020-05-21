class Api::V1::CaategoriesController < ApplicationController
  def index
    @categories = Category.order(updated_at: :desc)
    render status: :ok, json: { categories: @categories }
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      render status: :ok, json: { notice: 'Category was successfully created', category: @category }
    else 
      render status: :unprocessable_entity, json: { errors: @category.errors.full_messages }
    end
  end

  def update
    @category = Category.where(name: params[:name]).first
    if @category.update_attributes(category_params)
      render status: :ok, json: { notice: "Successfully updated category." , category: @category}
    else
      render status: :unprocessable_entity, json:{ errors: @category.errors.full_messages }
    end
  end

  def destroy
    @category = Category.where(name: params[:name]).first
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
