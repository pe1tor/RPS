# frozen_string_literal: true

class RpsApi
  attr_reader :response

  def initialize
    @response = call
  end

  def success?
    response['statusCode'] == 200
  end

  def curbs_choice
    response['body'].gsub('"', '').to_sym
  end

  private

  def call
    HTTParty.get(url).parsed_response
  end

  def url
    Rails.application.secrets.rps_api_url
  end
end
