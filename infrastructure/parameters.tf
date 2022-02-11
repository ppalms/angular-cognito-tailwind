resource "aws_ssm_parameter" "auth_url" {
  name  = "/${var.s3_bucket_name}/${var.s3_bucket_env}/cognito/auth_base_url"
  type  = "String"
  value = "https://auth.${var.domain}"
  tags  = local.common_tags
}

resource "aws_ssm_parameter" "auth_issuer" {
  name  = "/${var.s3_bucket_name}/${var.s3_bucket_env}/cognito/auth_issuer"
  type  = "String"
  value = "https://cognito-idp.${var.aws_region}.amazonaws.com/${aws_cognito_user_pool.app_user_pool.id}"
  tags  = local.common_tags
}

resource "aws_ssm_parameter" "cognito_client_id" {
  name        = "/${var.s3_bucket_name}/${var.s3_bucket_env}/cognito/angular_client_id"
  description = "Angular client ID"
  type        = "SecureString"
  value       = aws_cognito_user_pool_client.angular_client.id
  tags        = local.common_tags
}
