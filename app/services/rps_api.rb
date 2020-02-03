class RpsApi
  include HTTParty
  base_uri Rails.application.secrets.rps_api_url

  def self.call
    get ''
  end
end
