terraform {
  required_version = "~> 0.13"

  required_providers {
    aws = "~> 3.14"
  }
}

resource "random_id" "name_suffix" {
  keepers = {
    prefix = var.prefix
    env    = var.env
    region = local.region
  }

  byte_length = 16
}

resource "aws_sqs_queue" "queue" {
  name = "${var.prefix}-${var.env}-${random_id.name_suffix.hex}"

  delay_seconds              = 0
  max_message_size           = 2048
  visibility_timeout_seconds = 1800
  message_retention_seconds  = 86400
  receive_wait_time_seconds  = 20
}


resource "aws_sqs_queue_policy" "queue" {
  queue_url = aws_sqs_queue.queue.id

  policy = jsonencode(
    {
      Id = "SQSPolicy"
      Statement = [
        {
          Action = "SQS:*"
          Effect = "Allow"
          Principal = {
            AWS = "arn:aws:iam::${local.account_id}:root"
          }
          Resource = aws_sqs_queue.queue.arn
          Sid      = "__owner_statement"
        },
        {
          Action = "SQS:SendMessage"
          Effect = "Allow"
          Principal = {
            AWS = "*"
          }
          Resource = aws_sqs_queue.queue.arn
          Sid      = "__sender_statement"
        },
      ]
      Version = "2008-10-17"
    }
  )
}


data "archive_file" "email" {
  type        = "zip"
  source_dir  = "lambda/email"
  output_path = "lambda/email.zip"
}

resource "aws_lambda_function" "lambda" {
  description   = "Send Emails"
  function_name = "${var.prefix}-${var.env}-${random_id.name_suffix.hex}"

  role = aws_iam_role.lambda.arn

  handler     = "email.handler"
  memory_size = 128
  runtime     = "python3.8"
  timeout     = 120

  filename         = "lambda/email.zip"
  source_code_hash = data.archive_file.email.output_base64sha256


  environment {
    variables = {
      EMAIL_SSM = "/${var.prefix}/${var.env}/EMAIL"
    }
  }
}

resource "aws_cloudwatch_log_group" "lambda" {
  name = "/aws/lambda/${aws_lambda_function.lambda.function_name}"

  retention_in_days = 1
}

resource "aws_lambda_event_source_mapping" "event" {
  event_source_arn = aws_sqs_queue.queue.arn
  function_name    = aws_lambda_function.lambda.arn
}
