ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'mocha/minitest'

class ActiveSupport::TestCase
  def response_json
    return nil if (@_response_body || response.body).blank?
    JSON.parse(@_response_body || response.body)
  end
end
