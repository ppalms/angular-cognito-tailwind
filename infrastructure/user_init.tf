data "template_file" "application_bootstrap" {
  template = file("${path.module}/cf_template.json")

  vars = {
    user_pool_id          = aws_cognito_user_pool.app_user_pool.id
    admin_email           = var.cognito_admin_email
    user_pool_admin_group = aws_cognito_user_group.admin.name
  }
}

resource "aws_cloudformation_stack" "users" {
  name = "${var.project_key}-users"

  template_body = data.template_file.application_bootstrap.rendered
}
