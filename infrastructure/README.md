# Terraform Frontend Infrastructure Template

This project creates a basic infrastructure for a static site to be hosted in S3 and delivered via CloudFront. It also creates a Cognito user pool with an admin user.

# Requirements
1. a `terraform.tfvars` with the values to:
```
project_key         = "fun-with-terraform"
aws_access_key      = "XXXXXXXXXX"
aws_secret_key      = "XXXXXXXXXX"
aws_region          = "us-east-1"
s3_bucket_name      = "foo.xyz.com"
s3_bucket_env       = "development"
domain              = "xyz.com"
subdomain           = "foo"
hosted_zone         = "xyz.com"
```
# Getting Started
1. run `terraform init`
2. run `terraform plan` and review the plan
3. run `terraform apply`
