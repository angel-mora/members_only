module ApplicationHelper
  def user_is_online(_user)
    link = if user_signed_in?
             " #{link_to 'Logout', destroy_user_session_path, method: :delete, class: 'head'}"

           else
             (link_to 'Login', new_user_session_path, class: 'head').to_s
           end

    link.html_safe
  end

  private

  def post_params
    params.require(:user).permit(:username, :name)
  end
end
