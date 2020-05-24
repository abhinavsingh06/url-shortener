require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  test "name should be present" do
    name = Category.new(name: "")
    assert name.invalid?
  end

  test "name should be unique" do
    name1 = categories(:one)
    name2 = Category.new(name: "xyz")
    assert name2.invalid?
  end

  test "color should have length 8" do
    color = Category.new(color: "#gh")
    assert color.invalid?
  end

  test "name should not be duplicate" do
    name1 = categories(:one)
    name2 = Category.new(name: 'xyz')
    assert name2.invalid?
  end
end
