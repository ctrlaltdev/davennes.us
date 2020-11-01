terraform {
  required_version = "~> 0.13"

  required_providers {
    aws = "~> 3.10"
  }
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = var.name
}

resource "aws_s3_bucket" "b" {
  bucket = "${var.prefix}-${var.env}-${var.name}"
  acl    = "private"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = []
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_policy" "b" {
  bucket = aws_s3_bucket.b.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "BucketPolicy-${var.name}",
  "Statement": [
    {
      "Sid": "CFRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": "${aws_cloudfront_origin_access_identity.oai.iam_arn}"
      },
      "Action": "s3:GetObject",
      "Resource": "${aws_s3_bucket.b.arn}/*"
    }
  ]
}
POLICY
}

resource "aws_cloudfront_distribution" "d" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = var.name
  default_root_object = "index.html"

  aliases = [
    "davennes.us",
    "www.davennes.us",
    "aurelien.davennes.us",
    "aurelien.us",
    "www.aurelien.us"
  ]

  origin {
    domain_name = aws_s3_bucket.b.bucket_regional_domain_name
    origin_id   = "s3-${var.name}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-${var.name}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = var.cert_arn
    ssl_support_method             = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
