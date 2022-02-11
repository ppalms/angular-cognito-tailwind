resource "aws_cognito_user_pool" "app_user_pool" {
  name = "${var.subdomain}-user-pool"
  tags = local.common_tags
}

resource "aws_cognito_user_pool_domain" "app_user_pool_domain" {
  domain          = "auth.${var.domain}"
  certificate_arn = aws_acm_certificate.cert.arn
  user_pool_id    = aws_cognito_user_pool.app_user_pool.id
  depends_on      = [aws_route53_record.root_domain]
}

resource "aws_cognito_user_group" "admin" {
  name         = "Administrators"
  user_pool_id = aws_cognito_user_pool.app_user_pool.id
}

resource "aws_cognito_user_pool_client" "angular_client" {
  name                = "angular_client"
  user_pool_id        = aws_cognito_user_pool.app_user_pool.id
  explicit_auth_flows = ["ALLOW_CUSTOM_AUTH", "ALLOW_USER_SRP_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]

  callback_urls                        = ["http://localhost:4200/signin-cognito", "https://localhost:4200/signin-cognito", "https://${var.subdomain}.${var.domain}/signin-cognito"]
  logout_urls                          = ["http://localhost:4200/bye", "https://localhost:4200/bye", "https://${var.subdomain}.${var.domain}/bye"]
  supported_identity_providers         = ["COGNITO"]
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["email", "openid", "phone", "profile"]
}
