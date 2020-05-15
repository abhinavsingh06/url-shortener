require 'test_helper'

class UrlTest < ActiveSupport::TestCase
  fixtures :urls

  test "original_url should be present" do
    original_url = Url.new(original_url: "")
    assert original_url.invalid?
  end

  test "short_url should be present" do
    short_url = Url.new(short_url: "")
    assert short_url.invalid?
  end

  test "short_url should have length 8" do
    short_url = Url.new(short_url: "test")
    assert short_url.invalid?
  end

  test "short_url should be unique" do
    url1 = urls(:one)
    url2 = Url.new(original_url: "https://test.com", short_url: url1.short_url)
    assert url2.invalid?
  end

  test "original_url should not be duplicate" do
    url1 = urls(:one)
    url2 = Url.new(original_url: url1.original_url, short_url: "abcdefgh")
    assert_not url2.invalid?
  end
end
