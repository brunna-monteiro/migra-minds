class EventsController < ApplicationController
  before_action :set_attributes, only: %i[show edit update destroy]

  def index
    @events = Event.all
    @event = Event.new
  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    @event.user = current_user
    if @event.save!
      redirect_to event_path(@event)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @host = @event.user
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @event.update(event_params)
      flash[:success] = "Your event has been updated!"
      redirect_to event_path(@event)
    else
      render action: :edit
    end
  end

  def destroy
    @event.destroy
    redirect_to events_path, status: :see_other
  end

  private

  def event_params
    params.require(:event).permit(:name, :address, :description, :date, :photo)
  end

  def set_attributes
    @event = Event.find(params[:id])
  end
end
