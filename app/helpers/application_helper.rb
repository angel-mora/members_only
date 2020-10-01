module ApplicationHelper
  private

  def post_params
    params.require(:user).permit(:username, :name)
  end
end
