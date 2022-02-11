provider "aws" {
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region     = var.aws_region
}

provider "aws" {
  region     = "us-east-1"
  alias      = "virginia"
}
