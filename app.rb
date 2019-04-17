require 'sinatra/base'

class Thermostat < Sinatra::Base
  use Rack::Session::Cookie, :key => 'rack.session', :path => '/', :secret => 'secret string'

  post '/temperature' do
    headers 'Access-Control-Allow-Origin' => '*'

    $temperature = params[:temperature]
    redirect '/temperature'
  end

  get '/temperature' do
    headers 'Access-Control-Allow-Origin' => '*'
    $temperature
  end

  post '/city' do
    headers 'Access-Control-Allow-Origin' => '*'

    $city = params[:city]
    redirect '/city'
  end

  get '/city' do
    headers 'Access-Control-Allow-Origin' => '*'
    $city
  end

  run! if app_file == $0
end


#headers 'Access-Control-Allow-Origin' => '*',
#      'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
#      'Access-Control-Allow-Headers' => ['Content-Type', 'Accept', 'X-Requested-With', 'access_token']
