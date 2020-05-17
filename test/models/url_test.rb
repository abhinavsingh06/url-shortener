require 'test_helper'

class UrlTest < ActiveSupport::TestCase
  fixtures :urls

  test "original_url should be present" do
    original = Url.new(original: "")
    assert original.invalid?
  end

  test "short_url should be present" do
    short = Url.new(short: "")
    assert short.invalid?
  end

  test "short_url should have length 8" do
    short = Url.new(short: "test")
    assert short.invalid?
  end

  test "short_url should be unique" do
    url1 = urls(:one)
    url2 = Url.new(original: "https://test.com", short: url1.short)
    assert url2.invalid?
  end

  test "original_url should not be duplicate" do
    url1 = urls(:one)
    url2 = Url.new(original: url1.original, short: "abcdefgh")
    assert_not url2.invalid?
  end
end
