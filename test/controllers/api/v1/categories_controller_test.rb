require 'test_helper'

class Api::V1::CaategoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_caategories_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_caategories_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_caategories_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_caategories_destroy_url
    assert_response :success
  end

end
