class PlaygroundsController < ApplicationController
  rescue_from StandardError, with: -> { head :unprocessable_entity }

  def show; end

  def create
    engine = GameEngine.new(permitted_params[:player_choice].to_sym)
    render json: {
      result: engine.result,
      opponent_choice: engine.opponent_choice
    }
  end

  private

  def permitted_params
    params.permit(:player_choice)
  end
end
